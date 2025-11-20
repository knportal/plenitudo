-- CreateTable
CREATE TABLE "BetaSignup" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BetaSignup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BetaSignup_email_key" ON "BetaSignup"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BetaSignup_verificationToken_key" ON "BetaSignup"("verificationToken");

-- CreateIndex
CREATE INDEX "BetaSignup_email_idx" ON "BetaSignup"("email");

-- CreateIndex
CREATE INDEX "BetaSignup_verificationToken_idx" ON "BetaSignup"("verificationToken");
