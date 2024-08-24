/*
  Warnings:

  - Added the required column `postMakerId` to the `lostAndFind` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lostAndFind" ADD COLUMN     "postMakerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PostMaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "PostMaker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lostAndFind" ADD CONSTRAINT "lostAndFind_postMakerId_fkey" FOREIGN KEY ("postMakerId") REFERENCES "PostMaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
