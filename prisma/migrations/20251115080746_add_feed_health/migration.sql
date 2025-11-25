-- CreateTable
CREATE TABLE "public"."FeedHealth" (
    "id" TEXT NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "feedLabel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSuccess" TIMESTAMP(3),
    "consecutiveFailures" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "responseTime" INTEGER,
    "itemCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedHealth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedHealth_feedUrl_key" ON "public"."FeedHealth"("feedUrl");

-- CreateIndex
CREATE INDEX "FeedHealth_status_idx" ON "public"."FeedHealth"("status");

-- CreateIndex
CREATE INDEX "FeedHealth_lastChecked_idx" ON "public"."FeedHealth"("lastChecked");
