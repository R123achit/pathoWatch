/**
 * POST /api/ml/mdr-classify
 * 
 * Classify isolates as MDR based on susceptibility results
 * 
 * Request body:
 * {
 *   "isolates": [
 *     {
 *       "id": "ISO001",
 *       "pathogen": "K. pneumoniae",
 *       "results": {
 *         "Meropenem": "R",
 *         "Ciprofloxacin": "R",
 *         "Ceftriaxone": "R"
 *       }
 *     }
 *   ]
 * }
 */

import { NextResponse } from 'next/server';
import { classifyMDR } from '@/lib/mlApi';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.isolates || !Array.isArray(body.isolates) || body.isolates.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid field: isolates (must be non-empty array)' },
        { status: 400 }
      );
    }

    const result = await classifyMDR(body.isolates);
    return NextResponse.json(result);
  } catch (error) {
    console.error('MDR classification error:', error);
    return NextResponse.json(
      { 
        error: 'MDR classification failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
