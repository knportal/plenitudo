import { NextResponse } from "next/server";
import { prisma } from "@/server/db";
import { validateEmail, generateVerificationToken } from "@/server/betaSignup/validation";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Test validation
    const validation = validateEmail(normalizedEmail);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error || "Invalid email" }, { status: 400 });
    }

    // Test findUnique (this is what fails in the actual route)
    let findUniqueResult = null;
    let findUniqueError = null;
    try {
      findUniqueResult = await prisma.betaSignup.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (e: any) {
      findUniqueError = {
        name: e?.name,
        message: e?.message,
        stack: e?.stack?.substring(0, 500),
      };
    }

    // Test create (if email doesn't exist)
    let createResult = null;
    let createError = null;
    if (!findUniqueResult && !findUniqueError) {
      try {
        const token = generateVerificationToken();
        createResult = await prisma.betaSignup.create({
          data: {
            email: normalizedEmail,
            verificationToken: token,
          },
        });
      } catch (e: any) {
        createError = {
          name: e?.name,
          message: e?.message,
          stack: e?.stack?.substring(0, 500),
        };
      }
    }

    return NextResponse.json({
      input: { email, normalizedEmail },
      validation,
      findUnique: {
        result: findUniqueResult ? "found" : "not found",
        error: findUniqueError,
      },
      create: {
        result: createResult ? "created" : "not created",
        error: createError,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack?.substring(0, 500),
        },
      },
      { status: 500 }
    );
  }
}

