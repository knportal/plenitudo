import PlFooter from "@/components/plenitudo/layout/PlFooter";
import Link from "next/link";
import { prisma } from "@/server/db";

export const dynamic = "force-dynamic";

export default async function RoomsIndexPage() {
  const rooms = await prisma.room.findMany({
    select: { slug: true, title: true, description: true },
    orderBy: { title: "asc" },
  });
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">

        <div className="mt-8 sm:mt-16 mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Topic Rooms</h1>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
            Explore focused spaces for learning and collaboration. More rooms coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              href={`/rooms/${room.slug}`}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 ring-1 ring-white/10 bg-slate-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 min-h-[44px]"
            >
              <h2 className="text-base sm:text-lg font-semibold">{room.title}</h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 pr-4 sm:pr-6">{room.description}</p>
              <span className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-300">
                Enter →
              </span>
            </Link>
          ))}
        </div>

        <PlFooter />
      </div>
    </div>
  );
}


