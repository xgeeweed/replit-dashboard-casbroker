/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'AGENT';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");
