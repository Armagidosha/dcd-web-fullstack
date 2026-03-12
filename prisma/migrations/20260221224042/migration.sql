/*
  Warnings:

  - The values [terms,privacy] on the enum `PolicyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PolicyType_new" AS ENUM ('TERMS', 'PRIVACY');
ALTER TABLE "policy" ALTER COLUMN "type" TYPE "PolicyType_new" USING ("type"::text::"PolicyType_new");
ALTER TYPE "PolicyType" RENAME TO "PolicyType_old";
ALTER TYPE "PolicyType_new" RENAME TO "PolicyType";
DROP TYPE "public"."PolicyType_old";
COMMIT;
