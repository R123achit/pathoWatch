import MapExplorer from "@/components/amr-map/MapExplorer";
import RegionInsights from "@/components/amr-map/RegionInsights";
import FastestChangingTable from "@/components/amr-map/FastestChangingTable";
import NationalTrendChart from "@/components/amr-map/NationalTrendChart";
import {
  NATIONAL_SUMMARY,
  SELECTED_REGION,
  PATHOGEN_DISTRIBUTION,
  FASTEST_CHANGING_AREAS,
  NATIONAL_TREND,
} from "@/lib/mockAmrMap";

export default function AmrMapPage() {
  return (
    <main className="px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full">
      {/* Header */}
      <section className="mb-stack-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-unit">
          Explore AMR Patterns Across Regions
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Visualize available antimicrobial resistance surveillance data
          across states, districts, and local areas.
        </p>
      </section>

      {/* National summary */}
      <section className="mb-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-unit">
          <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded">
            <p className="font-label-md text-label-md text-secondary mb-unit">
              Total Cases
            </p>
            <p className="font-display-lg text-display-lg text-primary">
              {NATIONAL_SUMMARY.totalCases}
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded">
            <p className="font-label-md text-label-md text-secondary mb-unit">
              States Monitored
            </p>
            <p className="font-display-lg text-display-lg text-primary">
              {NATIONAL_SUMMARY.statesMonitored}
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded">
            <p className="font-label-md text-label-md text-secondary mb-unit">
              High-Monitoring Areas
            </p>
            <p className="font-display-lg text-display-lg text-primary">
              {NATIONAL_SUMMARY.highMonitoringAreas}
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded">
            <p className="font-label-md text-label-md text-secondary mb-unit">
              National Trend
            </p>
            <p className="font-display-lg text-display-lg text-error flex items-center gap-2">
              <span className="material-symbols-outlined">trending_up</span>
              {NATIONAL_SUMMARY.nationalTrendPercent}
            </p>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-outline italic">
          Based on available connected surveillance data
        </p>
      </section>

      {/* Map + region sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-stack-lg">
        <MapExplorer />
        <RegionInsights
          region={SELECTED_REGION}
          pathogenDistribution={PATHOGEN_DISTRIBUTION}
        />
      </div>

      {/* Table + trend chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-stack-lg">
        <FastestChangingTable areas={FASTEST_CHANGING_AREAS} />
        <NationalTrendChart trendData={NATIONAL_TREND} />
      </div>

      {/* Disclaimer */}
      <div className="text-center mt-stack-lg border-t border-outline-variant pt-stack-md">
        <p className="font-body-sm text-body-sm text-outline">
          Disclaimer: Data presented on this map is aggregated from
          participating sentinel sites and laboratories. It may not represent
          the complete epidemiological picture and should be used for
          surveillance trend analysis only.
        </p>
      </div>
    </main>
  );
}
