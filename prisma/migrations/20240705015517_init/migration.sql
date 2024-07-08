/*
  Warnings:

  - Added the required column `clasifications_name_id` to the `StockHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_name_id` to the `StockHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_name_id` to the `StockHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StockHistory` ADD COLUMN `clasifications_name_id` INTEGER NOT NULL,
    ADD COLUMN `supplier_name_id` INTEGER NOT NULL,
    ADD COLUMN `unit_name_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_supplier_name_id_fkey` FOREIGN KEY (`supplier_name_id`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_unit_name_id_fkey` FOREIGN KEY (`unit_name_id`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_clasifications_name_id_fkey` FOREIGN KEY (`clasifications_name_id`) REFERENCES `Clasification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
