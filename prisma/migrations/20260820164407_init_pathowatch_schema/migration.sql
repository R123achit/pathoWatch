-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "geojson" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "apiIdentifier" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmrRecord" (
    "id" TEXT NOT NULL,
    "externalRecordId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "pathogen" TEXT NOT NULL,
    "sampleType" TEXT NOT NULL,
    "antimicrobial" TEXT NOT NULL,
    "susceptibilityResult" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AmrRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncLog" (
    "id" TEXT NOT NULL,
    "sourceFacilityId" TEXT,
    "syncStartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "syncCompletedAt" TIMESTAMP(3),
    "recordsReceived" INTEGER NOT NULL DEFAULT 0,
    "recordsAdded" INTEGER NOT NULL DEFAULT 0,
    "recordsSkipped" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveillanceAlert" (
    "id" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "alertType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveillanceAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_key" ON "Area"("name");

-- CreateIndex
CREATE INDEX "Area_district_state_idx" ON "Area"("district", "state");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_apiIdentifier_key" ON "Facility"("apiIdentifier");

-- CreateIndex
CREATE INDEX "Facility_areaId_idx" ON "Facility"("areaId");

-- CreateIndex
CREATE INDEX "Facility_type_idx" ON "Facility"("type");

-- CreateIndex
CREATE INDEX "Facility_isActive_idx" ON "Facility"("isActive");

-- CreateIndex
CREATE INDEX "AmrRecord_areaId_reportDate_idx" ON "AmrRecord"("areaId", "reportDate");

-- CreateIndex
CREATE INDEX "AmrRecord_facilityId_idx" ON "AmrRecord"("facilityId");

-- CreateIndex
CREATE INDEX "AmrRecord_reportDate_idx" ON "AmrRecord"("reportDate");

-- CreateIndex
CREATE INDEX "AmrRecord_susceptibilityResult_idx" ON "AmrRecord"("susceptibilityResult");

-- CreateIndex
CREATE INDEX "AmrRecord_pathogen_idx" ON "AmrRecord"("pathogen");

-- CreateIndex
CREATE UNIQUE INDEX "AmrRecord_externalRecordId_facilityId_key" ON "AmrRecord"("externalRecordId", "facilityId");

-- CreateIndex
CREATE INDEX "SyncLog_syncStartedAt_idx" ON "SyncLog"("syncStartedAt");

-- CreateIndex
CREATE INDEX "SyncLog_status_idx" ON "SyncLog"("status");

-- CreateIndex
CREATE INDEX "SurveillanceAlert_areaId_idx" ON "SurveillanceAlert"("areaId");

-- CreateIndex
CREATE INDEX "SurveillanceAlert_severity_idx" ON "SurveillanceAlert"("severity");

-- CreateIndex
CREATE INDEX "SurveillanceAlert_status_idx" ON "SurveillanceAlert"("status");

-- CreateIndex
CREATE INDEX "SurveillanceAlert_detectedAt_idx" ON "SurveillanceAlert"("detectedAt");

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrRecord" ADD CONSTRAINT "AmrRecord_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmrRecord" ADD CONSTRAINT "AmrRecord_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncLog" ADD CONSTRAINT "SyncLog_sourceFacilityId_fkey" FOREIGN KEY ("sourceFacilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveillanceAlert" ADD CONSTRAINT "SurveillanceAlert_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
