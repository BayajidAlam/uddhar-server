/*
  Warnings:

  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `carts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conversations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviewAndRatings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sellers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sellsManagers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sku` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `superAdmins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_productId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "colors" DROP CONSTRAINT "colors_shopId_fkey";

-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_senderId_fkey";

-- DropForeignKey
ALTER TABLE "coupon" DROP CONSTRAINT "coupon_shopId_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_couponId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_userId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_orderId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_productSkuId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_shopId_fkey";

-- DropForeignKey
ALTER TABLE "reviewAndRatings" DROP CONSTRAINT "reviewAndRatings_customerId_fkey";

-- DropForeignKey
ALTER TABLE "reviewAndRatings" DROP CONSTRAINT "reviewAndRatings_productId_fkey";

-- DropForeignKey
ALTER TABLE "sellers" DROP CONSTRAINT "sellers_userId_fkey";

-- DropForeignKey
ALTER TABLE "sellsManagers" DROP CONSTRAINT "sellsManagers_shopId_fkey";

-- DropForeignKey
ALTER TABLE "sellsManagers" DROP CONSTRAINT "sellsManagers_userId_fkey";

-- DropForeignKey
ALTER TABLE "shop" DROP CONSTRAINT "shop_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_shopId_fkey";

-- DropForeignKey
ALTER TABLE "sku" DROP CONSTRAINT "sku_shopId_fkey";

-- DropForeignKey
ALTER TABLE "superAdmins" DROP CONSTRAINT "superAdmins_userId_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_productId_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_userId_fkey";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "carts";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "colors";

-- DropTable
DROP TABLE "conversations";

-- DropTable
DROP TABLE "coupon";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "reviewAndRatings";

-- DropTable
DROP TABLE "sellers";

-- DropTable
DROP TABLE "sellsManagers";

-- DropTable
DROP TABLE "shop";

-- DropTable
DROP TABLE "sizes";

-- DropTable
DROP TABLE "sku";

-- DropTable
DROP TABLE "superAdmins";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "wishlists";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "lostAndFind" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "clothes" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "placeWhereLost" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "timeWhenLost" TIMESTAMP(3) NOT NULL,
    "isFound" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lostAndFind_pkey" PRIMARY KEY ("id")
);
