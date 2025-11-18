import PlFooter from "@/components/plenitudo/layout/PlFooter";
import Link from "next/link";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
};

export const dynamic = "force-dynamic";

export default async function RoomPage({ params, searchParams }: PageProps) {
  const { slug: rawSlug } = await params;
  const slug = (rawSlug || "").toLowerCase();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const page = Math.max(1, Number(resolvedSearchParams?.page ?? 1) || 1);
  const pageSize = 5;
  const room = await prisma.room.findUnique({
    where: { slug },
    select: { id: true, title: true, description: true },
  });
  const [threads, totalThreads] = room
    ? await Promise.all([
        prisma.thread.findMany({
          where: { roomId: room.id },
          select: {
            id: true,
            title: true,
            authorName: true,
            createdAt: true,
            _count: { select: { posts: true } },
          },
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.thread.count({ where: { roomId: room.id } }),
      ])
    : [[], 0];
  const hasMore = page * pageSize < totalThreads;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="mt-8 sm:mt-16 mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {room ? `${room.title} Room` : "Room Not Found"}
            </h1>
            <Link
              href="/"
              className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl">
            {room
              ? room.description
              : "This room does not exist. Please go back and choose another room."}
          </p>
        </div>

        {room && (
          <div className="space-y-6">
            <section className="rounded-xl sm:rounded-2xl p-4 sm:p-5 ring-1 ring-white/10 bg-slate-900/40">
              <h2 className="text-lg sm:text-xl font-semibold">Highlights</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300">
                Coming soon: curated posts, links, and discussions tailored for{" "}
                {room.title}.
              </p>
            </section>

            <section className="rounded-xl sm:rounded-2xl p-4 sm:p-5 ring-1 ring-white/10 bg-slate-900/40">
              <h2 className="text-lg sm:text-xl font-semibold">
                Latest Threads
              </h2>
              {threads.length === 0 ? (
                <p className="mt-2 text-slate-300">
                  No threads yet. Be the first to start one.
                </p>
              ) : (
                <ul className="mt-3 space-y-2 text-slate-300">
                  {threads.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-lg sm:rounded-xl p-3 sm:p-4 bg-slate-900/60 ring-1 ring-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/rooms/${slug}/thread/${t.id}`}
                            className="font-medium underline-offset-4 hover:underline"
                          >
                            {t.title}
                          </Link>
                          <span className="text-xs text-slate-400">
                            · {t._count.posts} replies
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {t.authorName ?? "Anon"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {hasMore && (
                <div className="mt-4">
                  <Link
                    href={`/rooms/${slug}?page=${page + 1}`}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white/5 ring-1 ring-white/10 hover:bg-white/10 min-h-[44px]"
                  >
                    Load more
                  </Link>
                </div>
              )}
              <StartThreadForm roomId={room.id} />
            </section>
          </div>
        )}

        <PlFooter />
      </div>
    </div>
  );
}

async function createThreadAction(formData: FormData) {
  "use server";
  // Enable thread creation in development
  // Uncomment the line below to gate thread creation in production
  // if (process.env["BETA_START_THREAD"] !== "1") {
  //   throw new Error("Thread creation is gated for beta users.");
  // }
  const roomId = String(formData.get("roomId") || "");
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const authorName =
    String(formData.get("authorName") || "Anon").trim() || "Anon";
  if (!roomId || title.length < 3) return;
  await prisma.thread.create({ data: { roomId, title, content, authorName } });
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    select: { slug: true },
  });
  if (room?.slug) {
    revalidatePath(`/rooms/${room.slug}`);
  }
}

function StartThreadForm({ roomId }: { roomId: string }) {
  // Enable thread creation in development
  // In production, you can gate this with BETA_START_THREAD env var
  const gated = false; // Set to true to disable thread creation
  return (
    <form action={createThreadAction} className="mt-4 space-y-2">
      <input type="hidden" name="roomId" value={roomId} />
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="title"
          placeholder="Thread title"
          className="rounded-lg bg-slate-900/60 ring-1 ring-white/10 px-3 py-3 sm:py-2 text-sm sm:text-base min-h-[44px]"
          disabled={gated}
          required
          minLength={3}
        />
        <input
          name="authorName"
          placeholder="Your name (optional)"
          className="rounded-lg bg-slate-900/60 ring-1 ring-white/10 px-3 py-3 sm:py-2 text-sm sm:text-base min-h-[44px]"
          disabled={gated}
        />
      </div>
      <textarea
        name="content"
        placeholder="Write a short prompt to kick off the discussion (optional)"
        className="w-full rounded-lg bg-slate-900/60 ring-1 ring-white/10 px-3 py-3 sm:py-2 text-sm sm:text-base min-h-20"
        disabled={gated}
      />
      <button
        type="submit"
        disabled={gated}
        className="inline-flex items-center gap-2 rounded-lg px-4 py-3 sm:py-2 text-sm sm:text-base bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/20 disabled:opacity-50 min-h-[44px]"
      >
        {gated ? "Beta only" : "Start thread"}
      </button>
    </form>
  );
}
