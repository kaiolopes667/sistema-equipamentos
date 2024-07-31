/*
  Warnings:

  - You are about to drop the column `name` on the `equipments` table. All the data in the column will be lost.
  - Added the required column `person_name` to the `equipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipments" DROP COLUMN "name",
ADD COLUMN     "person_name" VARCHAR(50) NOT NULL;
