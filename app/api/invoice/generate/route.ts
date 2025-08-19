import { NextRequest } from "next/server";
import { generatePdfService } from "@/services/invoice/server/generatePdfService";

export async function POST(req: NextRequest) {
  try {
    const pdfResponse = await generatePdfService(req);
    return pdfResponse;
  } catch (error: any) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
