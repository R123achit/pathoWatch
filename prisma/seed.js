/**
 * PathoWatch AMR Surveillance System - Database Seed Script
 * Academic Prototype for Final Year Project
 * 
 * This script generates SYNTHETIC/DEMO data for:
 * - Geographic areas in Ghaziabad district
 * - Fake hospitals and laboratories
 * - Realistic AMR surveillance records for the last 6 months
 * 
 * IMPORTANT: All data is fictional and created for academic demonstration purposes.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable'
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Create Prisma client with adapter
const prisma = new PrismaClient({ adapter });

// ========================================
// GHAZIABAD MONITORING AREAS
// ========================================
const AREAS = [
  {
    name: 'Central Ghaziabad',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    latitude: 28.6692,
    longitude: 77.4538,
    // Simplified demo GeoJSON polygon
    geojson: JSON.stringify({
      type: 'Polygon',
      coordinates: [[[77.44, 28.66], [77.46, 28.66], [77.46, 28.68], [77.44, 28.68], [77.44, 28.66]]]
    })
  },
  {
    name: 'Indirapuram',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    latitude: 28.6405,
    longitude: 77.3687,
    geojson: JSON.stringify({
      type: 'Polygon',
      coordinates: [[[77.36, 28.63], [77.38, 28.63], [77.38, 28.65], [77.36, 28.65], [77.36, 28.63]]]
    })
  },
  {
    name: 'Vaishali',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    latitude: 28.6490,
    longitude: 77.3387,
    geojson: JSON.stringify({
      type: 'Polygon',
      coordinates: [[[77.32, 28.64], [77.35, 28.64], [77.35, 28.66], [77.32, 28.66], [77.32, 28.64]]]
    })
  },
  {
    name: 'Loni',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    latitude: 28.7518,
    longitude: 77.2865,
    geojson: JSON.stringify({
      type: 'Polygon',
      coordinates: [[[77.27, 28.74], [77.30, 28.74], [77.30, 28.76], [77.27, 28.76], [77.27, 28.74]]]
    })
  },
  {
    name: 'Sahibabad',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    latitude: 28.6820,
    longitude: 77.3560,
    geojson: JSON.stringify({
      type: 'Polygon',
      coordinates: [[[77.34, 28.67], [77.37, 28.67], [77.37, 28.69], [77.34, 28.69], [77.34, 28.67]]]
    })
  },
  {
    name: 'Vasundhara',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    latitude: 28.6600,
    longitude: 77.3800,
    geojson: JSON.stringify({
      type: 'Polygon',
      coordinates: [[[77.37, 28.65], [77.39, 28.65], [77.39, 28.67], [77.37, 28.67], [77.37, 28.65]]]
    })
  },
  {
    name: 'Modinagar',
    district: 'Ghaziabad',
    state: 'Uttar Pradesh',
    latitude: 28.8328,
    longitude: 77.5836,
    geojson: JSON.stringify({
      type: 'Polygon',
      coordinates: [[[77.57, 28.82], [77.60, 28.82], [77.60, 28.84], [77.57, 28.84], [77.57, 28.82]]]
    })
  }
];

// ========================================
// FAKE HEALTHCARE FACILITIES
// ========================================
const FACILITIES = [
  // HOSPITALS
  { name: 'Ghaziabad District Hospital', type: 'hospital', areaName: 'Central Ghaziabad', apiIdentifier: 'hospital-ghz-001' },
  { name: 'Indirapuram Medical Centre', type: 'hospital', areaName: 'Indirapuram', apiIdentifier: 'hospital-ind-002' },
  { name: 'Vaishali Community Hospital', type: 'hospital', areaName: 'Vaishali', apiIdentifier: 'hospital-vai-003' },
  { name: 'Loni General Hospital', type: 'hospital', areaName: 'Loni', apiIdentifier: 'hospital-lon-004' },
  { name: 'Sahibabad Healthcare Centre', type: 'hospital', areaName: 'Sahibabad', apiIdentifier: 'hospital-sah-005' },
  { name: 'Vasundhara City Hospital', type: 'hospital', areaName: 'Vasundhara', apiIdentifier: 'hospital-vas-006' },
  { name: 'Modinagar District Hospital', type: 'hospital', areaName: 'Modinagar', apiIdentifier: 'hospital-mod-007' },
  
  // LABORATORIES
  { name: 'Ghaziabad Diagnostic Laboratory', type: 'laboratory', areaName: 'Central Ghaziabad', apiIdentifier: 'lab-ghz-001' },
  { name: 'Indirapuram Pathology Lab', type: 'laboratory', areaName: 'Indirapuram', apiIdentifier: 'lab-ind-002' },
  { name: 'Vaishali Diagnostic Centre', type: 'laboratory', areaName: 'Vaishali', apiIdentifier: 'lab-vai-003' },
  { name: 'Loni Clinical Laboratory', type: 'laboratory', areaName: 'Loni', apiIdentifier: 'lab-lon-004' },
  { name: 'Sahibabad Microbiology Lab', type: 'laboratory', areaName: 'Sahibabad', apiIdentifier: 'lab-sah-005' },
  { name: 'Vasundhara Pathology Centre', type: 'laboratory', areaName: 'Vasundhara', apiIdentifier: 'lab-vas-006' },
  { name: 'Modinagar Clinical Lab', type: 'laboratory', areaName: 'Modinagar', apiIdentifier: 'lab-mod-007' }
];

// ========================================
// AMR DATA CONFIGURATION
// ========================================
const PATHOGENS = [
  'Escherichia coli',
  'Klebsiella pneumoniae',
  'Staphylococcus aureus',
  'Pseudomonas aeruginosa',
  'Acinetobacter baumannii'
];

const SAMPLE_TYPES = ['Blood', 'Urine', 'Respiratory Sample', 'Wound Sample'];
const ANTIMICROBIALS = ['Amoxicillin', 'Ciprofloxacin', 'Ceftriaxone', 'Meropenem', 'Vancomycin'];
const SUSCEPTIBILITY_RESULTS = ['Resistant', 'Sensitive', 'Intermediate'];

// Area-specific AMR activity patterns (records per month for last 6 months)
// This creates deliberate trends for different areas
const AREA_PATTERNS = {
  'Central Ghaziabad': [45, 48, 52, 55, 58, 62],      // Moderate stable growth
  'Indirapuram': [35, 38, 42, 48, 56, 68],            // Increasing trend
  'Vaishali': [28, 30, 29, 31, 30, 32],               // Stable
  'Loni': [35, 42, 51, 63, 81, 105],                  // High increase (demonstration)
  'Sahibabad': [38, 40, 43, 46, 48, 51],              // Moderate activity
  'Vasundhara': [18, 20, 19, 21, 20, 22],             // Low stable
  'Modinagar': [25, 28, 32, 37, 43, 50]               // Moderate increasing
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get date for X months ago
function getDateMonthsAgo(monthsAgo, dayOffset = 0) {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(date.getDate() + dayOffset);
  return date;
}

// Generate weighted susceptibility results (more resistant cases for realism)
function getWeightedSusceptibilityResult() {
  const rand = Math.random();
  if (rand < 0.35) return 'Resistant';      // 35% resistant
  if (rand < 0.90) return 'Sensitive';      // 55% sensitive
  return 'Intermediate';                     // 10% intermediate
}

// ========================================
// MAIN SEED FUNCTION
// ========================================

async function main() {
  console.log('🌱 Starting PathoWatch database seeding...\n');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.amrRecord.deleteMany({});
  await prisma.syncLog.deleteMany({});
  await prisma.surveillanceAlert.deleteMany({});
  await prisma.facility.deleteMany({});
  await prisma.area.deleteMany({});
  console.log('✓ Existing data cleared\n');

  // Seed Areas
  console.log('📍 Creating Ghaziabad monitoring areas...');
  const areaMap = {};
  for (const areaData of AREAS) {
    const area = await prisma.area.create({ data: areaData });
    areaMap[area.name] = area;
    console.log(`  ✓ Created area: ${area.name}`);
  }
  console.log(`✓ Created ${AREAS.length} areas\n`);

  // Seed Facilities
  console.log('🏥 Creating fake healthcare facilities...');
  const facilityList = [];
  for (const facilityData of FACILITIES) {
    const { areaName, ...rest } = facilityData;
    const facility = await prisma.facility.create({
      data: {
        ...rest,
        areaId: areaMap[areaName].id
      }
    });
    facilityList.push(facility);
    console.log(`  ✓ Created ${facility.type}: ${facility.name}`);
  }
  console.log(`✓ Created ${FACILITIES.length} facilities\n`);

  // Generate AMR Records
  console.log('💉 Generating synthetic AMR surveillance records...');
  console.log('   (Creating 6 months of data with realistic patterns)\n');
  
  let totalRecords = 0;
  const recordsByArea = {};

  // For each area, generate records based on the pattern
  for (const [areaName, monthlyPattern] of Object.entries(AREA_PATTERNS)) {
    recordsByArea[areaName] = 0;
    const area = areaMap[areaName];
    
    // Get facilities in this area
    const areaFacilities = facilityList.filter(
      f => f.areaId === area.id
    );

    // Generate records for each of the last 6 months
    for (let monthIndex = 0; monthIndex < 6; monthIndex++) {
      const recordsThisMonth = monthlyPattern[monthIndex];
      const monthsAgo = 5 - monthIndex; // Start from 6 months ago to current

      for (let i = 0; i < recordsThisMonth; i++) {
        const facility = getRandomElement(areaFacilities);
        const dayOffset = getRandomInt(0, 28); // Spread across the month
        const reportDate = getDateMonthsAgo(monthsAgo, dayOffset);

        const record = await prisma.amrRecord.create({
          data: {
            externalRecordId: `${facility.apiIdentifier}-${Date.now()}-${i}-${monthIndex}`,
            facilityId: facility.id,
            areaId: area.id,
            reportDate: reportDate,
            pathogen: getRandomElement(PATHOGENS),
            sampleType: getRandomElement(SAMPLE_TYPES),
            antimicrobial: getRandomElement(ANTIMICROBIALS),
            susceptibilityResult: getWeightedSusceptibilityResult(),
            sourceType: facility.type
          }
        });

        totalRecords++;
        recordsByArea[areaName]++;
      }
    }
  }

  console.log('✓ AMR Record Generation Summary:');
  for (const [areaName, count] of Object.entries(recordsByArea)) {
    console.log(`  ${areaName}: ${count} records`);
  }
  console.log(`\n✓ Total records created: ${totalRecords}\n`);

  // Summary
  console.log('✅ Database seeding completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Areas: ${AREAS.length}`);
  console.log(`   - Hospitals: ${FACILITIES.filter(f => f.type === 'hospital').length}`);
  console.log(`   - Laboratories: ${FACILITIES.filter(f => f.type === 'laboratory').length}`);
  console.log(`   - AMR Records: ${totalRecords}`);
  console.log('\n🎯 The database is now ready for the PathoWatch prototype!');
  console.log('   Different areas have different AMR activity patterns:');
  console.log('   - Loni: High increasing trend (demonstration of alert conditions)');
  console.log('   - Indirapuram: Moderate increasing trend');
  console.log('   - Vaishali: Stable activity');
  console.log('   - Vasundhara: Low stable activity\n');
}

// ========================================
// EXECUTION
// ========================================

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
