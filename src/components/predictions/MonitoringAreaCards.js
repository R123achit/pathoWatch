export default function MonitoringAreaCards({ areas }) {
  return (
    <section id="monitoring-zones" className="lg:col-span-2">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
        Areas Requiring Closer Monitoring
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {areas.map((area) => (
          <div
            key={area.name}
            className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-label-md text-label-md font-bold text-on-surface">
                {area.name}
              </h3>
              <span
                className={`px-2 py-1 rounded-full font-label-md text-[10px] tracking-wider uppercase ${area.levelClass}`}
              >
                {area.levelLabel}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Growth:</span>
                <span className="font-bold text-on-surface">
                  {area.growth}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Trend:</span>
                <span className="font-bold text-on-surface">
                  {area.trend}
                </span>
              </div>
              <div className="text-sm text-secondary pt-2 border-t border-outline-variant">
                {area.outlook}
              </div>
            </div>
            <button className="w-full border border-primary text-primary font-label-md text-label-md py-2 rounded-lg hover:bg-surface-container-low transition-colors">
              View Area Analysis
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
