/**
 * List all fake healthcare sources
 * Returns information about all demo hospitals and laboratories
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      where: { isActive: true },
      include: {
        area: true,
        _count: {
          select: { amrRecords: true }
        }
      },
      orderBy: [
        { type: 'asc' },
        { name: 'asc' }
      ]
    });

    const hospitals = facilities
      .filter(f => f.type === 'hospital')
      .map(f => ({
        id: f.apiIdentifier,
        name: f.name,
        area: f.area.name,
        apiEndpoint: `/api/fake-sources/hospitals/${f.apiIdentifier}/amr-records`,
        totalRecords: f._count.amrRecords
      }));

    const laboratories = facilities
      .filter(f => f.type === 'laboratory')
      .map(f => ({
        id: f.apiIdentifier,
        name: f.name,
        area: f.area.name,
        apiEndpoint: `/api/fake-sources/laboratories/${f.apiIdentifier}/amr-records`,
        totalRecords: f._count.amrRecords
      }));

    return NextResponse.json({
      message: 'DEMO/FAKE healthcare source APIs for PathoWatch academic prototype',
      totalSources: facilities.length,
      hospitals: {
        count: hospitals.length,
        sources: hospitals
      },
      laboratories: {
        count: laboratories.length,
        sources: laboratories
      }
    });
  } catch (error) {
    console.error('Error listing fake sources:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
