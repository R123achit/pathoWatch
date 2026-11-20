/**
 * PathoWatch Data Synchronization Service
 * Fetches, validates, normalizes, and stores AMR data from fake healthcare sources
 */

import prisma from './prisma';
import { 
  validateRecord, 
  normalizeRecord 
} from './normalization';

/**
 * Fetch records from a single facility API
 */
async function fetchFacilityRecords(facility, baseUrl) {
  const apiPath = facility.type === 'hospital' 
    ? `/api/fake-sources/hospitals/${facility.apiIdentifier}/amr-records`
    : `/api/fake-sources/laboratories/${facility.apiIdentifier}/amr-records`;
  
  const url = `${baseUrl}${apiPath}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      success: true,
      records: data.records || [],
      source: data.source
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      records: []
    };
  }
}

/**
 * Check if a record already exists in the database
 */
async function recordExists(externalRecordId, facilityId) {
  const existing = await prisma.amrRecord.findUnique({
    where: {
      externalRecordId_facilityId: {
        externalRecordId,
        facilityId
      }
    }
  });
  
  return existing !== null;
}

/**
 * Sync data from a single facility
 */
async function syncFacility(facility, baseUrl) {
  const result = {
    facilityId: facility.id,
    facilityName: facility.name,
    recordsReceived: 0,
    recordsAdded: 0,
    recordsSkipped: 0,
    validationErrors: [],
    success: false,
    error: null
  };
  
  try {
    // Fetch records from the facility API
    const fetchResult = await fetchFacilityRecords(facility, baseUrl);
    
    if (!fetchResult.success) {
      result.error = fetchResult.error;
      return result;
    }
    
    result.recordsReceived = fetchResult.records.length;
    
    // Process each record
    for (const record of fetchResult.records) {
      // Validate the record
      const validation = validateRecord(record);
      
      if (!validation.isValid) {
        result.validationErrors.push({
          recordId: record.external_record_id,
          errors: validation.errors
        });
        result.recordsSkipped++;
        continue;
      }
      
      // Check for duplicates
      const isDuplicate = await recordExists(
        record.external_record_id,
        facility.id
      );
      
      if (isDuplicate) {
        result.recordsSkipped++;
        continue;
      }
      
      // Normalize the record
      const normalized = normalizeRecord(record);
      
      // Find the area ID
      const area = await prisma.area.findUnique({
        where: { name: normalized.area }
      });
      
      if (!area) {
        result.validationErrors.push({
          recordId: record.external_record_id,
          errors: [`Unknown area: ${normalized.area}`]
        });
        result.recordsSkipped++;
        continue;
      }
      
      // Insert the record into the database
      try {
        await prisma.amrRecord.create({
          data: {
            externalRecordId: normalized.externalRecordId,
            facilityId: facility.id,
            areaId: area.id,
            reportDate: normalized.reportDate,
            pathogen: normalized.pathogen,
            sampleType: normalized.sampleType,
            antimicrobial: normalized.antimicrobial,
            susceptibilityResult: normalized.susceptibilityResult,
            sourceType: facility.type
          }
        });
        
        result.recordsAdded++;
      } catch (dbError) {
        // Handle unique constraint violations silently (race condition duplicates)
        if (dbError.code === 'P2002') {
          result.recordsSkipped++;
        } else {
          throw dbError;
        }
      }
    }
    
    result.success = true;
  } catch (error) {
    result.error = error.message;
    result.success = false;
  }
  
  return result;
}

/**
 * Sync data from all active facilities
 */
export async function syncAllFacilities(baseUrl = 'http://localhost:3000') {
  const syncStartTime = new Date();
  
  // Create a sync log entry
  const syncLog = await prisma.syncLog.create({
    data: {
      syncStartedAt: syncStartTime,
      status: 'running',
      recordsReceived: 0,
      recordsAdded: 0,
      recordsSkipped: 0
    }
  });
  
  const results = {
    syncLogId: syncLog.id,
    startedAt: syncStartTime,
    completedAt: null,
    status: 'running',
    facilitiesProcessed: 0,
    totalRecordsReceived: 0,
    totalRecordsAdded: 0,
    totalRecordsSkipped: 0,
    facilityResults: [],
    errors: []
  };
  
  try {
    // Get all active facilities
    const facilities = await prisma.facility.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    
    // Sync each facility
    for (const facility of facilities) {
      const facilityResult = await syncFacility(facility, baseUrl);
      
      results.facilityResults.push(facilityResult);
      results.facilitiesProcessed++;
      results.totalRecordsReceived += facilityResult.recordsReceived;
      results.totalRecordsAdded += facilityResult.recordsAdded;
      results.totalRecordsSkipped += facilityResult.recordsSkipped;
      
      if (!facilityResult.success) {
        results.errors.push({
          facility: facilityResult.facilityName,
          error: facilityResult.error
        });
      }
    }
    
    results.status = 'completed';
    results.completedAt = new Date();
    
    // Update sync log
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        syncCompletedAt: results.completedAt,
        status: 'completed',
        recordsReceived: results.totalRecordsReceived,
        recordsAdded: results.totalRecordsAdded,
        recordsSkipped: results.totalRecordsSkipped,
        errorMessage: results.errors.length > 0 
          ? JSON.stringify(results.errors)
          : null
      }
    });
    
  } catch (error) {
    results.status = 'failed';
    results.completedAt = new Date();
    results.errors.push({
      facility: 'sync-service',
      error: error.message
    });
    
    // Update sync log
    await prisma.syncLog.update({
      where: { id: syncLog.id },
      data: {
        syncCompletedAt: results.completedAt,
        status: 'failed',
        errorMessage: error.message
      }
    });
  }
  
  return results;
}

/**
 * Get recent sync logs
 */
export async function getRecentSyncLogs(limit = 10) {
  return await prisma.syncLog.findMany({
    take: limit,
    orderBy: { syncStartedAt: 'desc' },
    include: {
      sourceFacility: {
        include: {
          area: true
        }
      }
    }
  });
}

/**
 * Get sync statistics
 */
export async function getSyncStatistics() {
  const totalSyncs = await prisma.syncLog.count();
  const completedSyncs = await prisma.syncLog.count({
    where: { status: 'completed' }
  });
  const failedSyncs = await prisma.syncLog.count({
    where: { status: 'failed' }
  });
  
  const lastSync = await prisma.syncLog.findFirst({
    orderBy: { syncStartedAt: 'desc' }
  });
  
  const totalRecordsSynced = await prisma.syncLog.aggregate({
    _sum: {
      recordsAdded: true
    }
  });
  
  return {
    totalSyncs,
    completedSyncs,
    failedSyncs,
    lastSyncAt: lastSync?.syncStartedAt || null,
    totalRecordsSynced: totalRecordsSynced._sum.recordsAdded || 0
  };
}
