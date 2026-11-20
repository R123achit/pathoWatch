/**
 * Surveillance Alerts API
 * Returns active surveillance alerts
 * 
 * GET /api/surveillance/alerts?areaId=xxx
 * POST /api/surveillance/alerts/generate - Generate new alerts
 */

import { NextResponse } from 'next/server';
import { getActiveAlerts, generateSurveillanceAlerts, getAlertStatistics } from '@/lib/alertService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const areaId = searchParams.get('areaId');
    
    const alerts = await getActiveAlerts(areaId);
    const statistics = await getAlertStatistics();
    
    return NextResponse.json({
      success: true,
      count: alerts.length,
      statistics,
      alerts
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await generateSurveillanceAlerts();
    
    return NextResponse.json({
      success: true,
      message: 'Surveillance alerts generated',
      alertsGenerated: result.alertsGenerated,
      alerts: result.alerts.map(alert => ({
        id: alert.id,
        areaId: alert.areaId,
        type: alert.alertType,
        severity: alert.severity,
        message: alert.message,
        detectedAt: alert.detectedAt
      }))
    });
  } catch (error) {
    console.error('Error generating alerts:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
