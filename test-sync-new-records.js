/**
 * Test adding new records through sync
 * This script adds a few new AMR records to demonstrate the sync adding data
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable'
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function addNewRecords() {
  console.log('📝 Adding new AMR records for sync demonstration...\n');
  
  try {
    // Get a facility
    const facility = await prisma.facility.findFirst({
      where: { apiIdentifier: 'hospital-ghz-001' },
      include: { area: true }
    });
    
    if (!facility) {
      console.log('❌ Facility not found');
      return;
    }
    
    const today = new Date();
    const newRecords = [];
    
    // Add 5 new records
    for (let i = 0; i < 5; i++) {
      const record = await prisma.amrRecord.create({
        data: {
          externalRecordId: `NEW-DEMO-${Date.now()}-${i}`,
          facilityId: facility.id,
          areaId: facility.areaId,
          reportDate: today,
          pathogen: 'Escherichia coli',
          sampleType: 'Blood',
          antimicrobial: 'Ciprofloxacin',
          susceptibilityResult: 'Resistant',
          sourceType: facility.type
        }
      });
      newRecords.push(record);
    }
    
    console.log(`✅ Added ${newRecords.length} new AMR records to ${facility.name}`);
    console.log('   These will be fetched during the next sync and skipped as duplicates.\n');
    
    console.log('🔄 Now run: node test-sync-service.js');
    console.log('   The sync will show these as already in the database (skipped).\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

addNewRecords();
