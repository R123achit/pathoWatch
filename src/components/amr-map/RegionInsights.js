export default function RegionInsights({ region, pathogenDistribution }) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-gutter">
      {/* Selected region card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md flex-grow">
        <div className="flex justify-between items-start mb-stack-sm border-b border-outline-variant pb-stack-sm">
          <div>
            <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">
              Selected Region
            </p>
            <h2 className="font-headline-md text-headline-md text-on-background">
              {region.name}
            </h2>
          </div>
          <span className="material-symbols-outlined text-primary text-3xl">
            location_on
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-stack-md">
          <div>
            <p className="font-body-sm text-body-sm text-secondary">
              Reported Cases
            </p>
            <p className="font-headline-md text-headline-md text-on-background">
              {region.reportedCases}
            </p>
          </div>
          <div>
            <p className="font-body-sm text-body-sm text-secondary">
              Growth (30d)
            </p>
            <p className="font-headline-md text-headline-md text-error flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                arrow_upward
              </span>
              {region.growth30d}
            </p>
          </div>
          <div className="col-span-2">
            <p className="font-body-sm text-body-sm text-secondary">
              High-Monitoring Districts
            </p>
            <p className="font-headline-md text-headline-md text-on-background">
              {region.highMonitoringDistricts}{" "}
              <span className="text-body-sm text-outline font-normal">
                of {region.totalDistricts}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-surface-container-low p-3 rounded-sm border border-outline-variant mb-stack-md">
          <p className="font-label-md text-label-md mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">
              science
            </span>
            Top Pathogen Concern
          </p>
          <div className="flex justify-between items-center">
            <span className="font-body-md text-on-background font-medium">
              {region.topPathogen.name}
            </span>
            <span className="bg-error/10 text-error px-2 py-1 rounded-full font-label-md text-xs">
              {region.topPathogen.trendLabel}
            </span>
          </div>
        </div>

        <button className="w-full bg-primary text-on-primary py-2 rounded font-label-md text-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2 mt-auto">
          View Detailed Area Report
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>

      {/* National pathogen distribution */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-stack-md">
        <h3 className="font-headline-md text-headline-md text-on-background mb-stack-sm text-lg">
          National Pathogen Distribution
        </h3>
        <div className="flex flex-col gap-3">
          {pathogenDistribution.map((p) => (
            <div key={p.name}>
              <div className="flex justify-between font-body-sm text-body-sm mb-1">
                <span>{p.name}</span>
                <span className="font-medium">{p.percent}%</span>
              </div>
              <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                <div
                  className={`h-full ${p.colorClass}`}
                  style={{ width: `${p.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
