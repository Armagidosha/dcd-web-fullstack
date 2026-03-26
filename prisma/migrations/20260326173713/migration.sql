/*
  Warnings:

  - A unique constraint covering the columns `[postLink]` on the table `news` will be added. If there are existing duplicate values, this will fail.
  - Made the column `postLink` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "news" ALTER COLUMN "postLink" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "news_postLink_key" ON "news"("postLink");
