import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/?error=missing_token", request.url));
  }

  try {
    // Find signup by verification token
    const signup = await prisma.betaSignup.findUnique({
      where: { verificationToken: token },
    });

    if (!signup) {
      return NextResponse.redirect(
        new URL("/?error=invalid_token", request.url)
      );
    }

    // Check if already verified
    if (signup.verified) {
      return NextResponse.redirect(new URL("/?verified=already", request.url));
    }

    // Verify the email
    await prisma.betaSignup.update({
      where: { id: signup.id },
      data: {
        verified: true,
        verifiedAt: new Date(),
        verificationToken: null, // Clear token after verification
      },
    });

    // Redirect to success page
    return NextResponse.redirect(new URL("/?verified=success", request.url));
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(
      new URL("/?error=verification_failed", request.url)
    );
  }
}
