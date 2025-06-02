-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cod', 'paypal', 'stripe');

-- CreateEnum
CREATE TYPE "ProductCategories" AS ENUM ('passiveComponents', 'activeComponents', 'electromechanicalComponents', 'sensorsAndTransducers', 'powerSources', 'displayAndOutputDevices');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "profileId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "address" TEXT,
    "mobileNumber" INTEGER,
    "zipCode" INTEGER,
    "province" TEXT,
    "region" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productCategory" "ProductCategories" NOT NULL,
    "productDescription" TEXT NOT NULL DEFAULT 'N/A',
    "productStock" INTEGER NOT NULL DEFAULT 0,
    "productPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
