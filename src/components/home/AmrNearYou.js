"use client";

const LEVEL_STYLES = {
  Moderate: "bg-yellow-100 text-status-amber border-yellow-200",
  Low: "bg-green-100 text-green-700 border-green-200",
  High: "bg-red-100 text-status-red border-red-200",
};

export default function AmrNearYou({
  location = "Ghaziabad, UP",
  level = "Moderate",
  reportedCases = "1,240",
  recentGrowth = "+18%",
  onUseLocation,
}) {
  const badgeClass = LEVEL_STYLES[level] || LEVEL_STYLES.Moderate;

  return (
    <div className="lg:col-span-4 flex flex-col gap-stack-md">
      <h3 className="font-headline-md text-headline-md text-on-surface">
        AMR Near You
      </h3>
      <div className="bg-white border border-outline-variant rounded-xl p-stack-lg shadow-sm flex flex-col h-full relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="font-label-md text-secondary mb-1">
              Current Location
            </div>
            <div className="font-headline-md text-primary">{location}</div>
          </div>
          <span
            className={`font-label-md text-xs px-2 py-1 rounded border ${badgeClass}`}
          >
            {level.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
          <div>
            <div className="font-body-sm text-on-surface-variant">
              Reported Cases
            </div>
            <div className="font-headline-md text-on-surface">
              {reportedCases}
            </div>
          </div>
          <div>
            <div className="font-body-sm text-on-surface-variant">
              Recent Growth
            </div>
            <div className="font-headline-md text-status-red">
              {recentGrowth}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-outline-variant flex gap-2">
          <button
            onClick={onUseLocation}
            className="flex-1 bg-surface-container-low border border-outline-variant text-primary font-label-md py-2 rounded hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">
              my_location
            </span>
            Use My Location
          </button>
        </div>
      </div>
    </div>
  );
}
