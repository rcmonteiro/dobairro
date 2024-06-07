/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "avatar_url",
ALTER COLUMN "updated_at" DROP NOT NULL;
