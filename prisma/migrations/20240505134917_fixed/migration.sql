/*
  Warnings:

  - You are about to drop the column `is_compleate` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "is_compleate",
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;
