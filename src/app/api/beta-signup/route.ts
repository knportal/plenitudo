import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/db";
import {
  validateEmail,
  generateVerificationToken,
} from "@/server/betaSignup/validation";
import { sendVerificationEmail } from "@/server/betaSignup/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Enhanced email validation (format + disposable check)
    const validation = validateEmail(normalizedEmail);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Invalid email" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.betaSignup.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      // If already verified, return success (idempotent)
      if (existing.verified) {
        return NextResponse.json(
          { message: "Email already verified and on the waitlist!" },
          { status: 200 }
        );
      }
      // If not verified, resend verification email
      const token = generateVerificationToken();
      await prisma.betaSignup.update({
        where: { email: normalizedEmail },
        data: { verificationToken: token },
      });

      await sendVerificationEmail(normalizedEmail, token);

      return NextResponse.json(
        {
          message:
            "Verification email sent! Please check your inbox to confirm your email address.",
          requiresVerification: true,
        },
        { status: 201 }
      );
    }

    // Create new signup with verification token
    const verificationToken = generateVerificationToken();
    await prisma.betaSignup.create({
      data: {
        email: normalizedEmail,
        verificationToken,
      },
    });

    // Send verification email
    await sendVerificationEmail(normalizedEmail, verificationToken);

    return NextResponse.json(
      {
        message:
          "Verification email sent! Please check your inbox to confirm your email address.",
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error) {
    // Log full error details for debugging
    console.error("Beta signup error:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Provide more specific error messages
    if (error instanceof Error) {
      // Check for Prisma errors
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
      if (
        error.message.includes("model") ||
        error.message.includes("does not exist")
      ) {
        console.error(
          "Prisma model error - client may need regeneration:",
          error.message
        );
        return NextResponse.json(
          { error: "Database configuration error. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process signup",
      },
      { status: 500 }
    );
  }
}

