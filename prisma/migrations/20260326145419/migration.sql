/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerNick` on the `order` table. All the data in the column will be lost.
  - The `status` column on the `order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `email` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatuses" AS ENUM ('CANCELED', 'FAILED', 'PENDING', 'SUCCEEDED');

-- DropIndex
DROP INDEX "order_customerEmail_idx";

-- DropIndex
DROP INDEX "order_customerNick_idx";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "customerEmail",
DROP COLUMN "customerNick",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatuses" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "order_nickname_idx" ON "order"("nickname");

-- CreateIndex
CREATE INDEX "order_email_idx" ON "order"("email");

-- CreateIndex
CREATE INDEX "order_status_idx" ON "order"("status");
