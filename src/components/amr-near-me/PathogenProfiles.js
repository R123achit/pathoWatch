export default function PathogenProfiles({ pathogens }) {
  return (
    <section className="glass-panel p-6 rounded-xl h-full">
      <h2 className="font-headline-md text-primary mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">biotech</span>
        Pathogen Resistance Profiles
      </h2>

      <div className="flex flex-col gap-4">
        {pathogens.map((pathogen) => (
          <div
            key={pathogen.name}
            className="border border-outline-variant rounded-lg p-4 bg-surface-container-lowest hover:border-primary transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-on-surface italic">
                  {pathogen.name}
                </h4>
                {pathogen.note && (
                  <span className="text-xs text-on-surface-variant">
                    {pathogen.note}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${pathogen.levelClass}`}
              >
                {pathogen.level}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {pathogen.resistances.map((r) => (
                <div key={r.antibiotic}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-on-surface-variant">
                      {r.antibiotic}
                    </span>
                    <span className={`font-bold ${r.textClass}`}>
                      {r.percent}% Resistance
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className={`h-full ${r.colorClass}`}
                      style={{ width: `${r.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 text-primary font-label-md hover:bg-surface-container-highest rounded transition-colors text-center mt-2">
        View Full Pathogen Report
      </button>
    </section>
  );
}
