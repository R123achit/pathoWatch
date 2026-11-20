/**
 * GET /api/ml/model-info
 * 
 * Retrieve model information from the ML API
 * No authentication required - public endpoint
 */

import { NextResponse } from 'next/server';
import { getModelInfo } from '@/lib/mlApi';

export async function GET(request) {
  try {
    const modelInfo = await getModelInfo();
    return NextResponse.json(modelInfo);
  } catch (error) {
    console.error('Model info error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve model information',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
