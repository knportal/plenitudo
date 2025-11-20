import PlArrowIcon from "../icons/PlArrowIcon";
import Link from "next/link";

function PlRoomCard({ title, desc, accent, href }) {
  return (
    <article className="group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-5 ring-1 ring-white/10 bg-slate-900/50 focus-within:ring-emerald-400/80">
      <div
        className={`absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        aria-hidden
      >
        <div
          className={`absolute inset-0 blur-2xl bg-gradient-to-r ${accent} opacity-25`}
        />
      </div>
      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-300 pr-4 sm:pr-6">{desc}</p>
      <Link href={href} className="mt-3 sm:mt-4 inline-flex btn-ghost min-h-[44px] items-center relative z-10" aria-label={`Enter ${title} room`}>
        <PlArrowIcon className="size-4" />
        Enter room
      </Link>
    </article>
  );
}

export default function PlRooms() {
  return (
    <section aria-labelledby="rooms-title" className="mt-8 sm:mt-16">
      <div className="flex items-center gap-3">
        <h2
          id="rooms-title"
          className="text-xl md:text-2xl font-semibold tracking-tight"
        >
          Topic Rooms
        </h2>
        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10">
          beta
        </span>
      </div>
      <p className="mt-2 text-slate-300 max-w-3xl text-sm sm:text-base">
        Rooms are focused spaces for ongoing, high-signal conversations. Join a
        room to follow curated highlights, participate in threads, and share
        practical resources with others interested in the same topic.
      </p>
      <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <PlRoomCard
          title="AI"
          desc="Latest breakthroughs, tools, and prompts to build with."
          accent="from-fuchsia-500 via-cyan-400 to-emerald-400"
          href="/rooms/ai"
        />
        <PlRoomCard
          title="Mindfulness"
          desc="Guided reflections, breathing, and gratitude threads."
          accent="from-emerald-400 via-teal-300 to-sky-400"
          href="/rooms/mindfulness"
        />
        <PlRoomCard
          title="Entrepreneurship"
          desc="Idea validation, small bets, funding leads, collabs."
          accent="from-amber-400 via-pink-400 to-violet-500"
          href="/rooms/entrepreneurship"
        />
      </div>
    </section>
  );
}
