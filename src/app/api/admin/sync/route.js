/**
 * Admin Sync API Endpoint
 * Triggers data synchronization from all fake healthcare sources
 * 
 * POST /api/admin/sync
 * Fetches data from all hospitals and laboratories, validates, normalizes,
 * and stores in PostgreSQL
 */

import { NextResponse } from 'next/server';
import { syncAllFacilities } from '@/lib/syncService';

export async function POST(request) {
  try {
    console.log('🔄 Starting data synchronization...');
    
    // Get the base URL from the request or use default
    const baseUrl = request.headers.get('origin') || 'http://localhost:3000';
    
    // Run the sync
    const results = await syncAllFacilities(baseUrl);
    
    console.log('✅ Sync completed:', {
      status: results.status,
      facilitiesProcessed: results.facilitiesProcessed,
      recordsAdded: results.totalRecordsAdded,
      recordsSkipped: results.totalRecordsSkipped
    });
    
    // Return success response
    return NextResponse.json({
      success: results.status === 'completed',
      message: results.status === 'completed'
        ? 'Data synchronization completed successfully'
        : 'Data synchronization completed with errors',
      syncLogId: results.syncLogId,
      summary: {
        startedAt: results.startedAt,
        completedAt: results.completedAt,
        durationMs: results.completedAt 
          ? results.completedAt - results.startedAt
          : null,
        facilitiesProcessed: results.facilitiesProcessed,
        recordsReceived: results.totalRecordsReceived,
        recordsAdded: results.totalRecordsAdded,
        recordsSkipped: results.totalRecordsSkipped
      },
      facilities: results.facilityResults.map(f => ({
        name: f.facilityName,
        success: f.success,
        recordsReceived: f.recordsReceived,
        recordsAdded: f.recordsAdded,
        recordsSkipped: f.recordsSkipped,
        error: f.error
      })),
      errors: results.errors
    });
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Data synchronization failed',
      error: error.message
    }, { status: 500 });
  }
}

// GET endpoint to check sync status
export async function GET() {
  try {
    const { getSyncStatistics } = await import('@/lib/syncService');
    const stats = await getSyncStatistics();
    
    return NextResponse.json({
      message: 'Sync statistics',
      statistics: stats
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
