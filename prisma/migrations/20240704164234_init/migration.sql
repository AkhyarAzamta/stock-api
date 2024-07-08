-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_code` VARCHAR(191) NOT NULL,
    `item_description` VARCHAR(191) NOT NULL,
    `zahir_code` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `init_stock` INTEGER NOT NULL,
    `current_stock` INTEGER NOT NULL,
    `create_by` VARCHAR(191) NOT NULL,
    `update_by` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_name` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clasification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clasification_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_code_id` INTEGER NOT NULL,
    `zahir_code_id` INTEGER NOT NULL,
    `item_description_id` INTEGER NOT NULL,
    `price_id` INTEGER NOT NULL,
    `unit_name_id` INTEGER NOT NULL,
    `supplier_name_id` INTEGER NOT NULL,
    `clasifications_name_id` INTEGER NOT NULL,
    `init_stock_id` INTEGER NOT NULL,
    `current_stock_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockHistory` (
    `id_history` INTEGER NOT NULL AUTO_INCREMENT,
    `item_code_id` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `category` INTEGER NOT NULL,
    `image_id` INTEGER NOT NULL,
    `create_by_id` VARCHAR(191) NOT NULL,
    `update_by_id` VARCHAR(191) NOT NULL,
    `current_stock_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_history`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produksi` ADD CONSTRAINT `Produksi_item_code_id_fkey` FOREIGN KEY (`item_code_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produksi` ADD CONSTRAINT `Produksi_supplier_name_id_fkey` FOREIGN KEY (`supplier_name_id`) REFERENCES `Supplier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produksi` ADD CONSTRAINT `Produksi_unit_name_id_fkey` FOREIGN KEY (`unit_name_id`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produksi` ADD CONSTRAINT `Produksi_clasifications_name_id_fkey` FOREIGN KEY (`clasifications_name_id`) REFERENCES `Clasification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_item_code_id_fkey` FOREIGN KEY (`item_code_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
