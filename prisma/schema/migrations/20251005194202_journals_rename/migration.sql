/*
  Warnings:

  - You are about to drop the `journals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."journals" DROP CONSTRAINT "journals_group_id_fkey";

-- DropTable
DROP TABLE "public"."journals";

-- CreateTable
CREATE TABLE "public"."pages" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hidden_status" BOOLEAN NOT NULL DEFAULT false,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "is_liked" BOOLEAN NOT NULL DEFAULT false,
    "updated_date" TIMESTAMPTZ(6),
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pages_group_id_idx" ON "public"."pages"("group_id");

-- AddForeignKey
ALTER TABLE "public"."pages" ADD CONSTRAINT "pages_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."page_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
