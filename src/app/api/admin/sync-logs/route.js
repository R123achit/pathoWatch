/**
 * GET /api/admin/sync-logs
 * 
 * Returns history of data synchronization operations
 */

import { NextResponse } from 'next/server';
import { getRecentSyncLogs } from '@/lib/syncService';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    const logs = await getRecentSyncLogs(Math.min(limit, 50)); // Max 50
    
    return NextResponse.json({
      success: true,
      count: logs.length,
      logs: logs.map(log => ({
        id: log.id,
        startedAt: log.syncStartedAt,
        completedAt: log.syncCompletedAt,
        status: log.status,
        durationMs: log.syncCompletedAt 
          ? log.syncCompletedAt - log.syncStartedAt
          : null,
        recordsReceived: log.recordsReceived,
        recordsAdded: log.recordsAdded,
        recordsSkipped: log.recordsSkipped,
        error: log.errorMessage
      }))
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

