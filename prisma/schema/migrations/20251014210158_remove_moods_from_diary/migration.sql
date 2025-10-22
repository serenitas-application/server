/*
  Warnings:

  - You are about to drop the column `mood_id` on the `diaries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."diaries" DROP CONSTRAINT "diaries_mood_id_fkey";

-- DropIndex
DROP INDEX "public"."diaries_mood_id_idx";

-- AlterTable
ALTER TABLE "public"."diaries" DROP COLUMN "mood_id";
