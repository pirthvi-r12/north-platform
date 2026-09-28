"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const serviceRates: Record<string, number> = {
  branding: 8500,
  web: 12000,
  product: 15000,
  motion: 6000,
};

export function CostEstimatorModule() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<string[]>(["branding"]);
  const [weeks, setWeeks] = useState(8);
  const [rush, setRush] = useState(false);

  const total = useMemo(() => {
    const base = services.reduce((sum, s) => sum + (serviceRates[s] ?? 0), 0);
    const timelineMultiplier = 1 + Math.max(0, weeks - 8) * 0.04;
    const rushMultiplier = rush ? 1.2 : 1;
    return Math.round(base * timelineMultiplier * rushMultiplier);
  }, [services, weeks, rush]);

  function toggleService(key: string) {
    setServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key],
    );
  }

  function downloadPdf() {
    const lines = [
      "NORTH® Cost Estimate",
      `Services: ${services.join(", ")}`,
      `Timeline: ${weeks} weeks`,
      `Rush: ${rush ? "Yes" : "No"}`,
      `Estimated total: $${total.toLocaleString()}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "north-estimate.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        index="03"
        title="Cost Estimator"
        emphasis="with clarity."
        description="Multi-step pricing calculator with dynamic totals and exportable client summary."
      />
      <div className="glass-panel max-w-3xl rounded-2xl p-6">
        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full ${step >= n ? "bg-deep-red" : "bg-black/10"}`}
            />
          ))}
        </div>

        {step === 1 ? (
          <div className="space-y-3">
            <h3 className="font-bold">Select services</h3>
            {Object.keys(serviceRates).map((key) => (
              <label key={key} className="flex items-center justify-between rounded-xl border border-black/8 px-4 py-3 text-sm">
                <span className="capitalize">{key}</span>
                <input
                  type="checkbox"
                  checked={services.includes(key)}
                  onChange={() => toggleService(key)}
                  className="accent-deep-red"
                />
              </label>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <h3 className="font-bold">Timeline & delivery</h3>
            <label className="block text-sm">
              Duration (weeks): {weeks}
              <input
                type="range"
                min={4}
                max={20}
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="mt-2 w-full accent-deep-red"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} />
              Rush delivery (+20%)
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <h3 className="font-bold">Estimate summary</h3>
            <p className="mt-4 text-4xl font-bold text-deep-red">${total.toLocaleString()}</p>
            <p className="mt-2 text-sm text-obsidian/60">
              Includes selected services, timeline adjustment, and rush factor.
            </p>
            <button
              type="button"
              onClick={downloadPdf}
              className="mt-6 rounded-xl bg-obsidian px-4 py-2 text-sm font-semibold text-soft-pearl"
            >
              Download client summary
            </button>
          </div>
        ) : null}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-lg border border-black/10 px-4 py-2 text-sm disabled:opacity-40"
          >
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="rounded-lg bg-deep-red px-4 py-2 text-sm font-semibold text-soft-pearl"
            >
              Continue
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
