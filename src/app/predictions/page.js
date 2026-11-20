import Link from "next/link";
import OutlookSidebar from "@/components/predictions/OutlookSidebar";
import CurrentSituationCards from "@/components/predictions/CurrentSituationCards";
import OutlookChart from "@/components/predictions/OutlookChart";
import MonitoringAreaCards from "@/components/predictions/MonitoringAreaCards";
import AnomalyCard from "@/components/predictions/AnomalyCard";
import PredictionMethodology from "@/components/predictions/PredictionMethodology";
import {
  CURRENT_SITUATION,
  OUTLOOK_CHART,
  MONITORING_AREAS,
  ANOMALY,
} from "@/lib/mockPredictions";

export default function PredictionsPage() {
  return (
    <div className="flex max-w-container-max mx-auto">
      <OutlookSidebar />

      <main className="flex-1 min-w-0 p-margin-mobile md:p-margin-desktop">
        {/* Disclaimer */}
        <div className="bg-surface-container-highest border-l-4 border-primary p-4 rounded-r-lg mb-stack-lg flex items-start gap-4">
          <span className="material-symbols-outlined text-primary mt-1">
            info
          </span>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface font-bold">
              Disclaimer
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              PathoWatch forecasts are analytical early-warning indicators
              based on available surveillance data. They do not guarantee
              future outcomes and should not be interpreted as medical
              diagnosis, individual health risk, or confirmation of an
              outbreak.
            </p>
          </div>
        </div>

        {/* Header */}
        <header className="mb-stack-lg">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">
            AMR Trends and Outlook
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-3xl">
            Explore current surveillance patterns and analytical forecasts
            based on available AMR data.
          </p>
        </header>

        <CurrentSituationCards data={CURRENT_SITUATION} />

        <OutlookChart chartData={OUTLOOK_CHART} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-lg">
          <MonitoringAreaCards areas={MONITORING_AREAS} />
          <AnomalyCard anomaly={ANOMALY} />
        </div>

        <PredictionMethodology />

        {/* Final CTA */}
        <section className="text-center py-stack-lg border-t border-outline-variant mt-stack-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
            Explore the Data Behind the Outlook
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/amr-map"
              className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:opacity-90 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">
                map
              </span>
              View AMR Map
            </Link>
            <Link
              href="/amr-near-me"
              className="bg-surface border border-outline text-on-surface font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">
                my_location
              </span>
              Check My Area
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
