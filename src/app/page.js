import Hero from "@/components/home/Hero";
import StatsOverview from "@/components/home/StatsOverview";
import AmrNearYou from "@/components/home/AmrNearYou";
import MapPreview from "@/components/home/MapPreview";
import { NATIONAL_STATS, LOCAL_AREA, SELECTED_REGION } from "@/lib/mockData";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsOverview stats={NATIONAL_STATS} />

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <AmrNearYou
          location={LOCAL_AREA.location}
          level={LOCAL_AREA.level}
          reportedCases={LOCAL_AREA.reportedCases}
          recentGrowth={LOCAL_AREA.recentGrowth}
        />
        <MapPreview
          region={SELECTED_REGION.region}
          totalCases={SELECTED_REGION.totalCases}
          topPathogen={SELECTED_REGION.topPathogen}
          trend={SELECTED_REGION.trend}
        />
      </section>
    </>
  );
}



