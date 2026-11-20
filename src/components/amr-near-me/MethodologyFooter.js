export default function MethodologyFooter() {
  return (
    <section className="bg-surface-container-low p-6 rounded-xl border border-outline-variant mt-4">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <h4 className="font-headline-md text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">shield_lock</span>
            Data Privacy &amp; Methodology
          </h4>
          <p className="text-body-sm text-on-surface-variant">
            Location data is aggregated at the district level to ensure
            patient privacy. Trends are calculated using moving averages from
            participating sentinel sites. Anomalies in reporting (e.g.,
            batched data uploads) are smoothed automatically.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="font-headline-md text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined">menu_book</span>
            How to Interpret
          </h4>
          <p className="text-body-sm text-on-surface-variant">
            &quot;Resistance %&quot; indicates the proportion of tested
            isolates that were non-susceptible to a given antibiotic. A
            rising trend line suggests an expanding resistance profile
            requiring clinical attention.
          </p>
        </div>
      </div>
    </section>
  );
}
