/**
 * Surveillance Alert Service
 * Creates rule-based alerts for significant AMR activity changes
 */

import prisma from './prisma';
import { calculateAreaMonitoringLevel } from './monitoringLevels';

/**
 * Generate surveillance alerts for all areas
 * This should be run after each sync or periodically
 */
export async function generateSurveillanceAlerts() {
  const areas = await prisma.area.findMany();
  const newAlerts = [];
  
  for (const area of areas) {
    const monitoring = await calculateAreaMonitoringLevel(prisma, area.id);
    
    // Check if an alert should be created
    let alertType = null;
    let severity = null;
    let message = null;
    
    if (monitoring.growthPercentage > 40) {
      alertType = 'growth_spike';
      severity = 'High';
      message = `Significant increase in AMR surveillance activity detected in ${area.name}. Resistant cases increased by ${monitoring.growthPercentage}% in the last 30 days compared to the previous period.`;
    } else if (monitoring.growthPercentage > 20) {
      alertType = 'growth_spike';
      severity = 'Moderate';
      message = `Increasing surveillance activity detected in ${area.name}. Resistant cases increased by ${monitoring.growthPercentage}% over the previous monitoring period.`;
    }
    
    // Only create alert if there's something to report
    if (alertType) {
      // Check if similar alert already exists (within last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const existingAlert = await prisma.surveillanceAlert.findFirst({
        where: {
          areaId: area.id,
          alertType,
          detectedAt: { gte: sevenDaysAgo },
          status: { in: ['active', 'acknowledged'] }
        }
      });
      
      // Don't create duplicate alerts
      if (!existingAlert) {
        const alert = await prisma.surveillanceAlert.create({
          data: {
            areaId: area.id,
            alertType,
            severity,
            message,
            status: 'active'
          }
        });
        
        newAlerts.push(alert);
      }
    }
  }
  
  return {
    alertsGenerated: newAlerts.length,
    alerts: newAlerts
  };
}

/**
 * Get active surveillance alerts
 */
export async function getActiveAlerts(areaId = null) {
  const where = {
    status: { in: ['active', 'acknowledged'] }
  };
  
  if (areaId) {
    where.areaId = areaId;
  }
  
  const alerts = await prisma.surveillanceAlert.findMany({
    where,
    include: {
      area: true
    },
    orderBy: [
      { severity: 'desc' },
      { detectedAt: 'desc' }
    ]
  });
  
  return alerts.map(alert => ({
    id: alert.id,
    area: {
      id: alert.area.id,
      name: alert.area.name
    },
    type: alert.alertType,
    severity: alert.severity,
    message: alert.message,
    detectedAt: alert.detectedAt,
    status: alert.status
  }));
}

/**
 * Acknowledge an alert
 */
export async function acknowledgeAlert(alertId) {
  return await prisma.surveillanceAlert.update({
    where: { id: alertId },
    data: { status: 'acknowledged' }
  });
}

/**
 * Resolve an alert
 */
export async function resolveAlert(alertId) {
  return await prisma.surveillanceAlert.update({
    where: { id: alertId },
    data: { status: 'resolved' }
  });
}

/**
 * Get alert statistics
 */
export async function getAlertStatistics() {
  const total = await prisma.surveillanceAlert.count();
  const active = await prisma.surveillanceAlert.count({
    where: { status: 'active' }
  });
  const acknowledged = await prisma.surveillanceAlert.count({
    where: { status: 'acknowledged' }
  });
  const resolved = await prisma.surveillanceAlert.count({
    where: { status: 'resolved' }
  });
  
  const highSeverity = await prisma.surveillanceAlert.count({
    where: { 
      severity: 'High',
      status: { in: ['active', 'acknowledged'] }
    }
  });
  
  return {
    total,
    active,
    acknowledged,
    resolved,
    highSeverity
  };
}
