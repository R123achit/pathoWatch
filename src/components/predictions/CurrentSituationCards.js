export default function CurrentSituationCards({ data }) {
  return (
    <section
      id="current-situation"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-lg"
    >
      <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <span className="font-label-md text-label-md text-secondary">
            Current Reported Activity
          </span>
          <span className="material-symbols-outlined text-primary">
            data_usage
          </span>
        </div>
        <div className="font-display-lg text-headline-lg md:text-display-lg text-on-surface">
          {data.reportedActivity.value}
        </div>
        <div className="font-body-sm text-body-sm text-secondary mt-2">
          {data.reportedActivity.label}
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <span className="font-label-md text-label-md text-secondary">
            Recent Growth
          </span>
          <span className="material-symbols-outlined text-primary">
            trending_up
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <div className="font-display-lg text-headline-lg md:text-display-lg text-on-surface">
            {data.recentGrowth.value}
          </div>
          <span className="bg-surface-container-high text-primary px-2 py-1 rounded-full font-label-md text-[12px]">
            {data.recentGrowth.label}
          </span>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <span className="font-label-md text-label-md text-secondary">
            Areas Under Closer Monitoring
          </span>
          <span className="material-symbols-outlined text-primary">
            location_searching
          </span>
        </div>
        <div className="font-display-lg text-headline-lg md:text-display-lg text-on-surface">
          {data.areasMonitored.value}
        </div>
        <div className="font-body-sm text-body-sm text-secondary mt-2">
          {data.areasMonitored.label}
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <span className="font-label-md text-label-md text-primary">
            Current National Trend
          </span>
          <span className="material-symbols-outlined text-primary">
            ssid_chart
          </span>
        </div>
        <div className="font-headline-lg text-headline-lg text-primary mt-2">
          {data.nationalTrend.value}
        </div>
        <div className="font-body-sm text-body-sm text-secondary mt-2">
          {data.nationalTrend.label}
        </div>
      </div>
    </section>
  );
}
