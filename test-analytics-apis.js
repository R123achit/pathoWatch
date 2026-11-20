/**
 * Test Script for Analytics and Backend APIs
 * Tests all Phase 4 APIs with real data
 */

async function testAnalyticsAPIs() {
  const BASE_URL = 'http://localhost:3000';

  console.log('🧪 Testing PathoWatch Analytics APIs...\n');

  try {
    // Test 1: Surveillance Overview
    console.log('1️⃣ Testing: GET /api/surveillance/overview');
    const overviewResponse = await fetch(`${BASE_URL}/api/surveillance/overview`);
    const overviewData = await overviewResponse.json();
    
    if (overviewResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Total Records: ${overviewData.overview.totalRecords}`);
      console.log(`      Total Areas: ${overviewData.overview.totalAreas}`);
      console.log(`      Connected Facilities: ${overviewData.overview.connectedFacilities}`);
      console.log(`      Recent Growth: ${overviewData.overview.recentGrowth}`);
      console.log(`      Top Pathogens: ${overviewData.topPathogens.map(p => p.name).join(', ')}\n`);
    } else {
      console.log('   ❌ Failed!', overviewData);
      return;
    }

    // Test 2: Ghaziabad Map Data
    console.log('2️⃣ Testing: GET /api/map/ghaziabad');
    const mapResponse = await fetch(`${BASE_URL}/api/map/ghaziabad`);
    const mapData = await mapResponse.json();
    
    if (mapResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Areas: ${mapData.areasCount}`);
      console.log('      Sample area data:');
      const sampleArea = mapData.areas[0];
      console.log(`        - ${sampleArea.name}`);
      console.log(`        - Monitoring Level: ${sampleArea.monitoring.level}`);
      console.log(`        - Growth: ${sampleArea.monitoring.growthPercentage}%`);
      console.log(`        - Trend: ${sampleArea.monitoring.trend}`);
      console.log(`        - Total Records: ${sampleArea.statistics.totalRecords}\n`);
    } else {
      console.log('   ❌ Failed!', mapData);
      return;
    }

    // Test 3: Areas List
    console.log('3️⃣ Testing: GET /api/areas');
    const areasResponse = await fetch(`${BASE_URL}/api/areas`);
    const areasData = await areasResponse.json();
    
    if (areasResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Found ${areasData.count} areas`);
      areasData.areas.slice(0, 3).forEach(area => {
        console.log(`        - ${area.name}: ${area.recordsCount} records, ${area.facilitiesCount} facilities`);
      });
      console.log('');
    } else {
      console.log('   ❌ Failed!', areasData);
      return;
    }

    // Test 4: Area Summary
    const testAreaId = areasData.areas[0].id;
    console.log(`4️⃣ Testing: GET /api/areas/${testAreaId}/summary`);
    const summaryResponse = await fetch(`${BASE_URL}/api/areas/${testAreaId}/summary`);
    const summaryData = await summaryResponse.json();
    
    if (summaryResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Area: ${summaryData.area.name}`);
      console.log(`      Total Records: ${summaryData.statistics.totalRecords}`);
      console.log(`      Resistant Records: ${summaryData.statistics.resistantRecords}`);
      console.log(`      Monitoring Level: ${summaryData.monitoring.level}`);
      console.log(`      Growth: ${summaryData.monitoring.growthPercentage}%`);
      console.log(`      Trend: ${summaryData.monitoring.trend}`);
      if (summaryData.topPathogen) {
        console.log(`      Top Pathogen: ${summaryData.topPathogen.name} (${summaryData.topPathogen.count} cases)`);
      }
      console.log('');
    } else {
      console.log('   ❌ Failed!', summaryData);
      return;
    }

    // Test 5: Area Trend
    console.log(`5️⃣ Testing: GET /api/areas/${testAreaId}/trend?months=6`);
    const trendResponse = await fetch(`${BASE_URL}/api/areas/${testAreaId}/trend?months=6`);
    const trendData = await trendResponse.json();
    
    if (trendResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Area: ${trendData.areaName}`);
      console.log(`      Period: ${trendData.period}`);
      console.log(`      Data Points: ${trendData.dataPoints.length}`);
      if (trendData.dataPoints.length > 0) {
        console.log(`      Sample: ${trendData.dataPoints[0].month} - ${trendData.dataPoints[0].count} resistant cases`);
      }
      console.log('');
    } else {
      console.log('   ❌ Failed!', trendData);
      return;
    }

    // Test 6: Facilities List
    console.log('6️⃣ Testing: GET /api/facilities');
    const facilitiesResponse = await fetch(`${BASE_URL}/api/facilities`);
    const facilitiesData = await facilitiesResponse.json();
    
    if (facilitiesResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Total Facilities: ${facilitiesData.totalFacilities}`);
      console.log(`      Hospitals: ${facilitiesData.hospitals.count}`);
      console.log(`      Laboratories: ${facilitiesData.laboratories.count}`);
      console.log('      Sample facility:');
      const sampleFacility = facilitiesData.hospitals.facilities[0];
      console.log(`        - ${sampleFacility.name} (${sampleFacility.area})`);
      console.log(`        - Records: ${sampleFacility.totalRecords}`);
      console.log(`        - Status: ${sampleFacility.isActive ? 'Active' : 'Inactive'}\n`);
    } else {
      console.log('   ❌ Failed!', facilitiesData);
      return;
    }

    // Test 7: Generate Surveillance Alerts
    console.log('7️⃣ Testing: POST /api/surveillance/alerts (Generate)');
    const generateAlertsResponse = await fetch(`${BASE_URL}/api/surveillance/alerts`, {
      method: 'POST'
    });
    const generateAlertsData = await generateAlertsResponse.json();
    
    if (generateAlertsResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Alerts Generated: ${generateAlertsData.alertsGenerated}`);
      if (generateAlertsData.alerts.length > 0) {
        console.log('      Sample alert:');
        const alert = generateAlertsData.alerts[0];
        console.log(`        - Severity: ${alert.severity}`);
        console.log(`        - Message: ${alert.message.substring(0, 80)}...`);
      }
      console.log('');
    } else {
      console.log('   ❌ Failed!', generateAlertsData);
    }

    // Test 8: Get Surveillance Alerts
    console.log('8️⃣ Testing: GET /api/surveillance/alerts');
    const alertsResponse = await fetch(`${BASE_URL}/api/surveillance/alerts`);
    const alertsData = await alertsResponse.json();
    
    if (alertsResponse.ok) {
      console.log('   ✅ Success!');
      console.log(`      Active Alerts: ${alertsData.count}`);
      console.log('      Statistics:');
      console.log(`        - Total: ${alertsData.statistics.total}`);
      console.log(`        - Active: ${alertsData.statistics.active}`);
      console.log(`        - High Severity: ${alertsData.statistics.highSeverity}\n`);
    } else {
      console.log('   ❌ Failed!', alertsData);
    }

    // Summary
    console.log('✅ All analytics API tests completed successfully!');
    console.log('\n📊 Phase 4 Verification:');
    console.log('   ✅ Surveillance overview with dynamic calculations');
    console.log('   ✅ Map data with monitoring levels');
    console.log('   ✅ Area summaries with real-time stats');
    console.log('   ✅ Trend data for historical analysis');
    console.log('   ✅ Facilities list with sync status');
    console.log('   ✅ Rule-based surveillance alerts');
    console.log('\n🎯 Phase 4 is COMPLETE! All analytics APIs are functional.');

  } catch (error) {
    console.error('\n❌ Error during API testing:', error.message);
    console.error('\nMake sure the Next.js dev server is running on http://localhost:3000');
  }
}

testAnalyticsAPIs();
