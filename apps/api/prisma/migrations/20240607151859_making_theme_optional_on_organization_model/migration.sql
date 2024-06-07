-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_theme_id_fkey";

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "theme_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
