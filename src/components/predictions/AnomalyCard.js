export default function AnomalyCard({ anomaly }) {
  return (
    <section id="anomaly-alerts" className="lg:col-span-1 flex flex-col">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
        Unusual Changes
      </h2>
      <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-error">
              warning
            </span>
            <span className="font-label-md text-label-md font-bold text-error">
              {anomaly.statusLabel}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary mb-6">
            {anomaly.description}
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary">Expected Pattern</span>
                <span className="font-bold">{anomaly.expectedLabel}</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full"
                  style={{ width: `${anomaly.expectedPercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-error font-bold">
                  Observed Activity
                </span>
                <span className="font-bold text-error">
                  {anomaly.observedLabel}
                </span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2 relative">
                <div
                  className="bg-error h-2 rounded-full"
                  style={{ width: `${anomaly.observedPercent}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-on-surface"
                  style={{ right: `${100 - anomaly.markerPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
