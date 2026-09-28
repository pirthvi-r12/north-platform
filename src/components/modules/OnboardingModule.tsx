"use client";

import { useState, useTransition } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { submitOnboarding } from "@/app/actions/onboarding";

const steps = ["Company", "Brand", "Assets", "Goals"];

export function OnboardingModule() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      await submitOnboarding({
        companyName: String(formData.get("companyName") ?? ""),
        contactEmail: String(formData.get("contactEmail") ?? ""),
        brandVoice: String(formData.get("brandVoice") ?? ""),
        competitors: String(formData.get("competitors") ?? ""),
        assetLinks: String(formData.get("assetLinks") ?? ""),
        goals: String(formData.get("goals") ?? ""),
      });
      setDone(true);
    });
  }

  return (
    <div>
      <PageHeader
        index="11"
        title="Client Onboarding Wizard"
        emphasis="from day one."
        description="Collect brand context, assets, and strategic goals in a guided flow."
      />
      <form action={onSubmit} className="glass-panel max-w-2xl rounded-2xl p-6">
        <div className="mb-6 flex gap-2">
          {steps.map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(idx)}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold uppercase ${
                step === idx ? "bg-deep-red text-soft-pearl" : "bg-black/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {step === 0 ? (
          <div className="space-y-3">
            <input name="companyName" required placeholder="Company name" className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm" />
            <input name="contactEmail" required type="email" placeholder="Contact email" className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm" />
          </div>
        ) : null}
        {step === 1 ? (
          <div className="space-y-3">
            <input name="brandVoice" required placeholder="Brand voice (e.g. refined, warm)" className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm" />
            <input name="competitors" placeholder="Key competitors" className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm" />
          </div>
        ) : null}
        {step === 2 ? (
          <textarea
            name="assetLinks"
            rows={4}
            placeholder="Links to logos, guidelines, photography"
            className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm"
          />
        ) : null}
        {step === 3 ? (
          <textarea
            name="goals"
            required
            rows={5}
            placeholder="Primary business and design goals"
            className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm"
          />
        ) : null}

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="rounded-lg bg-obsidian px-4 py-2 text-sm font-semibold text-soft-pearl"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-deep-red px-4 py-2 text-sm font-semibold text-soft-pearl"
            >
              {pending ? "Submitting…" : "Complete onboarding"}
            </button>
          )}
        </div>
        {done ? (
          <p className="mt-4 text-sm font-medium text-deep-red">
            Onboarding submitted. Your team will review within one business day.
          </p>
        ) : null}
      </form>
    </div>
  );
}
