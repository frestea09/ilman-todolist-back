/*
  Warnings:

  - Made the column `doDateTask` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `doDateTask` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
