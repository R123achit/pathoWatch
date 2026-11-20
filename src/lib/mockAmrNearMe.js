// Mock data for the AMR Near Me page. Shape mirrors what
// GET /api/areas/[id] will eventually return from PostgreSQL.

export const LOCATION_OPTIONS = {
  states: ["Uttar Pradesh"],
  districts: ["Ghaziabad"],
  areas: ["Ghaziabad City"],
};

export const AREA_DASHBOARD = {
  name: "Ghaziabad City",
  district: "Ghaziabad District",
  state: "Uttar Pradesh",
  dataLive: true,
  lastUpdated: "Today, 08:00 AM",
  metrics: {
    reportedCases7d: { value: "1,248", changeLabel: "+12% vs last week", trend: "up" },
    highestResistance: { pathogenLabel: "E. coli / CTX", percent: 68 },
    sentinelSites: { active: 14, total: 18, statusLabel: "Active Reporting" },
    riskLevel: { label: "Elevated", note: "Monitor Carbapenem trend" },
  },
  mapLegend: [
    { label: "High Cluster", color: "bg-red-500", textClass: "bg-red-100 text-red-700" },
    { label: "Monitor", color: "bg-amber-500", textClass: "bg-amber-100 text-amber-700" },
    { label: "Site", color: "", textClass: "bg-primary-container text-primary", icon: "local_hospital" },
  ],
  mapMarkers: [
    {
      type: "cluster",
      top: "40%",
      left: "50%",
      title: "Central District Cluster",
      description:
        "High incidence of Carbapenem-resistant Enterobacteriaceae (CRE).",
      changeLabel: "+15% this week",
    },
    { type: "site", top: "20%", left: "30%", title: "City Hospital", icon: "local_hospital" },
    { type: "site", top: "60%", left: "70%", title: "North Clinic", icon: "local_hospital" },
    { type: "site", top: "75%", left: "45%", title: "South Lab", icon: "science", amber: true },
  ],
  pathogens: [
    {
      name: "Escherichia coli",
      note: "Top concern in region",
      level: "High",
      levelClass: "bg-red-100 text-red-700",
      resistances: [
        { antibiotic: "Carbapenems", percent: 24, colorClass: "bg-red-500", textClass: "text-red-500" },
        { antibiotic: "Fluoroquinolones", percent: 42, colorClass: "bg-amber-500", textClass: "text-amber-500" },
      ],
    },
    {
      name: "Klebsiella pneumoniae",
      note: null,
      level: "Elevated",
      levelClass: "bg-amber-100 text-amber-700",
      resistances: [
        { antibiotic: "3rd Gen Ceph.", percent: 38, colorClass: "bg-amber-500", textClass: "text-amber-500" },
      ],
    },
  ],
};
