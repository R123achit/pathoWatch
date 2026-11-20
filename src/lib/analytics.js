/**
 * Analytics and Statistics Calculations
 * All statistics are calculated dynamically from PostgreSQL data
 */

import prisma from './prisma';
import { calculateAreaMonitoringLevel, getTrendDirection } from './monitoringLevels';

/**
 * Get overall surveillance overview
 */
export async function getSurveillanceOverview() {
  // Total AMR records
  const totalRecords = await prisma.amrRecord.count();
  
  // Total areas being monitored
  const totalAreas = await prisma.area.count();
  
  // Total facilities connected
  const totalFacilities = await prisma.facility.count({
    where: { isActive: true }
  });
  
  // Calculate overall growth (last 30 days vs previous 30 days)
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const sixtyDaysAgo = new Date(now);
  sixtyDaysAgo.setDate(now.getDate() - 60);
  
  const currentPeriodTotal = await prisma.amrRecord.count({
    where: {
      reportDate: { gte: thirtyDaysAgo, lte: now },
      susceptibilityResult: 'Resistant'
    }
  });
  
  const previousPeriodTotal = await prisma.amrRecord.count({
    where: {
      reportDate: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      susceptibilityResult: 'Resistant'
    }
  });
  
  const overallGrowth = previousPeriodTotal > 0
    ? Math.round(((currentPeriodTotal - previousPeriodTotal) / previousPeriodTotal) * 100 * 10) / 10
    : 0;
  
  // Get last sync info
  const lastSync = await prisma.syncLog.findFirst({
    where: { status: 'completed' },
    orderBy: { syncStartedAt: 'desc' }
  });
  
  return {
    totalRecords,
    totalAreas,
    totalFacilities,
    currentPeriodResistant: currentPeriodTotal,
    previousPeriodResistant: previousPeriodTotal,
    overallGrowth,
    lastSyncAt: lastSync?.syncStartedAt || null
  };
}

/**
 * Get detailed area summary
 */
export async function getAreaSummary(areaId) {
  const area = await prisma.area.findUnique({
    where: { id: areaId },
    include: {
      facilities: {
        where: { isActive: true }
      }
    }
  });
  
  if (!area) {
    throw new Error('Area not found');
  }
  
  // Total records
  const totalRecords = await prisma.amrRecord.count({
    where: { areaId }
  });
  
  // Resistant records
  const resistantRecords = await prisma.amrRecord.count({
    where: { areaId, susceptibilityResult: 'Resistant' }
  });
  
  // Calculate monitoring level
  const monitoring = await calculateAreaMonitoringLevel(prisma, areaId);
  
  // Get top pathogen
  const pathogens = await prisma.amrRecord.groupBy({
    by: ['pathogen'],
    where: { areaId, susceptibilityResult: 'Resistant' },
    _count: { pathogen: true },
    orderBy: { _count: { pathogen: 'desc' } },
    take: 1
  });
  
  const topPathogen = pathogens[0] || null;
  
  // Get latest record date
  const latestRecord = await prisma.amrRecord.findFirst({
    where: { areaId },
    orderBy: { reportDate: 'desc' },
    select: { reportDate: true }
  });
  
  return {
    area: {
      id: area.id,
      name: area.name,
      district: area.district,
      state: area.state,
      latitude: area.latitude,
      longitude: area.longitude
    },
    statistics: {
      totalRecords,
      resistantRecords,
      sensitiveRecords: totalRecords - resistantRecords,
      resistanceRate: totalRecords > 0 
        ? Math.round((resistantRecords / totalRecords) * 100 * 10) / 10
        : 0
    },
    monitoring: {
      level: monitoring.level,
      severity: monitoring.severity,
      growthPercentage: monitoring.growthPercentage,
      trend: getTrendDirection(monitoring.growthPercentage),
      currentPeriod: monitoring.currentPeriod,
      previousPeriod: monitoring.previousPeriod
    },
    topPathogen: topPathogen ? {
      name: topPathogen.pathogen,
      count: topPathogen._count.pathogen
    } : null,
    facilities: area.facilities.length,
    lastUpdated: latestRecord?.reportDate || null
  };
}

/**
 * Get area trend data (monthly aggregation)
 */
export async function getAreaTrend(areaId, months = 6) {
  const area = await prisma.area.findUnique({
    where: { id: areaId }
  });
  
  if (!area) {
    throw new Error('Area not found');
  }
  
  const monthsAgo = new Date();
  monthsAgo.setMonth(monthsAgo.getMonth() - months);
  
  const records = await prisma.amrRecord.findMany({
    where: {
      areaId,
      reportDate: { gte: monthsAgo },
      susceptibilityResult: 'Resistant'
    },
    select: {
      reportDate: true
    },
    orderBy: { reportDate: 'asc' }
  });
  
  // Group by month
  const monthlyData = {};
  records.forEach(record => {
    const monthKey = `${record.reportDate.getFullYear()}-${String(record.reportDate.getMonth() + 1).padStart(2, '0')}`;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
  });
  
  // Convert to array
  const trend = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    count
  }));
  
  return {
    areaId,
    areaName: area.name,
    period: `${months} months`,
    dataPoints: trend
  };
}

/**
 * Get map data for all areas with calculated monitoring levels
 */
export async function getGhaziabadMapData() {
  const areas = await prisma.area.findMany({
    where: {
      district: 'Ghaziabad'
    },
    include: {
      facilities: {
        where: { isActive: true }
      }
    }
  });
  
  const mapData = await Promise.all(
    areas.map(async (area) => {
      const totalRecords = await prisma.amrRecord.count({
        where: { areaId: area.id }
      });
      
      const resistantRecords = await prisma.amrRecord.count({
        where: { areaId: area.id, susceptibilityResult: 'Resistant' }
      });
      
      const monitoring = await calculateAreaMonitoringLevel(prisma, area.id);
      
      // Get top pathogen
      const pathogens = await prisma.amrRecord.groupBy({
        by: ['pathogen'],
        where: { areaId: area.id, susceptibilityResult: 'Resistant' },
        _count: { pathogen: true },
        orderBy: { _count: { pathogen: 'desc' } },
        take: 1
      });
      
      return {
        areaId: area.id,
        name: area.name,
        latitude: area.latitude,
        longitude: area.longitude,
        geojson: area.geojson ? JSON.parse(area.geojson) : null,
        statistics: {
          totalRecords,
          resistantRecords,
          resistanceRate: totalRecords > 0
            ? Math.round((resistantRecords / totalRecords) * 100)
            : 0
        },
        monitoring: {
          level: monitoring.level,
          severity: monitoring.severity,
          color: monitoring.color,
          growthPercentage: monitoring.growthPercentage,
          trend: getTrendDirection(monitoring.growthPercentage)
        },
        topPathogen: pathogens[0]?.pathogen || null,
        facilitiesCount: area.facilities.length
      };
    })
  );
  
  return mapData;
}

/**
 * Get top pathogens across all areas
 */
export async function getTopPathogens(limit = 5) {
  const pathogens = await prisma.amrRecord.groupBy({
    by: ['pathogen'],
    where: { susceptibilityResult: 'Resistant' },
    _count: { pathogen: true },
    orderBy: { _count: { pathogen: 'desc' } },
    take: limit
  });
  
  return pathogens.map(p => ({
    name: p.pathogen,
    count: p._count.pathogen
  }));
}
