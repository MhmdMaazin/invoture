import { NextRequest, NextResponse } from "next/server";

// Chromium
import chromium from "@sparticuz/chromium";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { ENV, TAILWIND_CDN } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
	const body: InvoiceType = await req.json();
	let browser;
	let page;

	try {
		const ReactDOMServer = (await import("react-dom/server")).default;
		const templateId = body.details.pdfTemplate;
		const InvoiceTemplate = await getInvoiceTemplate(templateId);
		
		if (!InvoiceTemplate) {
			throw new Error(`Template ${templateId} not found`);
		}
		
		const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));

		// Use puppeteer-core with @sparticuz/chromium for Vercel
		const puppeteer = await import("puppeteer-core");
		
		// Configure browser for Vercel serverless environment
		browser = await puppeteer.launch({
			args: [
				...chromium.args,
				"--disable-dev-shm-usage",
				"--disable-gpu",
				"--disable-software-rasterizer",
				"--disable-background-timer-throttling",
				"--disable-backgrounding-occluded-windows",
				"--disable-renderer-backgrounding",
				"--disable-features=TranslateUI",
				"--disable-ipc-flooding-protection",
			],
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath(),
			headless: true,
			ignoreHTTPSErrors: true,
		});

		if (!browser) {
			throw new Error("Failed to launch browser");
		}

		page = await browser.newPage();
		
		// Set content with proper error handling
		await page.setContent(htmlTemplate, {
			waitUntil: "domcontentloaded",
			timeout: 30000,
		});

		// Add Tailwind CSS with error handling
		try {
			await page.addStyleTag({
				url: TAILWIND_CDN,
			});
		} catch (styleError) {
			console.warn("Failed to load external Tailwind CSS, continuing without it:", styleError);
		}

		const pdf: Buffer = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
		});

		return new NextResponse(new Blob([new Uint8Array(pdf)], { type: "application/pdf" }), {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": "attachment; filename=invoice.pdf",
				"Cache-Control": "no-cache",
				Pragma: "no-cache",
			},
			status: 200,
		});
	} catch (error) {
		console.error("PDF Generation Error:", error);
		return new NextResponse(JSON.stringify({ 
			error: "Failed to generate PDF", 
			details: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined
		}), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} finally {
		if (page) {
			try {
				await page.close();
			} catch (e) {
				console.error("Error closing page:", e);
			}
		}
		if (browser) {
			try {
				const pages = await browser.pages();
				await Promise.all(pages.map((p) => p.close()));
				await browser.close();
			} catch (e) {
				console.error("Error closing browser:", e);
			}
		}
	}
}
