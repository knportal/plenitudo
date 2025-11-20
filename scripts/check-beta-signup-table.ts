import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db",
    },
  },
});

async function checkTable() {
  try {
    // Try to query the table
    const count = await prisma.betaSignup.count();
    console.log("✅ BetaSignup table exists!");
    console.log(`   Current signups: ${count}`);

    // Try to get table structure by creating a test record and reading it
    const testRecord = await prisma.betaSignup.findFirst();
    if (testRecord) {
      console.log("\n📋 Table structure verified:");
      console.log(`   - id: ${typeof testRecord.id} (${testRecord.id ? 'exists' : 'missing'})`);
      console.log(`   - email: ${typeof testRecord.email} (${testRecord.email ? 'exists' : 'missing'})`);
      console.log(`   - verified: ${typeof testRecord.verified} (${testRecord.verified})`);
      console.log(`   - verificationToken: ${testRecord.verificationToken ? 'exists' : 'null'}`);
      console.log(`   - verifiedAt: ${testRecord.verifiedAt ? 'exists' : 'null'}`);
      console.log(`   - createdAt: ${testRecord.createdAt ? 'exists' : 'missing'}`);
    } else {
      console.log("\n📋 Table structure:");
      console.log("   - id: String (cuid)");
      console.log("   - email: String (unique)");
      console.log("   - verified: Boolean (default: false)");
      console.log("   - verificationToken: String? (unique, nullable)");
      console.log("   - verifiedAt: DateTime? (nullable)");
      console.log("   - createdAt: DateTime");
    }
  } catch (error: any) {
    if (error.message?.includes("does not exist") || error.message?.includes("no such table")) {
      console.error("❌ BetaSignup table does NOT exist in dev database!");
      console.error("   Run: DATABASE_URL=\"file:./prisma/dev.db\" npx prisma db push --schema=./prisma/schema.dev.prisma");
    } else {
      console.error("❌ Error checking table:", error.message);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkTable();

