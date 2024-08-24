-- AlterTable
ALTER TABLE "lost_and_find" ALTER COLUMN "isFound" DROP NOT NULL,
ALTER COLUMN "isFound" SET DEFAULT false;
