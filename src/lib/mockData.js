// Mock data — matches the shape our future Postgres-backed API routes
// (src/app/api/...) will return. Swap the callers of this file for real
// fetch() calls once the backend endpoints are live.

export const NATIONAL_STATS = [
  { label: "Reported Cases", value: "24,592", color: "text-primary" },
  { label: "Areas Monitored", value: "412", color: "text-primary" },
  { label: "High-Risk Areas", value: "14", color: "text-status-red" },
  { label: "Active Alerts", value: "3", color: "text-status-amber" },
];

export const LOCAL_AREA = {
  location: "Ghaziabad, UP",
  level: "Moderate",
  reportedCases: "1,240",
  recentGrowth: "+18%",
};

export const SELECTED_REGION = {
  region: "Uttar Pradesh",
  totalCases: "12,450",
  topPathogen: "E. coli",
  trend: "Increasing",
};
