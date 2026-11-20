"use client";
import { useState } from "react";
import LocationSelector from "@/components/amr-near-me/LocationSelector";
import AreaHeader from "@/components/amr-near-me/AreaHeader";
import MetricCards from "@/components/amr-near-me/MetricCards";
import EpidemiologicalMap from "@/components/amr-near-me/EpidemiologicalMap";
import PathogenProfiles from "@/components/amr-near-me/PathogenProfiles";
import MethodologyFooter from "@/components/amr-near-me/MethodologyFooter";
import { AREA_DASHBOARD } from "@/lib/mockAmrNearMe";

export default function AmrNearMePage() {
  // null = show the selection view. Once set, show the area dashboard.
  // Swap this for a real fetch("/api/areas/...") call once the backend
  // and Postgres are wired up — the selected {state, district, area}
  // is already available here to build that request.
  const [selectedLocation, setSelectedLocation] = useState(null);

  if (!selectedLocation) {
    return (
      <main className="flex-grow px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full flex flex-col gap-12">
        <LocationSelector onSelect={setSelectedLocation} />
      </main>
    );
  }

  // AREA_DASHBOARD is mock data standing in for the API response.
  const area = AREA_DASHBOARD;

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto w-full flex flex-col gap-8">
      <AreaHeader area={area} onRefine={() => setSelectedLocation(null)} />

      <MetricCards metrics={area.metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <EpidemiologicalMap
            legend={area.mapLegend}
            markers={area.mapMarkers}
          />
        </div>
        <div className="flex flex-col gap-6">
          <PathogenProfiles pathogens={area.pathogens} />
        </div>
      </div>

      <MethodologyFooter />
    </main>
  );
}
