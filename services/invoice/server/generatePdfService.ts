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
 * Optimize invoice data to reduce payload size
 */
function optimizeInvoiceData(data: InvoiceType): InvoiceType {
	const optimized = { ...data };
	
	// Remove or compress large base64 images
	if (optimized.details.invoiceLogo && optimized.details.invoiceLogo.startsWith('data:image')) {
		const logoSize = Buffer.byteLength(optimized.details.invoiceLogo, 'utf8');
		if (logoSize > 50000) { // 50KB limit for logo
			console.log(`Removing large logo (${logoSize} bytes)`);
			optimized.details.invoiceLogo = '';
		}
	}
	
	// Truncate very long text fields
	if (optimized.details.additionalNotes && optimized.details.additionalNotes.length > 1000) {
		optimized.details.additionalNotes = optimized.details.additionalNotes.substring(0, 1000) + '...';
	}
	
	// Limit items array size
	if (optimized.details.items && optimized.details.items.length > 50) {
		optimized.details.items = optimized.details.items.slice(0, 50);
	}
	
	return optimized;
}

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
 * Optimize HTML template to reduce size
 */
function optimizeHtmlTemplate(html: string): string {
	// Remove unnecessary whitespace and comments
	return html
		.replace(/\s+/g, ' ')
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/>\s+</g, '><')
		.trim();
}

/**
 * Alternative PDF generation using a more robust approach
 */
async function generatePdfAlternative(htmlTemplate: string): Promise<Buffer> {
	try {
		// Use a different approach - create a minimal HTML with external CSS
		const minimalHtml = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<title>Invoice</title>
				<style>
					body { 
						font-family: Arial, sans-serif; 
						margin: 20px; 
						font-size: 12px;
						line-height: 1.4;
					}
					table { 
						width: 100%; 
						border-collapse: collapse; 
						margin-bottom: 20px;
					}
					th, td { 
						border: 1px solid #ddd; 
						padding: 8px; 
						text-align: left; 
					}
					th { 
						background-color: #f2f2f2; 
						font-weight: bold;
					}
					.header { 
						text-align: center; 
						margin-bottom: 30px; 
						border-bottom: 2px solid #333;
						padding-bottom: 10px;
					}
					.section { 
						margin-bottom: 20px; 
					}
					.total { 
						font-weight: bold; 
						font-size: 14px; 
						border-top: 2px solid #333;
						padding-top: 10px;
					}
				</style>
			</head>
			<body>
				${htmlTemplate}
			</body>
			</html>
		`;

		// Try with a different cloud service or use a simpler approach
		const puppeteer = await import("puppeteer-core");
		
		const browser = await puppeteer.launch({
			args: [
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--disable-dev-shm-usage",
				"--disable-gpu",
				"--disable-web-security",
				"--disable-features=VizDisplayCompositor",
				"--disable-extensions",
				"--disable-plugins",
				"--disable-images",
				"--disable-javascript"
			],
			executablePath: await chromium.executablePath(),
			headless: true,
		});

		const page = await browser.newPage();
		
		// Set a smaller viewport to reduce memory usage
		await page.setViewport({ width: 800, height: 600 });
		
		await page.setContent(minimalHtml, { 
			waitUntil: "domcontentloaded",
			timeout: 15000 
		});

		const pdf = await page.pdf({
			format: "a4",
			printBackground: true,
			preferCSSPageSize: true,
			margin: {
				top: '20px',
				right: '20px',
				bottom: '20px',
				left: '20px'
			}
		});

		await browser.close();
		return pdf;
	} catch (error) {
		console.error("Alternative PDF generation failed:", error);
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
	let pdf: Buffer;

	try {
			const ReactDOMServer = (await import("react-dom/server")).default;
			const templateId = body.details.pdfTemplate;
			const InvoiceTemplate = await getInvoiceTemplate(templateId);
			
			// Optimize the data to reduce payload size
			const optimizedBody = optimizeInvoiceData(body);
			
			const htmlTemplate = optimizeHtmlTemplate(ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(optimizedBody)));

			// Check HTML size to prevent extremely large payloads
			const htmlSize = Buffer.byteLength(htmlTemplate, 'utf8');
			console.log(`HTML template size: ${htmlSize} bytes`);
			
			if (htmlSize > 500000) { // 500KB limit
				console.warn(`HTML template is very large (${htmlSize} bytes), using alternative method`);
				const largePdf = await generatePdfAlternative(htmlTemplate);
				return new NextResponse(new Blob([new Uint8Array(largePdf)], { type: "application/pdf" }), {
					headers: {
						"Content-Type": "application/pdf",
						"Content-Disposition": "attachment; filename=invoice.pdf",
						"Cache-Control": "no-cache",
						Pragma: "no-cache",
					},
					status: 200,
				});
			}

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
				console.error("Fallback PDF generation failed, trying alternative method:", fallbackError);
				// Try alternative method as last resort
				pdf = await generatePdfAlternative(htmlTemplate);
			}
		}

		if (!pdf) {
			throw new Error("Failed to generate PDF with all methods");
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
