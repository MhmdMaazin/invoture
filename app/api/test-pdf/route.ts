import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Test basic functionality
        const testData = {
            environment: process.env.NODE_ENV,
            platform: process.platform,
            chromium: typeof require !== 'undefined' ? 'available' : 'not available',
            puppeteer: typeof require !== 'undefined' ? 'available' : 'not available'
        };

        return NextResponse.json({
            status: 'ok',
            message: 'Test endpoint working',
            data: testData
        });
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'Test endpoint failed',
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
