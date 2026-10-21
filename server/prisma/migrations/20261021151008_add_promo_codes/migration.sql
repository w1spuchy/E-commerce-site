-- AlterTable
ALTER TABLE `carts` ADD COLUMN `promo_code_id` INTEGER UNSIGNED NULL;

-- CreateTable
CREATE TABLE `promo_codes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(70) NOT NULL,
    `discount_percentage` INTEGER UNSIGNED NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    CONSTRAINT `chk_discount_percentage` CHECK(discount_percentage BETWEEN 1 AND 100),

    UNIQUE INDEX `promo_codes_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_promo_code_id_fkey` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_codes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
