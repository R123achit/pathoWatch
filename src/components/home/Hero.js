import Link from "next/link";

const PIPELINE_STEPS = [
  { icon: "local_hospital", label: "Healthcare\nData Sources", style: "white" },
  { icon: "logo", label: "PathoWatch", style: "brand" },
  { icon: "memory", label: "AI/ML\nAnalysis", style: "white" },
  { icon: "warning", label: "Early\nWarning", style: "alert" },
];

export default function Hero() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
      <div className="flex flex-col gap-stack-md">
        <h1 className="font-display-lg text-display-lg text-primary">
          Early Warning for Antimicrobial Resistance
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Transforming clinical surveillance data into actionable insights.
          PathoWatch aggregates, analyzes, and visualizes AMR patterns to
          empower public health decisions and rapid response.
        </p>
        <div className="flex gap-4 mt-stack-sm flex-wrap">
          <Link
            href="/amr-map"
            className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-3 rounded shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Explore AMR Data
            <span aria-hidden="true" className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
          <Link
            href="/amr-near-me"
            className="bg-surface border border-primary text-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-surface-variant transition-colors flex items-center gap-2"
          >
            Check My Area
            <span aria-hidden="true" className="material-symbols-outlined text-sm">
              location_on
            </span>
          </Link>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant rounded-xl p-stack-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center font-label-md text-secondary mb-8 absolute top-4 left-4">
          Surveillance Data Pipeline
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          {PIPELINE_STEPS.map((step, idx) => (
            <div key={step.label} className="contents">
              <div className="flex flex-col items-center z-10">
                {step.style === "brand" ? (
                  <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
                    <img
                      alt="Logo"
                      className="w-12 h-12 object-contain filter invert opacity-80"
                      src="/images/logo.png"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm border ${
                      step.style === "alert"
                        ? "bg-error-container text-on-error-container border-error-container"
                        : "bg-white border-outline"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        step.style === "alert" ? "" : "text-primary"
                      }`}
                    >
                      {step.icon}
                    </span>
                  </div>
                )}
                <span
                  className={`font-label-md text-label-md mt-2 text-center whitespace-pre-line ${
                    step.style === "brand"
                      ? "text-primary font-bold"
                      : "text-xs"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="h-8 w-1 md:h-1 md:w-8 bg-outline-variant z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
