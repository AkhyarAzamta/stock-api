/*
  Warnings:

  - You are about to drop the `Produksi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit_name_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Produksi` DROP FOREIGN KEY `Produksi_clasifications_name_id_fkey`;

-- DropForeignKey
ALTER TABLE `Produksi` DROP FOREIGN KEY `Produksi_item_code_id_fkey`;

-- DropForeignKey
ALTER TABLE `Produksi` DROP FOREIGN KEY `Produksi_supplier_name_id_fkey`;

-- DropForeignKey
ALTER TABLE `Produksi` DROP FOREIGN KEY `Produksi_unit_name_id_fkey`;

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `unit_name_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Produksi`;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_unit_name_id_fkey` FOREIGN KEY (`unit_name_id`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
