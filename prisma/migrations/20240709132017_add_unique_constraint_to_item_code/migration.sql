/*
  Warnings:

  - A unique constraint covering the columns `[item_code]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Item_item_code_key` ON `Item`(`item_code`);
