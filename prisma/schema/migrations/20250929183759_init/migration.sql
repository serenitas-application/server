-- CreateTable
CREATE TABLE "public"."journal_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hidden_status" BOOLEAN NOT NULL DEFAULT false,
    "updated_date" TIMESTAMPTZ(6),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "journal_groups_pkey" PRIMARY KEY ("id")
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
    "mood_id" INTEGER,

    CONSTRAINT "journals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."moods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "moods_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "journal_groups_user_id_idx" ON "public"."journal_groups"("user_id");

-- CreateIndex
CREATE INDEX "journals_group_id_idx" ON "public"."journals"("group_id");

-- CreateIndex
CREATE INDEX "moods_userId_idx" ON "public"."moods"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."journal_groups" ADD CONSTRAINT "journal_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."journals" ADD CONSTRAINT "journals_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."journal_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."journals" ADD CONSTRAINT "journals_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "public"."moods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moods" ADD CONSTRAINT "moods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
