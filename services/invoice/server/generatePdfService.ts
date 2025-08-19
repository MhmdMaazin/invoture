import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { getInvoiceTemplate } from "@/lib/helpers";
import { ENV, TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";

/**
 * Generate a PDF document of an invoice based on the provided data.
 */
export async function generatePdfService(req: NextRequest) {
  const body: InvoiceType = await req.json();
  let browser: any;
  let page: any;

  try {
    const ReactDOMServer = (await import("react-dom/server")).default;
    const templateId = body.details.pdfTemplate;
    const InvoiceTemplate = await getInvoiceTemplate(templateId);
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(InvoiceTemplate(body));

    const isLinux = process.platform === "linux";
    const isProduction = ENV === "production";

    if (isProduction && isLinux) {
      const puppeteer = await import("puppeteer-core");
      browser = await puppeteer.launch({
        args: [...chromium.args, "--disable-dev-shm-usage"],
        defaultViewport: chromium.defaultViewport,
        executablePath: (await chromium.executablePath()) || "/usr/bin/chromium",
        headless: true as const, // TS-safe
        ignoreHTTPSErrors: true,
      });
    } else {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new",
      });
    }

    if (!browser) throw new Error("Failed to launch browser");

    page = await browser.newPage();
    await page.setContent(htmlTemplate, {
      waitUntil: ["networkidle0", "load", "domcontentloaded"],
      timeout: 30000,
    });

    await page.addStyleTag({ url: TAILWIND_CDN });

    const pdf: Buffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${body.details.invoiceNumber}.pdf`,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to generate PDF", details: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
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
        await Promise.all(pages.map((p: import("puppeteer").Page) => p.close()));
        await browser.close();
      } catch (e) {
        console.error("Error closing browser:", e);
      }
    }
  }
}
