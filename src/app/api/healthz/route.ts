/**
 * Health check endpoint for deployment verification.
 * Returns 200 if database is accessible, 503 if not.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Simple query to verify database connectivity
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}


