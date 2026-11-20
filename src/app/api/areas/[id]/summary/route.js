/**
 * Area Summary API
 * Returns detailed summary for a specific area
 * 
 * GET /api/areas/[id]/summary
 */

import { NextResponse } from 'next/server';
import { getAreaSummary } from '@/lib/analytics';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const summary = await getAreaSummary(id);
    
    return NextResponse.json({
      success: true,
      ...summary
    });
  } catch (error) {
    console.error('Error fetching area summary:', error);
    
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
