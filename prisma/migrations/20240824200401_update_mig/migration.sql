/*
  Warnings:

  - You are about to drop the `PostMaker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lostAndFind` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "lostAndFind" DROP CONSTRAINT "lostAndFind_postMakerId_fkey";

-- DropTable
DROP TABLE "PostMaker";

-- DropTable
DROP TABLE "lostAndFind";

-- CreateTable
CREATE TABLE "post_maker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "post_maker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lost_and_find" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "clothes" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "placeWhereLost" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "timeWhenLost" TIMESTAMP(3) NOT NULL,
    "isFound" BOOLEAN NOT NULL,
    "postMakerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lost_and_find_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lost_and_find" ADD CONSTRAINT "lost_and_find_postMakerId_fkey" FOREIGN KEY ("postMakerId") REFERENCES "post_maker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
