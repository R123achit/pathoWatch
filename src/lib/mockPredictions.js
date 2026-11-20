// Mock data for the Predictions & Outlook page. Shape mirrors what
// GET /api/ai/forecast and GET /api/ai/anomaly will return once your
// teammate's AI/ML service is wired in — keep these keys stable so the
// frontend doesn't need to change later.

export const CURRENT_SITUATION = {
  reportedActivity: { value: "14,200", label: "Isolates Processed" },
  recentGrowth: { value: "+12%", label: "vs last month" },
  areasMonitored: { value: "18", label: "Districts Flagged" },
  nationalTrend: { value: "Increasing", label: "Based on 30-day moving avg" },
};

// SVG path coordinates (0-100 viewBox) per selected range.
// historicalPath = solid line up to "now"; forecastPath = dashed projection;
// forecastBand = shaded confidence area around the forecast.
export const OUTLOOK_CHART = {
  "7D": {
    xLabels: ["Mon", "Tue", "Wed", "Thu (Now)", "Fri (Fcst)", "Sat (Fcst)", "Sun (Fcst)"],
    yLabels: ["10k", "8k", "6k", "4k", "2k", "0"],
    historicalPath: "M0,85 L30,78 L60,65",
    forecastPath: "M60,65 L75,60 L100,50",
    forecastBand: "M60,65 L75,50 L100,35 L100,65 L75,72 L60,65",
    nowLinePercent: 60,
  },
  "30D": {
    xLabels: ["Jan", "Feb", "Mar", "Apr (Now)", "May (Fcst)", "Jun (Fcst)"],
    yLabels: ["10k", "8k", "6k", "4k", "2k", "0"],
    historicalPath: "M0,80 L20,75 L40,60 L60,40",
    forecastPath: "M60,40 L80,35 L100,25",
    forecastBand: "M60,40 L80,25 L100,10 L100,60 L80,50 L60,40",
    nowLinePercent: 60,
  },
  "90D": {
    xLabels: ["Q1", "Q2 (Now)", "Q3 (Fcst)", "Q4 (Fcst)"],
    yLabels: ["10k", "8k", "6k", "4k", "2k", "0"],
    historicalPath: "M0,90 L35,70 L50,55",
    forecastPath: "M50,55 L75,40 L100,20",
    forecastBand: "M50,55 L75,25 L100,5 L100,45 L75,55 L50,55",
    nowLinePercent: 50,
  },
};

export const MONITORING_AREAS = [
  {
    name: "District A",
    levelLabel: "High Monitoring",
    levelClass: "bg-error-container text-on-error-container",
    growth: "+84%",
    trend: "Increasing",
    outlook: "Outlook: Potential continued increase",
  },
  {
    name: "Northern Region",
    levelLabel: "Mod Monitoring",
    levelClass: "bg-secondary-container text-on-secondary-container",
    growth: "+42%",
    trend: "Stable High",
    outlook: "Outlook: Plateau expected",
  },
];

export const ANOMALY = {
  statusLabel: "Status: Unusual Increase",
  description:
    "This signal indicates that recent reported activity differs from the expected historical pattern and may require closer monitoring.",
  expectedLabel: "15-28 cases",
  expectedPercent: 40,
  observedLabel: "42 cases",
  observedPercent: 85,
  markerPercent: 60,
};

export const PREDICTION_STEPS = [
  { icon: "database", label: "Historical Data", active: false },
  { icon: "troubleshoot", label: "Pattern Analysis", active: false },
  { icon: "model_training", label: "Analytical Models", active: true },
  { icon: "monitoring", label: "Trend Forecast", active: false },
];

export const MODEL_TRANSPARENCY = [
  { label: "Last Data Update:", value: "2 Hours Ago" },
  { label: "Model Update:", value: "Daily" },
  { label: "Data Coverage:", value: "National Sentinel Network" },
  { label: "Forecast Period:", value: "90 Days" },
];

export const OUTLOOK_SIDEBAR_LINKS = [
  { label: "Current Situation", icon: "analytics", href: "#current-situation" },
  { label: "Forecasts", icon: "timeline", href: "#forecasts" },
  { label: "Monitoring Zones", icon: "map", href: "#monitoring-zones" },
  { label: "Anomaly Alerts", icon: "warning", href: "#anomaly-alerts" },
  { label: "Model Methodology", icon: "science", href: "#methodology" },
];
