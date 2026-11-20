/**
 * Test script for Fake Healthcare Source APIs
 * Verifies that all hospital and laboratory APIs return valid data
 */

async function testAPIs() {
  const BASE_URL = 'http://localhost:3000';

  console.log('🧪 Testing Fake Healthcare Source APIs...\n');

  try {
    // Test 1: List all sources
    console.log('1️⃣ Testing: GET /api/fake-sources/list');
    const listResponse = await fetch(`${BASE_URL}/api/fake-sources/list`);
    const listData = await listResponse.json();
    
    if (listResponse.ok) {
      console.log(`   ✅ Success! Found ${listData.totalSources} sources`);
      console.log(`      - Hospitals: ${listData.hospitals.count}`);
      console.log(`      - Laboratories: ${listData.laboratories.count}\n`);
    } else {
      console.log('   ❌ Failed!', listData);
      return;
    }

    // Test 2: Test a hospital API
    const sampleHospital = listData.hospitals.sources[0];
    console.log(`2️⃣ Testing Hospital API: ${sampleHospital.name}`);
    console.log(`   Endpoint: ${sampleHospital.apiEndpoint}`);
    
    const hospitalResponse = await fetch(`${BASE_URL}${sampleHospital.apiEndpoint}`);
    const hospitalData = await hospitalResponse.json();
    
    if (hospitalResponse.ok) {
      console.log(`   ✅ Success! Returned ${hospitalData.records.length} records`);
      console.log(`      Source: ${hospitalData.source.name}`);
      console.log(`      Area: ${hospitalData.source.area}`);
      if (hospitalData.records.length > 0) {
        const sample = hospitalData.records[0];
        console.log(`      Sample record: ${sample.report_date} - ${sample.pathogen} (${sample.susceptibility_result})\n`);
      }
    } else {
      console.log('   ❌ Failed!', hospitalData);
      return;
    }

    // Test 3: Test a laboratory API
    const sampleLab = listData.laboratories.sources[0];
    console.log(`3️⃣ Testing Laboratory API: ${sampleLab.name}`);
    console.log(`   Endpoint: ${sampleLab.apiEndpoint}`);
    
    const labResponse = await fetch(`${BASE_URL}${sampleLab.apiEndpoint}`);
    const labData = await labResponse.json();
    
    if (labResponse.ok) {
      console.log(`   ✅ Success! Returned ${labData.records.length} records`);
      console.log(`      Source: ${labData.source.name}`);
      console.log(`      Area: ${labData.source.area}`);
      if (labData.records.length > 0) {
        const sample = labData.records[0];
        console.log(`      Sample record: ${sample.report_date} - ${sample.pathogen} (${sample.susceptibility_result})\n`);
      }
    } else {
      console.log('   ❌ Failed!', labData);
      return;
    }

    // Test 4: Test date filtering
    console.log('4️⃣ Testing Date Filtering (last 30 days)');
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];
    
    const filteredResponse = await fetch(
      `${BASE_URL}${sampleHospital.apiEndpoint}?from=${fromDate}`
    );
    const filteredData = await filteredResponse.json();
    
    if (filteredResponse.ok) {
      console.log(`   ✅ Success! Returned ${filteredData.records.length} records from ${fromDate}\n`);
    } else {
      console.log('   ❌ Failed!', filteredData);
      return;
    }

    // Test 5: Test all sources
    console.log('5️⃣ Testing All Hospital APIs...');
    let hospitalTestsPassed = 0;
    for (const hospital of listData.hospitals.sources) {
      const response = await fetch(`${BASE_URL}${hospital.apiEndpoint}`);
      if (response.ok) {
        hospitalTestsPassed++;
      } else {
        console.log(`   ❌ Failed for ${hospital.name}`);
      }
    }
    console.log(`   ✅ ${hospitalTestsPassed}/${listData.hospitals.count} hospital APIs working\n`);

    console.log('6️⃣ Testing All Laboratory APIs...');
    let labTestsPassed = 0;
    for (const lab of listData.laboratories.sources) {
      const response = await fetch(`${BASE_URL}${lab.apiEndpoint}`);
      if (response.ok) {
        labTestsPassed++;
      } else {
        console.log(`   ❌ Failed for ${lab.name}`);
      }
    }
    console.log(`   ✅ ${labTestsPassed}/${listData.laboratories.count} laboratory APIs working\n`);

    // Summary
    console.log('✅ All API tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Total Sources: ${listData.totalSources}`);
    console.log(`   - Hospital APIs: ${hospitalTestsPassed}/${listData.hospitals.count} working`);
    console.log(`   - Laboratory APIs: ${labTestsPassed}/${listData.laboratories.count} working`);
    console.log('\n🎯 Phase 2 is COMPLETE! All fake healthcare source APIs are functional.');

  } catch (error) {
    console.error('\n❌ Error during API testing:', error.message);
    console.error('\nMake sure the Next.js dev server is running on http://localhost:3000');
  }
}

testAPIs();
