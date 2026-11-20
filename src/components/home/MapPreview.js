"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MapPreview({
  region = "Uttar Pradesh",
  totalCases = "12,450",
  topPathogen = "E. coli",
  trend = "Increasing",
}) {
  const [previewAreas, setPreviewAreas] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    async function fetchPreview() {
      try {
        const response = await fetch('/api/map/ghaziabad');
        const data = await response.json();
        if (data.success) {
          // Show first 8 areas as preview
          setPreviewAreas(data.areas.slice(0, 8));
        }
      } catch (error) {
        console.error('Error loading map preview:', error);
      }
    }
    fetchPreview();
  }, []);

  const getBgColor = (level) => {
    switch(level) {
      case 'Stable': return 'bg-green-200';
      case 'Moderate Activity': return 'bg-yellow-200';
      case 'Increasing Activity': return 'bg-orange-200';
      case 'Requires Closer Monitoring': return 'bg-red-200';
      default: return 'bg-gray-200';
    }
  };
  return (
    <div className="lg:col-span-8 flex flex-col gap-stack-md">
      <div className="flex justify-between items-end">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          See How AMR Patterns Vary Across Regions
        </h3>
        <Link
          href="/amr-map"
          className="font-label-md text-primary hover:underline hidden md:flex items-center gap-1"
        >
          Full Map{" "}
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="bg-white border border-outline-variant rounded-xl shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[400px]">
        {/* Map preview with mini tiles */}
        <div className="flex-grow bg-surface-container-low relative p-4 flex items-center justify-center">
          {!isClient || previewAreas.length === 0 ? (
            <div className="z-10 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">
                map
              </span>
              <div className="font-body-md text-on-surface-variant">
                {isClient ? 'Loading Map Data...' : 'Interactive Map Visualization'}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-2xl">
              {previewAreas.map((area) => (
                <div
                  key={area.id}
                  className={`${getBgColor(area.monitoringLevel)} rounded-lg p-3 shadow-sm border border-gray-300`}
                >
                  <div className="text-xs font-semibold text-gray-700 truncate mb-1">
                    {area.name}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {area.totalCases}
                  </div>
                  <div className={`text-xs ${(area.growthRate || 0) > 0 ? 'text-red-700' : 'text-green-700'}`}>
                    {(area.growthRate || 0) > 0 ? '+' : ''}{(area.growthRate || 0).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar stats */}
        <div className="w-full md:w-72 bg-white border-t md:border-t-0 md:border-l border-outline-variant p-stack-md flex flex-col gap-4">
          <div className="font-label-md text-secondary">Selected Region</div>
          <div className="font-headline-md text-primary">{region}</div>

          <div className="space-y-4 mt-4">
            <div>
              <div className="font-body-sm text-on-surface-variant">
                Total Cases
              </div>
              <div className="font-body-lg font-bold text-on-surface">
                {totalCases}
              </div>
            </div>

            <div className="h-px w-full bg-outline-variant" />

            <div>
              <div className="font-body-sm text-on-surface-variant">
                Most Reported Pathogen
              </div>
              <div className="font-body-md text-on-surface font-mono mt-1">
                {topPathogen}
              </div>
            </div>

            <div>
              <div className="font-body-sm text-on-surface-variant">
                Resistance Trend
              </div>
              <div className="font-body-md text-status-amber flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>{" "}
                {trend}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/amr-map"
        className="font-label-md text-primary hover:underline flex md:hidden items-center justify-center gap-1 mt-2"
      >
        Full Map{" "}
        <span className="material-symbols-outlined text-sm">
          arrow_forward
        </span>
      </Link>
    </div>
  );
}
