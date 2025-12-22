-- AlterTable
ALTER TABLE "Rule" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "Rule_order_seq";
