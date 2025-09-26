/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Continent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Continent_name_key" ON "public"."Continent"("name");
