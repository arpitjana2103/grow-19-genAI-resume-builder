/*
  Warnings:

  - Made the column `resumeData` on table `InterviewReport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InterviewReport" ALTER COLUMN "resumeData" SET NOT NULL;
