/*
  Warnings:

  - You are about to drop the column `date` on the `OdometerReading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lease" ADD COLUMN     "initialMiles" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OdometerReading" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
