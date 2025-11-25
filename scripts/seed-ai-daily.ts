import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
const prisma = new PrismaClient();

(async () => {
  const dateISO = format(new Date(), "yyyy-MM-dd");
  await prisma.aIDailyItem.deleteMany({ where: { dateISO } });
  await prisma.aIDailyItem.create({
    data: {
      dateISO,
      genre: "policy",
      mood: "opportunity",
      title: "EU publishes AI Act guidance for GPAI",
      summary:
        "The European Commission released fresh guidance to help developers comply with GPAI obligations...",
      bullets: JSON.stringify([
        "Impact: clearer path to compliance",
        "Founder tip: map your disclosures early",
      ]),
      sources: JSON.stringify([
        {
          title: "Commission guidance",
          url: "https://europa.eu",
          publisher: "EU Commission",
          publishedAt: new Date().toISOString(),
        },
        {
          title: "Coverage",
          url: "https://www.reuters.com",
          publisher: "Reuters",
          publishedAt: new Date().toISOString(),
        },
      ]),
      score: 7,
      updatedAt: new Date(),
    },
  });
  console.log("Seeded 1 item.");
  process.exit(0);
})();
