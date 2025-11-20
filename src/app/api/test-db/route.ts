import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  try {
    // Test 1: Check if Prisma Client has betaSignup
    const hasBetaSignup = typeof prisma.betaSignup !== "undefined";
    
    // Test 2: Try to count BetaSignup records
    let count = 0;
    let countError = null;
    try {
      count = await prisma.betaSignup.count();
    } catch (e: any) {
      countError = {
        name: e?.name,
        message: e?.message,
        stack: e?.stack,
      };
    }

    // Test 3: Check DATABASE_URL
    const hasDbUrl = !!process.env.DATABASE_URL;
    const dbUrlPreview = hasDbUrl 
      ? process.env.DATABASE_URL.substring(0, 30) + "..."
      : "NOT SET";

    return NextResponse.json({
      prismaClient: {
        hasBetaSignup,
        availableModels: Object.keys(prisma).filter(
          (k) => !k.startsWith("_") && !k.startsWith("$") && k !== "constructor"
        ),
      },
      database: {
        hasConnectionString: hasDbUrl,
        connectionStringPreview: dbUrlPreview,
        betaSignupCount: count,
        countError,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
        },
      },
      { status: 500 }
    );
  }
}

