/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notes_title_userId_key" ON "Notes"("title", "userId");
