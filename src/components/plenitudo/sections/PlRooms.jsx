import PlArrowIcon from "../icons/PlArrowIcon";

function PlRoomCard({ title, desc, accent }) {
  return (
    <article className="relative overflow-hidden rounded-2xl p-5 ring-1 ring-white/10 bg-slate-900/50 focus-within:ring-emerald-400/80">
      <div
        className={`absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        aria-hidden
      >
        <div
          className={`absolute inset-0 blur-2xl bg-gradient-to-r ${accent} opacity-25`}
        />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-300 pr-6">{desc}</p>
      <button className="mt-4 btn-ghost" aria-label={`Enter ${title} room`}>
        <PlArrowIcon className="size-4" />
        Enter room
      </button>
    </article>
  );
}

export default function PlRooms() {
  return (
    <section aria-labelledby="rooms-title" className="mt-16">
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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PlRoomCard
          title="AI"
          desc="Latest breakthroughs, tools, and prompts to build with."
          accent="from-fuchsia-500 via-cyan-400 to-emerald-400"
        />
        <PlRoomCard
          title="Mindfulness"
          desc="Guided reflections, breathing, and gratitude threads."
          accent="from-emerald-400 via-teal-300 to-sky-400"
        />
        <PlRoomCard
          title="Entrepreneurship"
          desc="Idea validation, small bets, funding leads, collabs."
          accent="from-amber-400 via-pink-400 to-violet-500"
        />
      </div>
    </section>
  );
}
