const DEFAULT_STATS = [
  { label: "Reported Cases", value: "24,592", color: "text-primary" },
  { label: "Areas Monitored", value: "412", color: "text-primary" },
  { label: "High-Risk Areas", value: "14", color: "text-status-red" },
  { label: "Active Alerts", value: "3", color: "text-status-amber" },
];

export default function StatsOverview({ stats = DEFAULT_STATS }) {
  return (
    <section className="bg-surface-container-low py-stack-lg border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-stack-md">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            National Surveillance Overview
          </h2>
          <span className="font-body-sm text-body-sm text-on-surface-variant hidden md:block">
            Based on available surveillance data
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-outline-variant rounded-lg p-stack-md shadow-sm"
            >
              <div className="font-label-md text-on-surface-variant mb-2">
                {stat.label}
              </div>
              <div className={`font-headline-lg ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        <span className="font-body-sm text-body-sm text-on-surface-variant block md:hidden mt-4 text-center">
          Based on available surveillance data
        </span>
      </div>
    </section>
  );
}
