// Mock data for the AMR Map page. Shape mirrors what
// GET /api/areas (national summary + region) and
// GET /api/surveillance (trend/table data) will return from PostgreSQL.

export const NATIONAL_SUMMARY = {
  totalCases: "124,500",
  statesMonitored: "28",
  highMonitoringAreas: "42",
  nationalTrendPercent: "+12%",
};

export const SELECTED_REGION = {
  name: "UTTAR PRADESH",
  reportedCases: "12,450",
  growth30d: "+14%",
  highMonitoringDistricts: 6,
  totalDistricts: 75,
  topPathogen: { name: "Escherichia coli", trendLabel: "Increasing" },
};

export const PATHOGEN_DISTRIBUTION = [
  { name: "E. coli", percent: 42, colorClass: "bg-primary" },
  { name: "K. pneumoniae", percent: 28, colorClass: "bg-primary-container" },
  { name: "S. aureus", percent: 18, colorClass: "bg-secondary" },
  { name: "Acinetobacter", percent: 12, colorClass: "bg-tertiary-container" },
];

export const FASTEST_CHANGING_AREAS = [
  { area: "Maharashtra", cases: "24,102", growth: "+18%", level: "High" },
  { area: "Tamil Nadu", cases: "18,540", growth: "+15%", level: "High" },
  { area: "Karnataka", cases: "15,890", growth: "+8%", level: "Elevated" },
  { area: "Kerala", cases: "12,300", growth: "+6%", level: "Elevated" },
];

// SVG path coordinates for the trend line, per time range.
export const NATIONAL_TREND = {
  "30D": {
    path: "M0,90 C20,80 30,85 50,60 C70,35 80,45 100,20",
    fillPath: "M0,90 C20,80 30,85 50,60 C70,35 80,45 100,20 L100,100 L0,100 Z",
    yAxis: ["15k", "10k", "5k", "0"],
    insight:
      "National surveillance data shows a gradual increase in reported AMR activity over the last quarter, primarily driven by critical priority pathogens in urban centers.",
  },
  "6M": {
    path: "M0,95 C15,90 35,70 50,65 C65,60 80,30 100,10",
    fillPath: "M0,95 C15,90 35,70 50,65 C65,60 80,30 100,10 L100,100 L0,100 Z",
    yAxis: ["40k", "27k", "13k", "0"],
    insight:
      "Over six months, reported activity has climbed steadily, with the sharpest rise in the last eight weeks.",
  },
  "1Y": {
    path: "M0,80 C20,85 30,60 50,55 C70,50 85,35 100,15",
    fillPath: "M0,80 C20,85 30,60 50,55 C70,50 85,35 100,15 L100,100 L0,100 Z",
    yAxis: ["80k", "53k", "27k", "0"],
    insight:
      "The annual view shows seasonal fluctuation with an overall upward trend in reported AMR activity year over year.",
  },
};
