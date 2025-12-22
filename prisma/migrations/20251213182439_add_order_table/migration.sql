/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Rule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Rule" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rule_order_key" ON "Rule"("order");
