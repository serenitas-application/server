/*
  Warnings:

  - You are about to drop the column `date` on the `diaries` table. All the data in the column will be lost.
  - Added the required column `edit_date` to the `diaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."diaries" DROP COLUMN "date",
ADD COLUMN     "create_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "edit_date" TIMESTAMPTZ(6) NOT NULL;
