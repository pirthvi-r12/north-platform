-- NORTH® Platform — MySQL database (schema + reference data)

CREATE DATABASE IF NOT EXISTS `north` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `north`;

-- Users & auth (NextAuth + credentials)
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NULL,
  `email` VARCHAR(191) NOT NULL,
  `passwordHash` VARCHAR(191) NULL,
  `role` ENUM('ADMIN', 'MANAGER', 'DESIGNER', 'CLIENT') NOT NULL DEFAULT 'CLIENT',
  `image` VARCHAR(191) NULL,
  `emailVerified` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Account` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `provider` VARCHAR(191) NOT NULL,
  `providerAccountId` VARCHAR(191) NOT NULL,
  `refresh_token` TEXT NULL,
  `access_token` TEXT NULL,
  `expires_at` INT NULL,
  `token_type` VARCHAR(191) NULL,
  `scope` VARCHAR(191) NULL,
  `id_token` TEXT NULL,
  `session_state` VARCHAR(191) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`, `providerAccountId`),
  KEY `Account_userId_idx` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Session` (
  `id` VARCHAR(191) NOT NULL,
  `sessionToken` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_idx` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `VerificationToken` (
  `identifier` VARCHAR(191) NOT NULL,
  `token` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`, `token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Project` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `status` ENUM('DISCOVERY', 'DESIGN', 'DEVELOPMENT', 'REVIEW', 'LAUNCHED', 'ON_HOLD') NOT NULL DEFAULT 'DISCOVERY',
  `progress` INT NOT NULL DEFAULT 0,
  `budget` DECIMAL(12, 2) NOT NULL,
  `deadline` DATETIME(3) NULL,
  `clientId` VARCHAR(191) NOT NULL,
  `assignedTo` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Project_clientId_idx` (`clientId`),
  KEY `Project_assignedTo_idx` (`assignedTo`),
  CONSTRAINT `Project_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Project_assignedTo_fkey` FOREIGN KEY (`assignedTo`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Milestone` (
  `id` VARCHAR(191) NOT NULL,
  `projectId` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `isCompleted` BOOLEAN NOT NULL DEFAULT FALSE,
  `dueDate` DATETIME(3) NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Milestone_projectId_idx` (`projectId`),
  CONSTRAINT `Milestone_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Invoice` (
  `id` VARCHAR(191) NOT NULL,
  `projectId` VARCHAR(191) NOT NULL,
  `amount` DECIMAL(12, 2) NOT NULL,
  `currency` VARCHAR(191) NOT NULL DEFAULT 'usd',
  `status` ENUM('PAID', 'UNPAID', 'OVERDUE') NOT NULL DEFAULT 'UNPAID',
  `stripePaymentIntentId` VARCHAR(191) NULL,
  `dueDate` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Invoice_projectId_idx` (`projectId`),
  CONSTRAINT `Invoice_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `CaseStudy` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `category` VARCHAR(191) NOT NULL,
  `clientName` VARCHAR(191) NOT NULL,
  `coverImage` VARCHAR(191) NOT NULL,
  `contentJson` JSON NOT NULL,
  `featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `CaseStudy_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `DesignComment` (
  `id` VARCHAR(191) NOT NULL,
  `projectId` VARCHAR(191) NOT NULL,
  `authorId` VARCHAR(191) NOT NULL,
  `commentText` TEXT NOT NULL,
  `canvasCoordinatesJson` JSON NOT NULL,
  `resolved` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `DesignComment_projectId_idx` (`projectId`),
  KEY `DesignComment_authorId_idx` (`authorId`),
  CONSTRAINT `DesignComment_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `DesignComment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ChatThread` (
  `id` VARCHAR(191) NOT NULL,
  `projectId` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ChatThread_projectId_idx` (`projectId`),
  CONSTRAINT `ChatThread_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ChatMessage` (
  `id` VARCHAR(191) NOT NULL,
  `threadId` VARCHAR(191) NOT NULL,
  `authorId` VARCHAR(191) NOT NULL,
  `body` TEXT NOT NULL,
  `attachmentUrl` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ChatMessage_threadId_idx` (`threadId`),
  KEY `ChatMessage_authorId_idx` (`authorId`),
  CONSTRAINT `ChatMessage_threadId_fkey` FOREIGN KEY (`threadId`) REFERENCES `ChatThread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ChatMessage_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `DesignVersion` (
  `id` VARCHAR(191) NOT NULL,
  `projectId` VARCHAR(191) NOT NULL,
  `label` VARCHAR(191) NOT NULL,
  `previewUrl` VARCHAR(191) NOT NULL,
  `notes` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `DesignVersion_projectId_idx` (`projectId`),
  CONSTRAINT `DesignVersion_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `DigitalAsset` (
  `id` VARCHAR(191) NOT NULL,
  `projectId` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `fileType` VARCHAR(191) NOT NULL,
  `downloadUrl` VARCHAR(191) NOT NULL,
  `sizeBytes` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `DigitalAsset_projectId_idx` (`projectId`),
  CONSTRAINT `DigitalAsset_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `JournalPost` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  `readMinutes` INT NOT NULL DEFAULT 5,
  `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `JournalPost_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `OnboardingSubmission` (
  `id` VARCHAR(191) NOT NULL,
  `clientEmail` VARCHAR(191) NOT NULL,
  `payloadJson` JSON NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `CaseStudy` (
  `id`, `title`, `slug`, `category`, `clientName`, `coverImage`, `contentJson`, `featured`
) VALUES
(
  'cs_acme_rebrand', 'Acme Rebrand', 'acme-rebrand', 'Brand Identity', 'Acme Corp',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=3840&q=90',
  JSON_OBJECT('summary', 'Editorial identity with warm neutrals and serif accents.', 'metrics', JSON_OBJECT('lift', '+34%', 'timeline', '14 weeks')),
  TRUE
),
(
  'cs_northwind', 'Northwind SaaS', 'northwind-saas', 'Product Design', 'Northwind',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=3840&q=90',
  JSON_OBJECT('summary', 'B2B dashboard UI with glass panels and motion onboarding.', 'metrics', JSON_OBJECT('lift', '+21%', 'timeline', '10 weeks')),
  TRUE
),
(
  'cs_harbor', 'Harbor Finance', 'harbor-finance', 'Web Platform', 'Harbor Capital',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=3840&q=90',
  JSON_OBJECT('summary', 'Trust-first fintech with live analytics and client portal.', 'metrics', JSON_OBJECT('lift', '+18%', 'timeline', '16 weeks')),
  FALSE
),
(
  'cs_lumen', 'Lumen Retail', 'lumen-retail', 'Brand Identity', 'Lumen',
  'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?auto=format&fit=crop&w=3840&q=90',
  JSON_OBJECT('summary', 'Retail rebrand across packaging and editorial commerce.', 'metrics', JSON_OBJECT('lift', '+27%', 'timeline', '12 weeks')),
  FALSE
),
(
  'cs_atlas', 'Atlas Mobility', 'atlas-mobility', 'Product Design', 'Atlas',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=3840&q=90',
  JSON_OBJECT('summary', 'Mobility app UX with 3D hero moments and booking flows.', 'metrics', JSON_OBJECT('lift', '+31%', 'timeline', '11 weeks')),
  FALSE
),
(
  'cs_meridian', 'Studio Meridian', 'studio-meridian', 'Web Platform', 'Meridian Group',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=3840&q=90',
  JSON_OBJECT('summary', 'Corporate site with RBAC workspace and Stripe billing.', 'metrics', JSON_OBJECT('lift', '+22%', 'timeline', '9 weeks')),
  FALSE
),
(
  'cs_copper', 'Copper & Clay', 'copper-clay', 'Brand Identity', 'Copper & Clay',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=3840&q=90',
  JSON_OBJECT('summary', 'Artisan brand world with photography and ecommerce UI.', 'metrics', JSON_OBJECT('lift', '+19%', 'timeline', '8 weeks')),
  FALSE
)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `coverImage` = VALUES(`coverImage`), `contentJson` = VALUES(`contentJson`);

INSERT INTO `JournalPost` (
  `id`, `title`, `slug`, `excerpt`, `body`, `readMinutes`
) VALUES (
  'jp_clarity',
  'Clarity is a competitive advantage',
  'clarity-is-a-competitive-advantage',
  'Why editorial systems outperform flashy dashboards in client trust.',
  'Design systems that breathe — with serif emphasis and warm neutrals — signal craft before a single pixel ships.',
  6
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);
