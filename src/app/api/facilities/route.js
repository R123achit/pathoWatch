/**
 * Facilities List API
 * Returns list of all connected healthcare facilities
 * 
 * GET /api/facilities
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      include: {
        area: {
          select: {
            name: true,
            district: true,
            state: true
          }
        },
        _count: {
          select: {
            amrRecords: true
          }
        }
      },
      orderBy: [
        { type: 'asc' },
        { name: 'asc' }
      ]
    });
    
    // Get the last overall sync time (not per facility)
    const lastSync = await prisma.syncLog.findFirst({
      where: { status: 'completed' },
      orderBy: { syncStartedAt: 'desc' },
      select: { syncStartedAt: true }
    });
    
    const facilitiesWithSync = facilities.map(facility => ({
      id: facility.id,
      name: facility.name,
      type: facility.type,
      apiIdentifier: facility.apiIdentifier,
      area: facility.area.name,
      district: facility.area.district,
      state: facility.area.state,
      isActive: facility.isActive,
      totalRecords: facility._count.amrRecords,
      lastSync: lastSync?.syncStartedAt || null
    }));
    
    const hospitals = facilitiesWithSync.filter(f => f.type === 'hospital');
    const laboratories = facilitiesWithSync.filter(f => f.type === 'laboratory');
    
    return NextResponse.json({
      success: true,
      totalFacilities: facilitiesWithSync.length,
      hospitals: {
        count: hospitals.length,
        facilities: hospitals
      },
      laboratories: {
        count: laboratories.length,
        facilities: laboratories
      }
    });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
