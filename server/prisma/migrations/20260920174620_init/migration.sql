-- CreateTable
CREATE TABLE `packages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('international', 'domestic') NOT NULL,
    `country` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `detailed_description` TEXT NULL,
    `price_per_person` DECIMAL(10, 2) NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `duration` VARCHAR(191) NULL,
    `inclusions` JSON NULL,
    `exclusions` JSON NULL,
    `itinerary` JSON NULL,
    `main_image` VARCHAR(191) NULL,
    `gallery_images` JSON NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `meta_title` VARCHAR(191) NULL,
    `meta_description` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cms_pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `page_type` VARCHAR(191) NOT NULL,
    `content` JSON NOT NULL,
    `meta_data` JSON NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `cms_pages_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
