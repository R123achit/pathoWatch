export default function AreaHeader({ area, onRefine }) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant pb-6">
      <div>
        <h1 className="font-display-lg text-display-lg text-primary mb-2 flex items-center gap-3">
          <span className="material-symbols-outlined text-4xl">
            location_on
          </span>
          {area.name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-body-lg">
          <span>
            {area.district}, {area.state}
          </span>
          <span className="mx-2">•</span>
          {area.dataLive && (
            <>
              <span className="text-green-500 flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>{" "}
                Data Live
              </span>
              <span className="mx-2">•</span>
            </>
          )}
          <span>Last updated: {area.lastUpdated}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onRefine}
          className="flex items-center gap-2 bg-surface-container-highest text-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-surface-dim transition-colors border border-outline-variant"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Refine Location
        </button>
      </div>
    </header>
  );
}
