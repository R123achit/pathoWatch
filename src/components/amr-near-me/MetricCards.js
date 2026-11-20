export default function MetricCards({ metrics }) {
  const { reportedCases7d, highestResistance, sentinelSites, riskLevel } = metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Reported Cases (7d)
          </h3>
          <span className="material-symbols-outlined text-primary">
            coronavirus
          </span>
        </div>
        <div>
          <p className="font-display-lg text-primary">
            {reportedCases7d.value}
          </p>
          <div className="flex items-center gap-1 text-red-500 font-label-md mt-1">
            <span className="material-symbols-outlined text-sm">
              trending_up
            </span>
            <span>{reportedCases7d.changeLabel}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Highest Resistance
          </h3>
          <span className="material-symbols-outlined text-red-500">
            warning
          </span>
        </div>
        <div>
          <p className="font-headline-lg text-primary truncate">
            {highestResistance.pathogenLabel}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${highestResistance.percent}%` }}
              />
            </div>
            <span className="font-label-md text-red-500">
              {highestResistance.percent}%
            </span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
            Sentinel Sites
          </h3>
          <span className="material-symbols-outlined text-primary">
            local_hospital
          </span>
        </div>
        <div>
          <p className="font-display-lg text-primary">
            {sentinelSites.active}{" "}
            <span className="text-headline-md text-on-surface-variant font-normal">
              / {sentinelSites.total}
            </span>
          </p>
          <div className="flex items-center gap-1 text-green-500 font-label-md mt-1">
            <span className="material-symbols-outlined text-sm">
              check_circle
            </span>
            <span>{sentinelSites.statusLabel}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl flex flex-col justify-between bg-primary-container border-primary/20">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-label-md text-label-md text-primary uppercase tracking-wider">
            Risk Level
          </h3>
          <span className="material-symbols-outlined text-amber-500">
            notifications_active
          </span>
        </div>
        <div>
          <p className="font-display-lg text-amber-500">{riskLevel.label}</p>
          <div className="flex items-center gap-1 text-primary font-label-md mt-1">
            <span className="material-symbols-outlined text-sm">info</span>
            <span>{riskLevel.note}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
