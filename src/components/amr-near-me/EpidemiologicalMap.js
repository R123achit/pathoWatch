"use client";

import { useState } from "react";

export default function EpidemiologicalMap({ legend, markers }) {
  const [hoveredCluster, setHoveredCluster] = useState(null);

  return (
    <section className="glass-panel rounded-xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex flex-wrap justify-between items-center gap-2 z-10 relative">
        <h2 className="font-headline-md text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">map</span>
          Local Epidemiological Map
        </h2>
        <div className="flex gap-2 flex-wrap">
          {legend.map((item) => (
            <span
              key={item.label}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded ${item.textClass}`}
            >
              {item.icon ? (
                <span className="material-symbols-outlined text-[14px]">
                  {item.icon}
                </span>
              ) : (
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
              )}
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-grow relative map-bg">
        <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-on-surface-variant hover:text-primary mt-2">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {markers.map((marker, idx) => {
          if (marker.type === "cluster") {
            return (
              <div
                key={idx}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                style={{ top: marker.top, left: marker.left }}
                onMouseEnter={() => setHoveredCluster(idx)}
                onMouseLeave={() => setHoveredCluster(null)}
              >
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center map-marker">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>
                {hoveredCluster === idx && (
                  <div className="absolute top-full mt-2 bg-white p-3 rounded shadow-lg border border-outline-variant w-48 z-20">
                    <h4 className="font-bold text-sm text-primary mb-1">
                      {marker.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mb-2">
                      {marker.description}
                    </p>
                    <div className="text-xs font-semibold text-red-500">
                      {marker.changeLabel}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={idx}
              className={`absolute -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer ${
                marker.amber ? "text-amber-500" : "text-primary"
              }`}
              style={{ top: marker.top, left: marker.left }}
              title={marker.title}
            >
              <span className="material-symbols-outlined">
                {marker.icon}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
