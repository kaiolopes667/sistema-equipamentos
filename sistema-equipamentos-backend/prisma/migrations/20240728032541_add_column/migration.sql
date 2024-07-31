/*
  Warnings:

  - Added the required column `asset_number` to the `equipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "asset_number" BIGINT NOT NULL;
