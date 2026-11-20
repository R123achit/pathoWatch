/**
 * Fake Hospital API - AMR Records Endpoint
 * Simulates a hospital's internal system providing AMR surveillance data
 * 
 * IMPORTANT: This is a DEMO/FAKE API for academic prototype purposes.
 * In a real system, PathoWatch would integrate with actual hospital APIs.
 */

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    
    // Optional date filters
    const fromDate = searchParams.get('from');
    const toDate = searchParams.get('to');

    // Find the facility
    const facility = await prisma.facility.findUnique({
      where: {
        apiIdentifier: id,
        type: 'hospital'
      },
      include: {
        area: true
      }
    });

    if (!facility) {
      return NextResponse.json(
        { error: 'Hospital not found or invalid API identifier' },
        { status: 404 }
      );
    }

    // Build date filter
    const dateFilter = {};
    if (fromDate) {
      dateFilter.gte = new Date(fromDate);
    }
    if (toDate) {
      dateFilter.lte = new Date(toDate);
    }

    // Fetch AMR records from this hospital
    const records = await prisma.amrRecord.findMany({
      where: {
        facilityId: facility.id,
        ...(Object.keys(dateFilter).length > 0 && {
          reportDate: dateFilter
        })
      },
      orderBy: {
        reportDate: 'desc'
      }
    });

    // Format response to match what a real hospital API might return
    const response = {
      source: {
        id: facility.apiIdentifier,
        name: facility.name,
        type: facility.type,
        area: facility.area.name,
        district: facility.area.district,
        state: facility.area.state
      },
      metadata: {
        totalRecords: records.length,
        dateRange: {
          from: fromDate || 'all',
          to: toDate || 'all'
        },
        generatedAt: new Date().toISOString()
      },
      records: records.map(record => ({
        external_record_id: record.externalRecordId,
        report_date: record.reportDate.toISOString().split('T')[0],
        area: facility.area.name,
        pathogen: record.pathogen,
        sample_type: record.sampleType,
        antimicrobial: record.antimicrobial,
        susceptibility_result: record.susceptibilityResult
      }))
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in fake hospital API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
