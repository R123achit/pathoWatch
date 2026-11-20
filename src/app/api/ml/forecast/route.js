/**
 * POST /api/ml/forecast
 * 
 * Generate time series forecast with prediction intervals
 * 
 * Request body:
 * {
 *   "values": [45, 48, 52, 49, 51],  // at least 3 values
 *   "horizon": 3,                      // 1-24 periods to forecast
 *   "upper_bound": 100                 // optional: cap for forecasts
 * }
 */

import { NextResponse } from 'next/server';
import { forecast } from '@/lib/mlApi';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.values || !Array.isArray(body.values) || body.values.length < 3) {
      return NextResponse.json(
        { error: 'Invalid field: values (must be array with at least 3 elements)' },
        { status: 400 }
      );
    }

    // Validate all values are numbers
    if (!body.values.every(v => typeof v === 'number' && !isNaN(v))) {
      return NextResponse.json(
        { error: 'Invalid field: all values must be numbers' },
        { status: 400 }
      );
    }

    const horizon = body.horizon || 3;
    if (horizon < 1 || horizon > 24) {
      return NextResponse.json(
        { error: 'Invalid horizon: must be between 1 and 24' },
        { status: 400 }
      );
    }

    const upperBound = body.upper_bound || null;

    const result = await forecast(body.values, horizon, upperBound);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Forecast error:', error);
    return NextResponse.json(
      { 
        error: 'Forecast generation failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
