-- AlterTable
ALTER TABLE "public"."Country" ADD COLUMN     "continentId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Country" ADD CONSTRAINT "Country_continentId_fkey" FOREIGN KEY ("continentId") REFERENCES "public"."Continent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
