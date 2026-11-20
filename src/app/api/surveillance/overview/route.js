/**
 * Surveillance Overview API
 * Returns overall statistics calculated from PostgreSQL data
 * 
 * GET /api/surveillance/overview
 */

import { NextResponse } from 'next/server';
import { getSurveillanceOverview, getTopPathogens } from '@/lib/analytics';

export async function GET() {
  try {
    const overview = await getSurveillanceOverview();
    const topPathogens = await getTopPathogens(5);
    
    return NextResponse.json({
      success: true,
      overview: {
        totalRecords: overview.totalRecords,
        totalAreas: overview.totalAreas,
        connectedFacilities: overview.totalFacilities,
        recentGrowth: `${overview.overallGrowth >= 0 ? '+' : ''}${overview.overallGrowth}%`,
        lastSyncAt: overview.lastSyncAt,
        currentPeriodResistant: overview.currentPeriodResistant,
        previousPeriodResistant: overview.previousPeriodResistant
      },
      topPathogens
    });
  } catch (error) {
    console.error('Error fetching surveillance overview:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
