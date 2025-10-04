-- CreateTable
CREATE TABLE "public"."diaries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    CONSTRAINT "diaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."moods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "moods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."page_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hidden_status" BOOLEAN NOT NULL DEFAULT false,
    "updated_date" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "page_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."page_templates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "page_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."journals" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hidden_status" BOOLEAN NOT NULL DEFAULT false,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "is_liked" BOOLEAN NOT NULL DEFAULT false,
    "updated_date" TIMESTAMPTZ(6),
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "journals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "diaries_user_id_idx" ON "public"."diaries"("user_id");

-- CreateIndex
CREATE INDEX "diaries_mood_id_idx" ON "public"."diaries"("mood_id");

-- CreateIndex
CREATE INDEX "moods_user_id_idx" ON "public"."moods"("user_id");

-- CreateIndex
CREATE INDEX "page_groups_user_id_idx" ON "public"."page_groups"("user_id");

-- CreateIndex
CREATE INDEX "journals_group_id_idx" ON "public"."journals"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."diaries" ADD CONSTRAINT "diaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."diaries" ADD CONSTRAINT "diaries_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "public"."moods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moods" ADD CONSTRAINT "moods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."page_groups" ADD CONSTRAINT "page_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."journals" ADD CONSTRAINT "journals_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."page_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
