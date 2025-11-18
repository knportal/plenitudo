import PlFooter from "@/components/plenitudo/layout/PlFooter";
import Link from "next/link";
import { prisma } from "@/server/db";
import { revalidatePath } from "next/cache";
import { ThreadReplies } from "@/components/rooms/ThreadReplies";
import { ThreadChatPanel } from "@/components/rooms/ThreadChatPanel";
import { SummarizeChatButton } from "@/components/rooms/SummarizeChatButton";
import { ThreadContent } from "@/components/rooms/ThreadContent";
import { indexDocuments } from "@/server/search/index";
import type { PostSearchDoc } from "@/server/search/types";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string; id: string }> };

export default async function ThreadPage({ params }: PageProps) {
  const { slug: rawSlug, id } = await params;
  const slug = (rawSlug || "").toLowerCase();

  const room = await prisma.room.findUnique({
    where: { slug },
    select: { id: true, title: true, slug: true },
  });
  if (!room) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
          <p className="mt-16">Room not found.</p>
          <PlFooter />
        </div>
      </div>
    );
  }

  const thread = (await prisma.thread.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      authorName: true,
      createdAt: true,
      posts: {
        orderBy: [{ pinned: "desc" }, { createdAt: "asc" }], // Pinned posts first, then chronological
        select: {
          id: true,
          content: true,
          authorName: true,
          pinned: true,
          createdAt: true,
        },
      },
      chatMessages: {
        orderBy: { createdAt: "asc" },
        take: 50,
        where: {
          // Filter out hidden messages for regular users
          ...(process.env["IS_ADMIN"] === "1" ? {} : { hidden: false }),
        },
        select: {
          id: true,
          threadId: true,
          authorId: true,
          authorName: true,
          content: true,
          hidden: true,
          createdAt: true,
        },
      },
    },
  })) as {
    id: string;
    title: string;
    content: string;
    authorName: string | null;
    createdAt: Date;
    posts: Array<{
      id: string;
      content: string;
      authorName: string | null;
      pinned: boolean;
      createdAt: Date;
    }>;
    chatMessages: Array<{
      id: string;
      threadId: string;
      authorId: string | null;
      authorName: string;
      content: string;
      hidden: boolean;
      createdAt: Date;
    }>;
  } | null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="mt-8 sm:mt-16 mb-6 sm:mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {thread ? thread.title : "Thread Not Found"}
            </h1>
            <div className="flex items-center gap-3">
              {thread && (
                <SummarizeChatButton
                  threadId={thread.id}
                  isAdmin={process.env["IS_ADMIN"] === "1"}
                />
              )}
              <Link
                href={`/rooms/${room.slug}`}
                className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
              >
                ← Back to {room.title}
              </Link>
              <Link
                href="/"
                className="text-sm underline underline-offset-4 focus:outline-none focus-visible:ring ring-emerald-400 rounded px-2 py-1 hover:text-emerald-300 transition-colors"
              >
                ← Home
              </Link>
            </div>
          </div>
          {thread && (
            <p className="text-slate-300 max-w-3xl">
              Started by {thread.authorName ?? "Anon"}
            </p>
          )}
        </div>

        {thread ? (
          <div className="space-y-6">
            {thread.content && (
              <section className="rounded-2xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <ThreadContent content={thread.content} />
              </section>
            )}

            {/* Two-column layout: Posts (left) and Chat (right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Posts Section (left) */}
              <section className="rounded-2xl p-5 ring-1 ring-white/10 bg-slate-900/40">
                <h2 className="text-xl font-semibold">Replies</h2>
                <ThreadReplies
                  threadId={thread.id}
                  initialPosts={thread.posts}
                />
                <ReplyForm roomSlug={room.slug} threadId={thread.id} />
              </section>

              {/* Chat Panel (right) */}
              <section className="rounded-2xl ring-1 ring-white/10 bg-slate-900/40 overflow-hidden">
                <ThreadChatPanel
                  threadId={thread.id}
                  initialMessages={thread.chatMessages.map(
                    (m: {
                      id: string;
                      threadId: string;
                      authorId: string | null;
                      authorName: string;
                      content: string;
                      hidden: boolean;
                      createdAt: Date;
                    }) => ({
                      id: m.id,
                      threadId: m.threadId,
                      authorId: m.authorId,
                      authorName: m.authorName,
                      content: m.content,
                      hidden: m.hidden,
                      createdAt: m.createdAt.toISOString(),
                    })
                  )}
                  isAdmin={process.env["IS_ADMIN"] === "1"}
                />
              </section>
            </div>
          </div>
        ) : (
          <p>Thread not found.</p>
        )}

        <PlFooter />
      </div>
    </div>
  );
}

async function replyAction(formData: FormData) {
  "use server";
  const threadId = String(formData.get("threadId") || "");
  const content = String(formData.get("content") || "").trim();
  const authorName =
    String(formData.get("authorName") || "Anon").trim() || "Anon";
  const roomSlug = String(formData.get("roomSlug") || "");
  if (!threadId || content.length < 1) return;

  // Get thread info for search indexing
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    select: {
      title: true,
      room: {
        select: {
          slug: true,
          title: true,
        },
      },
    },
  });

  // Create Post
  const post = await prisma.post.create({
    data: { threadId, content, authorName, updatedAt: new Date() },
  });

  // Index for search (fire and forget - don't block)
  if (thread?.room?.slug) {
    const searchDoc: PostSearchDoc = {
      id: post.id,
      type: "post",
      content: post.content,
      ...(post.authorName ? { authorName: post.authorName } : {}),
      createdAt: post.createdAt.toISOString(),
      threadId: threadId,
      threadTitle: thread.title,
      roomSlug: thread.room.slug,
      pinned: false,
    };

    indexDocuments([searchDoc]).catch((error) => {
      console.error("Failed to index post for search:", error);
    });
  }

  if (roomSlug) revalidatePath(`/rooms/${roomSlug}/thread/${threadId}`);
}

function ReplyForm({
  roomSlug,
  threadId,
}: {
  roomSlug: string;
  threadId: string;
}) {
  return (
    <form action={replyAction} className="mt-4 space-y-2">
      <input type="hidden" name="roomSlug" value={roomSlug} />
      <input type="hidden" name="threadId" value={threadId} />
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="authorName"
          placeholder="Your name (optional)"
          className="rounded-lg bg-slate-900/60 ring-1 ring-white/10 px-3 py-2 text-sm"
        />
      </div>
      <textarea
        name="content"
        placeholder="Write your reply"
        className="w-full rounded-lg bg-slate-900/60 ring-1 ring-white/10 px-3 py-2 text-sm min-h-20"
        required
        minLength={1}
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/20"
      >
        Reply
      </button>
    </form>
  );
}
