"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "AMR Near Me", href: "/amr-near-me" },
  { label: "AMR Map", href: "/amr-map" },
  { label: "Predictions", href: "/predictions" },
  { label: "Learn About AMR", href: "/learn" },
  { label: "WHO Guidance", href: "/who-guidance" },
];

export default function Navbar({ activePath = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-surface dark:bg-surface-container-highest border-b border-outline-variant dark:border-outline sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
        <Link href="/" className="flex items-center gap-4">
          <img
            alt="PATHOWATCH Logo"
            className="h-10 w-auto"
            src="/images/logo.png"
          />
          <span className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed-dim hidden md:inline">
            PATHOWATCH
          </span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activePath;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1 font-bold font-label-md text-label-md transition-colors duration-200"
                    : "text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center">
          <button
            className="md:hidden text-on-surface p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-1 px-margin-mobile pb-4 border-t border-outline-variant">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-surface-variant text-body-md py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
