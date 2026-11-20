"use client";

import { useState } from "react";
import { OUTLOOK_SIDEBAR_LINKS } from "@/lib/mockPredictions";

export default function OutlookSidebar() {
  const [active, setActive] = useState("Forecasts");

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-20 self-start h-[calc(100vh-5rem)] p-stack-md overflow-y-auto bg-surface-container-low border-r border-outline-variant">
      <div className="mb-stack-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
          <div>
            <h2 className="font-label-md text-label-md font-bold text-on-surface">
              Global AMR Outlook
            </h2>
            <p className="font-body-sm text-body-sm text-secondary">
              AI-Driven Surveillance
            </p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {OUTLOOK_SIDEBAR_LINKS.map((link) => {
          const isActive = link.label === active;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className={
                isActive
                  ? "flex items-center gap-3 p-3 bg-primary-container text-on-primary-container font-bold rounded-lg transition-all font-label-md text-label-md"
                  : "flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all font-label-md text-label-md"
              }
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-auto pt-stack-md">
        <button className="w-full border border-primary text-primary font-label-md text-label-md py-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">
            download
          </span>
          Download Forecast Data
        </button>
      </div>
    </aside>
  );
}
