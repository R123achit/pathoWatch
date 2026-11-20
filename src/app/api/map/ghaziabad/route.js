/**
 * Ghaziabad Map Data API
 * Returns all areas with calculated monitoring levels for the map
 * 
 * GET /api/map/ghaziabad
 */

import { NextResponse } from 'next/server';
import { getGhaziabadMapData } from '@/lib/analytics';

export async function GET() {
  try {
    const mapData = await getGhaziabadMapData();
    
    return NextResponse.json({
      success: true,
      district: 'Ghaziabad',
      state: 'Uttar Pradesh',
      areasCount: mapData.length,
      areas: mapData,
      legend: {
        levels: [
          { level: 'Stable', color: 'green', description: 'Growth ≤ 5%' },
          { level: 'Moderate Activity', color: 'yellow', description: '5% < Growth ≤ 20%' },
          { level: 'Increasing Activity', color: 'orange', description: '20% < Growth ≤ 40%' },
          { level: 'Requires Closer Monitoring', color: 'red', description: 'Growth > 40%' }
        ]
      }
    });
  } catch (error) {
    console.error('Error fetching map data:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
