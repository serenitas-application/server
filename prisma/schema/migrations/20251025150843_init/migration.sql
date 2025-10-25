-- CreateTable
CREATE TABLE "public"."diaries" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "create_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edit_date" TIMESTAMPTZ(6),
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "diaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."email_verify_token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verify_token_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "email_verify_token_token_key" ON "public"."email_verify_token"("token");

-- CreateIndex
CREATE INDEX "email_verify_token_userId_idx" ON "public"."email_verify_token"("userId");

-- CreateIndex
CREATE INDEX "email_verify_token_expires_at_idx" ON "public"."email_verify_token"("expires_at");

-- CreateIndex
CREATE INDEX "moods_user_id_idx" ON "public"."moods"("user_id");

-- CreateIndex
CREATE INDEX "page_groups_user_id_idx" ON "public"."page_groups"("user_id");

-- CreateIndex
CREATE INDEX "pages_group_id_idx" ON "public"."pages"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."diaries" ADD CONSTRAINT "diaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."moods" ADD CONSTRAINT "moods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."page_groups" ADD CONSTRAINT "page_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pages" ADD CONSTRAINT "pages_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."page_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
