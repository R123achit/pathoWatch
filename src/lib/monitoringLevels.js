/**
 * Monitoring Level Calculation
 * Calculates surveillance monitoring levels based on AMR activity trends
 * 
 * Uses responsible terminology:
 * - Stable
 * - Moderate Activity
 * - Increasing Activity
 * - Requires Closer Monitoring
 */

/**
 * Calculate growth percentage between two periods
 */
function calculateGrowth(currentPeriod, previousPeriod) {
  if (previousPeriod === 0) {
    return currentPeriod > 0 ? 100 : 0;
  }
  
  return ((currentPeriod - previousPeriod) / previousPeriod) * 100;
}

/**
 * Determine monitoring level based on growth percentage
 * 
 * Thresholds:
 * - Stable: growth <= 5%
 * - Moderate Activity: 5% < growth <= 20%
 * - Increasing Activity: 20% < growth <= 40%
 * - Requires Closer Monitoring: growth > 40%
 */
export function getMonitoringLevel(growthPercentage) {
  if (growthPercentage <= 5) {
    return {
      level: 'Stable',
      severity: 'low',
      color: 'green'
    };
  } else if (growthPercentage <= 20) {
    return {
      level: 'Moderate Activity',
      severity: 'moderate',
      color: 'yellow'
    };
  } else if (growthPercentage <= 40) {
    return {
      level: 'Increasing Activity',
      severity: 'elevated',
      color: 'orange'
    };
  } else {
    return {
      level: 'Requires Closer Monitoring',
      severity: 'high',
      color: 'red'
    };
  }
}

/**
 * Calculate monitoring level for an area based on AMR record trends
 * Compares current 30-day period to previous 30-day period
 */
export async function calculateAreaMonitoringLevel(prisma, areaId) {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);
  
  const sixtyDaysAgo = new Date(now);
  sixtyDaysAgo.setDate(now.getDate() - 60);
  
  // Count resistant records in current period (last 30 days)
  const currentPeriodCount = await prisma.amrRecord.count({
    where: {
      areaId,
      reportDate: {
        gte: thirtyDaysAgo,
        lte: now
      },
      susceptibilityResult: 'Resistant'
    }
  });
  
  // Count resistant records in previous period (30-60 days ago)
  const previousPeriodCount = await prisma.amrRecord.count({
    where: {
      areaId,
      reportDate: {
        gte: sixtyDaysAgo,
        lt: thirtyDaysAgo
      },
      susceptibilityResult: 'Resistant'
    }
  });
  
  const growthPercentage = calculateGrowth(currentPeriodCount, previousPeriodCount);
  const monitoringLevel = getMonitoringLevel(growthPercentage);
  
  return {
    currentPeriod: currentPeriodCount,
    previousPeriod: previousPeriodCount,
    growthPercentage: Math.round(growthPercentage * 10) / 10,
    ...monitoringLevel
  };
}

/**
 * Determine trend direction
 */
export function getTrendDirection(growthPercentage) {
  if (growthPercentage > 5) return 'Increasing';
  if (growthPercentage < -5) return 'Decreasing';
  return 'Stable';
}

/**
 * Configuration constants
 */
export const MONITORING_THRESHOLDS = {
  STABLE: 5,
  MODERATE: 20,
  INCREASING: 40
};

export const MONITORING_LEVELS = {
  STABLE: 'Stable',
  MODERATE: 'Moderate Activity',
  INCREASING: 'Increasing Activity',
  HIGH: 'Requires Closer Monitoring'
};
