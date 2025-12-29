/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Policy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Policy_type_key" ON "Policy"("type");
