import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Services
import { generatePdfService } from "@/services/invoice/server/generatePdfService";

export async function POST(req: NextRequest) {
    const result = await generatePdfService(req);
    return result;
}
