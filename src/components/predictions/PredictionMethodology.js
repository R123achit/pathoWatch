import { PREDICTION_STEPS, MODEL_TRANSPARENCY } from "@/lib/mockPredictions";

export default function PredictionMethodology() {
  return (
    <div
      id="methodology"
      className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-stack-lg"
    >
      <section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
          How Predictions Work
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-6">
          {PREDICTION_STEPS.map((step, idx) => (
            <div key={step.label} className="contents">
              <div className="flex flex-col items-center text-center max-w-[120px]">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.active
                      ? "bg-primary-container text-on-primary-container shadow-sm"
                      : "bg-surface-container-high text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {step.icon}
                  </span>
                </div>
                <span
                  className={
                    step.active
                      ? "font-label-md text-[12px] text-on-surface font-bold"
                      : "font-label-md text-[12px] text-secondary"
                  }
                >
                  {step.label}
                </span>
              </div>
              {idx < PREDICTION_STEPS.length - 1 && (
                <span className="material-symbols-outlined text-outline-variant hidden md:block">
                  arrow_forward
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
          Model Transparency
        </h2>
        <ul className="space-y-3 font-body-sm text-body-sm text-secondary">
          {MODEL_TRANSPARENCY.map((row) => (
            <li
              key={row.label}
              className="flex justify-between border-b border-outline-variant pb-2"
            >
              <span>{row.label}</span>
              <span className="font-bold text-on-surface">{row.value}</span>
            </li>
          ))}
        </ul>
        <p className="font-code-sm text-code-sm text-outline mt-4 bg-surface-container p-3 rounded-lg">
          Note: Confidence intervals widen significantly beyond 30 days.
          Predictions are directional, not absolute.
        </p>
      </section>
    </div>
  );
}
