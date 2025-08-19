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
 * Fallback PDF generation method for Vercel environment
 */
async function generatePdfFallback(htmlTemplate: string): Promise<Buffer> {
	try {
		// Use a simpler approach with basic HTML to PDF conversion
		const puppeteer = await import("puppeteer-core");
		
		const browser = await puppeteer.launch({
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-gpu",
				"--disable-web-security",
				"--disable-features=VizDisplayCompositor"
			],
			executablePath: await chromium.executablePath(),
			headless: true,
		});

		const page = await browser.newPage();
		await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });
		
		// Add basic styling if Tailwind CDN fails
		await page.addStyleTag({
			content: `
				body { font-family: Arial, sans-serif; margin: 20px; }
				table { width: 100%; border-collapse: collapse; }
				th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
				th { background-color: #f2f2f2; }
			`
		});

		const pdf = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
		});

		await browser.close();
		return pdf;
	} catch (error) {
		console.error("Fallback PDF generation failed:", error);
		throw error;
	}
}

/**
 * Alternative PDF generation using cloud service (as last resort)
 */
async function generatePdfCloudService(htmlTemplate: string): Promise<Buffer> {
	try {
		// You can replace this with any cloud PDF service like:
		// - Puppeteer Cloud
		// - Browserless.io
		// - Chrome AWS Lambda
		// - Or any other service
		
		const response = await fetch('https://api.browserless.io/pdf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
			},
			body: JSON.stringify({
				html: htmlTemplate,
				options: {
					format: 'A4',
					printBackground: true,
					margin: {
						top: '20px',
						right: '20px',
						bottom: '20px',
						left: '20px'
					}
				}
			})
		});

		if (!response.ok) {
			throw new Error(`Cloud service failed: ${response.statusText}`);
		}

		return Buffer.from(await response.arrayBuffer());
	} catch (error) {
		console.error("Cloud PDF generation failed:", error);
		throw error;
	}
}

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
		const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));

		// Check if we're in Vercel environment
		const isVercel = process.env.VERCEL === "1";
		const isLinux = process.platform === "linux";
		const isProduction = ENV === "production";

		let pdf: Buffer;

		try {
			if (isVercel || (isProduction && isLinux)) {
				// Use @sparticuz/chromium for Vercel
				const puppeteer = await import("puppeteer-core");
				
				// Ensure chromium is properly initialized
				await chromium.font("https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf");
				
				browser = await puppeteer.launch({
					args: [
						...chromium.args,
						"--disable-dev-shm-usage",
						"--disable-gpu",
						"--no-sandbox",
						"--disable-setuid-sandbox",
						"--disable-web-security",
						"--disable-features=VizDisplayCompositor"
					],
					defaultViewport: chromium.defaultViewport,
					executablePath: await chromium.executablePath(),
					headless: true,
					ignoreHTTPSErrors: true,
				});
			} else {
				const puppeteer = await import("puppeteer");
				browser = await puppeteer.launch({
					args: ["--no-sandbox", "--disable-setuid-sandbox"],
					headless: "new",
				});
			}

			if (!browser) {
				throw new Error("Failed to launch browser");
			}

			page = await browser.newPage();
			await page.setContent(htmlTemplate, {
				waitUntil: ["networkidle0", "load", "domcontentloaded"],
				timeout: 30000,
			});

			await page.addStyleTag({
				url: TAILWIND_CDN,
			});

			pdf = await page.pdf({
				format: "a4",
				printBackground: true,
				preferCSSPageSize: true,
			});
		} catch (puppeteerError) {
			console.error("Primary PDF generation failed, trying fallback:", puppeteerError);
			try {
				// Try fallback method
				pdf = await generatePdfFallback(htmlTemplate);
			} catch (fallbackError) {
				console.error("Fallback PDF generation failed, trying cloud service:", fallbackError);
				// Try cloud service as last resort
				pdf = await generatePdfCloudService(htmlTemplate);
			}
		}

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
		console.error("Environment:", {
			VERCEL: process.env.VERCEL,
			NODE_ENV: process.env.NODE_ENV,
			platform: process.platform,
			arch: process.arch
		});
		return new NextResponse(JSON.stringify({ 
			error: "Failed to generate PDF", 
			details: error instanceof Error ? error.message : String(error),
			environment: {
				VERCEL: process.env.VERCEL,
				NODE_ENV: process.env.NODE_ENV,
				platform: process.platform
			}
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
