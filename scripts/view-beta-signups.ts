#!/usr/bin/env tsx

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("📋 Beta Signups\n");
  console.log("=" .repeat(50));

  const signups = await prisma.betaSignup.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (signups.length === 0) {
    console.log("No signups yet.");
    return;
  }

  console.log(`Total signups: ${signups.length}\n`);

  signups.forEach((signup, index) => {
    const date = new Date(signup.createdAt).toLocaleString();
    console.log(`${index + 1}. ${signup.email}`);
    console.log(`   Signed up: ${date}`);
    console.log(`   ID: ${signup.id}\n`);
  });
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

