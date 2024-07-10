/*
  Warnings:

  - You are about to drop the column `unit_name_id` on the `StockHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `StockHistory` DROP FOREIGN KEY `StockHistory_unit_name_id_fkey`;

-- AlterTable
ALTER TABLE `StockHistory` DROP COLUMN `unit_name_id`;
