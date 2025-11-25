import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.thread.deleteMany({
    where: {
      title: {
        startsWith: "AI Daily —",
      },
    },
  });

  console.log(`✅ Deleted ${result.count} AI Daily thread(s)`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());


