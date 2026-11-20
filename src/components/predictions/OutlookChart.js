"use client";

import { useState } from "react";

const RANGES = ["7D", "30D", "90D"];

export default function OutlookChart({ chartData }) {
  const [range, setRange] = useState("30D");
  const current = chartData[range];

  return (
    <section
      id="forecasts"
      className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-stack-lg"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Short-Term Surveillance Outlook
          </h2>
          <p className="font-body-sm text-body-sm text-secondary mt-1">
            Projected resistance patterns based on historical data.
          </p>
        </div>
        <div className="flex bg-surface-container-high rounded-lg p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                r === range
                  ? "px-4 py-1 text-sm font-label-md bg-surface text-primary rounded shadow-sm"
                  : "px-4 py-1 text-sm font-label-md text-secondary hover:text-primary transition-colors"
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div
        className="h-80 w-full relative border-l border-b border-outline-variant mb-4"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      >
        <div className="absolute -left-10 top-0 h-full flex flex-col justify-between text-xs text-secondary py-2">
          {current.yLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="absolute -bottom-8 left-0 w-full flex justify-between text-xs text-secondary px-2">
          {current.xLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d={current.historicalPath}
            fill="none"
            stroke="#00355f"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path d={current.forecastBand} fill="#d2e4ff" opacity="0.3" />
          <path
            d={current.forecastPath}
            fill="none"
            stroke="#0f4c81"
            strokeDasharray="4,4"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          className="absolute top-0 bottom-0 border-r border-dashed border-secondary opacity-50"
          style={{ left: `${current.nowLinePercent}%` }}
        />
      </div>
    </section>
  );
}
