/*
  Warnings:

  - You are about to drop the `Equipment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_created_by_user_id_fkey";

-- DropTable
DROP TABLE "Equipment";

-- CreateTable
CREATE TABLE "equipments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "created_by_user_id" INTEGER NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipments_email_key" ON "equipments"("email");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_type_key" ON "equipments"("type");

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
