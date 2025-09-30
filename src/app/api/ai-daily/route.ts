import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { toETDateISO } from "@/server/aiDaily/text";

const prisma = new PrismaClient();

export async function GET() {
  const today = toETDateISO();
  console.log("API: Looking for dateISO:", today);

  const rows = await prisma.aIDailyItem.findMany({
    where: { dateISO: today },
    orderBy: { score: "desc" },
    take: 10,
  });

  console.log("API: Found rows:", rows.length);
  // shape into DTO
  const data = rows.map((r) => ({
    id: r.id,
    dateISO: r.dateISO,
    genre: r.genre as any,
    mood: r.mood as any,
    title: r.title,
    summary: r.summary,
    bullets: typeof r.bullets === "string" ? JSON.parse(r.bullets) : r.bullets,
    sources: typeof r.sources === "string" ? JSON.parse(r.sources) : r.sources,
    score: r.score,
  }));
  return NextResponse.json(data);
}
