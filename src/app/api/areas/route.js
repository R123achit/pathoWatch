/**
 * Areas List API
 * Returns list of all monitoring areas
 * 
 * GET /api/areas
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const areas = await prisma.area.findMany({
      select: {
        id: true,
        name: true,
        district: true,
        state: true,
        latitude: true,
        longitude: true,
        _count: {
          select: {
            facilities: true,
            amrRecords: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json({
      success: true,
      count: areas.length,
      areas: areas.map(area => ({
        id: area.id,
        name: area.name,
        district: area.district,
        state: area.state,
        latitude: area.latitude,
        longitude: area.longitude,
        facilitiesCount: area._count.facilities,
        recordsCount: area._count.amrRecords
      }))
    });
  } catch (error) {
    console.error('Error fetching areas:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
