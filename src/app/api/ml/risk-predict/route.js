/**
 * POST /api/ml/risk-predict
 * 
 * Predict MDR risk for a new isolate before susceptibility results
 * 
 * Request body:
 * {
 *   "species": "K. pneumoniae",
 *   "sample_type": "Blood",
 *   "ward": "Medicine ICU",
 *   "patient_type": "Inpatient",
 *   "age": 67,
 *   "age_group": "65 to 84 Years",
 *   "gender": "Male",
 *   "year": 2026,
 *   "local_history": { ... }  // optional
 * }
 */

import { NextResponse } from 'next/server';
import { predictRisk } from '@/lib/mlApi';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.species) {
      return NextResponse.json(
        { error: 'Missing required field: species' },
        { status: 400 }
      );
    }

    const result = await predictRisk(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Risk prediction error:', error);
    return NextResponse.json(
      { 
        error: 'Risk prediction failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
