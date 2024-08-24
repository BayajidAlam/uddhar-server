/*
  Warnings:

  - A unique constraint covering the columns `[contactNumber]` on the table `post_maker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post_maker_contactNumber_key" ON "post_maker"("contactNumber");
