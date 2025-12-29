/*
  Warnings:

  - You are about to drop the `Term` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PolicyType" AS ENUM ('terms', 'privacy');

-- DropTable
DROP TABLE "Term";

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "type" "PolicyType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);
