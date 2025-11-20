import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET() {
  try {
    const signups = await prisma.betaSignup.findMany({
      orderBy: { createdAt: "desc" },
    });

    const verified = signups.filter((s) => s.verified).length;

    return NextResponse.json({
      count: signups.length,
      verified,
      unverified: signups.length - verified,
      signups: signups.map((s) => ({
        id: s.id,
        email: s.email,
        verified: s.verified,
        verifiedAt: s.verifiedAt,
        createdAt: s.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching beta signups:", error);
    return NextResponse.json(
      { error: "Failed to fetch signups" },
      { status: 500 }
    );
  }
}

