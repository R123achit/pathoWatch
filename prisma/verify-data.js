import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable'
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verify() {
  console.log('🔍 Verifying PathoWatch Database...\n');

  const areaCount = await prisma.area.count();
  const facilityCount = await prisma.facility.count();
  const recordCount = await prisma.amrRecord.count();

  console.log(`✓ Areas: ${areaCount}`);
  console.log(`✓ Facilities: ${facilityCount}`);
  console.log(`✓ AMR Records: ${recordCount}\n`);

  console.log('📍 Areas:');
  const areas = await prisma.area.findMany({ orderBy: { name: 'asc' } });
  areas.forEach(area => {
    console.log(`   - ${area.name}`);
  });

  console.log('\n🏥 Sample Facilities:');
  const facilities = await prisma.facility.findMany({ take: 5, include: { area: true } });
  facilities.forEach(f => {
    console.log(`   - ${f.name} (${f.type}) in ${f.area.name}`);
  });

  console.log('\n💉 Recent AMR Records:');
  const recentRecords = await prisma.amrRecord.findMany({
    take: 5,
    orderBy: { reportDate: 'desc' },
    include: { area: true, facility: true }
  });
  recentRecords.forEach(r => {
    console.log(`   - ${r.reportDate.toISOString().split('T')[0]}: ${r.pathogen} (${r.susceptibilityResult}) at ${r.facility.name}`);
  });

  console.log('\n✅ Database verification complete!');
  await prisma.$disconnect();
}

verify().catch(console.error);
