-- CreateTable
CREATE TABLE "public"."AIDailyItem" (
    "id" TEXT NOT NULL,
    "dateISO" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "bullets" JSONB NOT NULL,
    "sources" JSONB NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIDailyItem_pkey" PRIMARY KEY ("id")
);
