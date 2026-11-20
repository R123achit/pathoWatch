/**
 * POST /api/ml/surveillance-analyze
 * 
 * Analyze surveillance data for anomalies, hotspots, and forecasts
 * 
 * Request body:
 * {
 *   "areas": [
 *     {
 *       "area_id": "area-1",
 *       "area_name": "Ghaziabad",
 *       "series": [
 *         {
 *           "period": "2026-01",
 *           "isolates": 150,
 *           "mdr_cases": 45
 *         }
 *       ]
 *     }
 *   ],
 *   "horizon": 3
 * }
 */

import { NextResponse } from 'next/server';
import { analyzeSurveillance } from '@/lib/mlApi';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.areas || !Array.isArray(body.areas) || body.areas.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid field: areas (must be non-empty array)' },
        { status: 400 }
      );
    }

    const horizon = body.horizon || 3;
    if (horizon < 1 || horizon > 12) {
      return NextResponse.json(
        { error: 'Invalid horizon: must be between 1 and 12' },
        { status: 400 }
      );
    }

    const result = await analyzeSurveillance(body.areas, horizon);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Surveillance analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Surveillance analysis failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
