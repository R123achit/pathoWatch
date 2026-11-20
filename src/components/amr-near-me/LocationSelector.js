"use client";

import { useState } from "react";
import { LOCATION_OPTIONS } from "@/lib/mockAmrNearMe";

export default function LocationSelector({ onSelect }) {
  const [state, setState] = useState(LOCATION_OPTIONS.states[0]);
  const [district, setDistrict] = useState(LOCATION_OPTIONS.districts[0]);
  const [area, setArea] = useState(LOCATION_OPTIONS.areas[0]);

  const handleExplore = () => {
    onSelect({ state, district, area });
  };

  const handleUseLocation = () => {
    // Real geolocation wiring comes later — for now, select the mock area.
    onSelect({ state, district, area });
  };

  return (
    <>
      <header className="max-w-3xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">
          AMR Surveillance Near You
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Explore aggregated antimicrobial resistance trends and surveillance
          data for your selected area. This data is collected from public
          health institutions and clinical laboratories to provide rapid
          insights.
        </p>
      </header>

      <section className="glass-panel p-8 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-end">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface-variant">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="form-select w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest font-body-md"
              >
                {LOCATION_OPTIONS.states.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface-variant">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="form-select w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest font-body-md"
              >
                {LOCATION_OPTIONS.districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Area
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="form-select w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest font-body-md"
              >
                {LOCATION_OPTIONS.areas.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-on-surface-variant text-sm">or</span>
            <button
              onClick={handleUseLocation}
              className="flex items-center gap-2 bg-surface-container-highest text-primary font-label-md text-label-md px-6 py-2.5 rounded-lg hover:bg-surface-dim transition-colors w-full md:w-auto justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">
                my_location
              </span>
              Use My Current Location
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-6 flex justify-end">
          <button
            onClick={handleExplore}
            className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Explore This Area
          </button>
        </div>
      </section>
    </>
  );
}
