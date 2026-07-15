/*
  Warnings:

  - Changed the type of `provider` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthProviderEnum" AS ENUM ('EMAIL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "SkillSeverityEnum" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "provider",
ADD COLUMN     "provider" "AuthProviderEnum" NOT NULL;

-- DropEnum
DROP TYPE "AuthProvider";

-- CreateTable
CREATE TABLE "InterviewReport" (
    "id" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "resumeData" TEXT,
    "selfDescription" TEXT,
    "matchScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InterviewReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BehavioralQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "intention" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "interviewReportId" TEXT NOT NULL,

    CONSTRAINT "BehavioralQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "intention" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "interviewReportId" TEXT NOT NULL,

    CONSTRAINT "TechnicalQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillGap" (
    "id" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "severity" "SkillSeverityEnum" NOT NULL,
    "interviewReportId" TEXT NOT NULL,

    CONSTRAINT "SkillGap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreparationPlan" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "focus" TEXT NOT NULL,
    "tasks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interviewReportId" TEXT NOT NULL,

    CONSTRAINT "PreparationPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewReport" ADD CONSTRAINT "InterviewReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BehavioralQuestion" ADD CONSTRAINT "BehavioralQuestion_interviewReportId_fkey" FOREIGN KEY ("interviewReportId") REFERENCES "InterviewReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalQuestion" ADD CONSTRAINT "TechnicalQuestion_interviewReportId_fkey" FOREIGN KEY ("interviewReportId") REFERENCES "InterviewReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillGap" ADD CONSTRAINT "SkillGap_interviewReportId_fkey" FOREIGN KEY ("interviewReportId") REFERENCES "InterviewReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreparationPlan" ADD CONSTRAINT "PreparationPlan_interviewReportId_fkey" FOREIGN KEY ("interviewReportId") REFERENCES "InterviewReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
