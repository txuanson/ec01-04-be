/*
  Warnings:

  - A unique constraint covering the columns `[m_left_node]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[m_name]` on the table `manufacturer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `m_name` on table `manufacturer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `m_desc` on table `manufacturer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "m_parent" INTEGER;

-- AlterTable
CREATE SEQUENCE "manufacturer_m_id_seq";
ALTER TABLE "manufacturer" ALTER COLUMN "m_id" SET DEFAULT nextval('manufacturer_m_id_seq'),
ALTER COLUMN "m_name" SET NOT NULL,
ALTER COLUMN "m_desc" SET NOT NULL;
ALTER SEQUENCE "manufacturer_m_id_seq" OWNED BY "manufacturer"."m_id";

-- AlterTable
ALTER TABLE "origin" ADD COLUMN     "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "forget_password_token" (
    "m_user_id" INTEGER NOT NULL,
    "m_token" TEXT NOT NULL,
    "m_expire" TIMESTAMP(6) NOT NULL,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "forget_password_token_pk" PRIMARY KEY ("m_user_id")
);

-- CreateTable
CREATE TABLE "photo" (
    "m_id" TEXT NOT NULL,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photo_pk" PRIMARY KEY ("m_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forget_password_token_m_token_uindex" ON "forget_password_token"("m_token");

-- CreateIndex
CREATE UNIQUE INDEX "category_m_left_node_uindex" ON "category"("m_left_node");

-- CreateIndex
CREATE INDEX "category_m_parent_index" ON "category"("m_parent");

-- CreateIndex
CREATE INDEX "category_m_right_node_index" ON "category"("m_right_node");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_m_name_uindex" ON "manufacturer"("m_name");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_category_m_id_fk" FOREIGN KEY ("m_parent") REFERENCES "category"("m_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forget_password_token" ADD CONSTRAINT "forget_password_token_user_m_id_fk" FOREIGN KEY ("m_user_id") REFERENCES "user"("m_id") ON DELETE CASCADE ON UPDATE CASCADE;
