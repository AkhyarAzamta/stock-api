/*
  Warnings:

  - A unique constraint covering the columns `[zahir_code]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Item_item_code_key` ON `Item`;

-- CreateIndex
CREATE UNIQUE INDEX `Item_zahir_code_key` ON `Item`(`zahir_code`);
