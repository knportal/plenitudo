-- CreateTable
CREATE TABLE "public"."Room" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Thread" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "authorName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatMessage" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "authorId" TEXT,
    "authorName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_slug_key" ON "public"."Room"("slug");

-- CreateIndex
CREATE INDEX "Room_slug_idx" ON "public"."Room"("slug");

-- CreateIndex
CREATE INDEX "Thread_roomId_idx" ON "public"."Thread"("roomId");

-- CreateIndex
CREATE INDEX "Post_threadId_idx" ON "public"."Post"("threadId");

-- CreateIndex
CREATE INDEX "ChatMessage_threadId_createdAt_idx" ON "public"."ChatMessage"("threadId", "createdAt");

-- CreateIndex
CREATE INDEX "AIDailyItem_dateISO_idx" ON "public"."AIDailyItem"("dateISO");

-- CreateIndex
CREATE INDEX "AIDailyItem_score_idx" ON "public"."AIDailyItem"("score");

-- AddForeignKey
ALTER TABLE "public"."Thread" ADD CONSTRAINT "Thread_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "public"."Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatMessage" ADD CONSTRAINT "ChatMessage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "public"."Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
