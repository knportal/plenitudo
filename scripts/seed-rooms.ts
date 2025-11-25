import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rooms = [
    {
      slug: "ai",
      title: "AI",
      description: "Latest breakthroughs, tools, and prompts to build with.",
    },
    {
      slug: "mindfulness",
      title: "Mindfulness",
      description: "Guided reflections, breathing, and gratitude threads.",
    },
    {
      slug: "entrepreneurship",
      title: "Entrepreneurship",
      description: "Idea validation, small bets, funding leads, collabs.",
    },
  ];

  for (const room of rooms) {
    const created = await prisma.room.upsert({
      where: { slug: room.slug },
      update: { ...room, updatedAt: new Date() },
      create: { ...room, updatedAt: new Date() },
    });
    // Add example threads if none exist yet
    const count = await prisma.thread.count({ where: { roomId: created.id } });
    if (count === 0) {
      await prisma.thread.createMany({
        data: [
          {
            roomId: created.id,
            title: `${room.title} Starter Thread`,
            content: `Welcome to the ${room.title} room! Share one insight or question to kick things off.`,
            authorName: "System",
          },
          {
            roomId: created.id,
            title: `Resources for ${room.title}`,
            content: "Drop your favorite links, tools, and references here.",
            authorName: "System",
          },
        ],
        skipDuplicates: true,
      });

      // Add demo chat messages to the first thread
      const firstThread = await prisma.thread.findFirst({
        where: { roomId: created.id },
        orderBy: { createdAt: "asc" },
      });

      if (firstThread) {
        const chatMessageCount = await prisma.chatMessage.count({
          where: { threadId: firstThread.id },
        });

        if (chatMessageCount === 0) {
          await prisma.chatMessage.createMany({
            data: [
              {
                threadId: firstThread.id,
                authorName: "Alex",
                content: "Hey everyone! Excited to be here. 👋",
              },
              {
                threadId: firstThread.id,
                authorName: "Jordan",
                content: "Welcome! Looking forward to the discussion.",
              },
              {
                threadId: firstThread.id,
                authorName: "Sam",
                content: "This is a great space to share ideas.",
              },
            ],
          });
        }
      }
    }
  }

  console.log("Seeded rooms.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
