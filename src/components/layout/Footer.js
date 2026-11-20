import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Surveillance", href: "/amr-map" },
      { label: "Global Map", href: "/amr-map" },
      { label: "Predictions", href: "/predictions" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "AMR Basics", href: "/learn" },
      { label: "Research Papers", href: "/learn" },
      { label: "WHO Guidelines", href: "/who-guidance" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div className="col-span-1 flex flex-col gap-4">
          <img
            alt="PATHOWATCH Logo"
            className="h-8 w-auto self-start filter grayscale opacity-70"
            src="/images/logo.png"
          />
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-4 max-w-xs">
            Medical surveillance platform for tracking and predicting
            antimicrobial resistance patterns.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="col-span-1">
            <h4 className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim font-bold mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-surface-variant dark:text-on-surface-variant font-body-sm text-body-sm hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 PATHOWATCH Surveillance Initiative. All rights reserved.
          </span>
          <span className="font-body-sm text-body-sm text-outline text-xs text-center md:text-right max-w-lg">
            Disclaimer: Data presented is for surveillance and informational
            purposes based on aggregated reporting. Not for individual
            clinical diagnosis.
          </span>
        </div>
      </div>
    </footer>
  );
}
