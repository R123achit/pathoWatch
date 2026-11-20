/**
 * Area Trend API
 * Returns historical trend data for a specific area
 * 
 * GET /api/areas/[id]/trend?months=6
 */

import { NextResponse } from 'next/server';
import { getAreaTrend } from '@/lib/analytics';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const months = parseInt(searchParams.get('months') || '6', 10);
    
    const trend = await getAreaTrend(id, months);
    
    return NextResponse.json({
      success: true,
      ...trend
    });
  } catch (error) {
    console.error('Error fetching area trend:', error);
    
    if (error.message === 'Area not found') {
      return NextResponse.json({
        success: false,
        error: 'Area not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
