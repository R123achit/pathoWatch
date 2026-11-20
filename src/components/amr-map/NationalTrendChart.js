"use client";

import { useState } from "react";

const RANGES = ["30D", "6M", "1Y"];

export default function NationalTrendChart({ trendData }) {
  const [range, setRange] = useState("30D");
  const current = trendData[range];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded flex flex-col p-stack-md">
      <div className="flex justify-between items-start mb-stack-sm">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-background">
            National Trend
          </h3>
          <p className="font-body-sm text-body-sm text-secondary">
            Aggregated case volume over time.
          </p>
        </div>
        <div className="flex bg-surface-variant rounded-sm p-1 border border-outline-variant">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={
                r === range
                  ? "px-3 py-1 text-xs font-label-md bg-surface border border-outline-variant rounded-sm shadow-sm"
                  : "px-3 py-1 text-xs font-label-md text-secondary hover:text-primary transition-colors"
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow min-h-[200px] border-b border-l border-outline-variant relative mt-4 mb-4 flex items-end">
        <svg
          className="absolute inset-0 w-full h-full text-primary opacity-80"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path d={current.fillPath} fill="rgba(15, 76, 129, 0.1)" />
          <path
            d={current.path}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <div className="absolute left-[-30px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-secondary py-2">
          {current.yAxis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-low p-3 rounded-sm border border-outline-variant flex items-start gap-3 mt-auto">
        <span className="material-symbols-outlined text-primary mt-0.5">
          info
        </span>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          <strong className="text-on-background">Insight:</strong>{" "}
          {current.insight}
        </p>
      </div>
    </div>
  );
}
