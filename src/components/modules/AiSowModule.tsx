"use client";

import { useState, useTransition } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { generateSowDraft, type SowDraft } from "@/app/actions/sow";

export function AiSowModule() {
  const [draft, setDraft] = useState<SowDraft | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await generateSowDraft({
        clientName: String(formData.get("clientName") ?? ""),
        projectType: String(formData.get("projectType") ?? ""),
        timelineWeeks: Number(formData.get("timelineWeeks") ?? 8),
        budgetRange: String(formData.get("budgetRange") ?? ""),
        deliverables: String(formData.get("deliverables") ?? ""),
      });
      setDraft(result);
    });
  }

  return (
    <div>
      <PageHeader
        index="04"
        title="AI SOW Generator"
        emphasis="structured scope."
        description="Transform intake details into milestone-based Scope of Work drafts."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <form action={onSubmit} className="glass-panel space-y-4 rounded-2xl p-6">
          {[
            ["clientName", "Client name"],
            ["projectType", "Project type"],
            ["timelineWeeks", "Timeline (weeks)"],
            ["budgetRange", "Budget range"],
          ].map(([name, label]) => (
            <label key={name} className="block text-sm">
              {label}
              <input
                name={name}
                required
                defaultValue={name === "timelineWeeks" ? "12" : undefined}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2"
              />
            </label>
          ))}
          <label className="block text-sm">
            Deliverables
            <textarea
              name="deliverables"
              required
              rows={4}
              className="mt-1 w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2"
              defaultValue="Brand identity, website design system, launch assets"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-deep-red px-4 py-2 text-sm font-semibold text-soft-pearl disabled:opacity-60"
          >
            {pending ? "Generating…" : "Generate SOW"}
          </button>
        </form>

        <div className="glass-panel rounded-2xl p-6">
          {draft ? (
            <div className="space-y-4 text-sm">
              <h3 className="text-xl font-bold">{draft.title}</h3>
              <p className="text-obsidian/75">{draft.overview}</p>
              <div>
                <p className="font-semibold">Milestones</p>
                <ul className="mt-2 space-y-2">
                  {draft.milestones.map((m) => (
                    <li key={m.title} className="rounded-lg border border-black/8 px-3 py-2">
                      {m.title} — {m.durationWeeks} weeks
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold">Assumptions</p>
                <ul className="mt-2 list-disc pl-5">
                  {draft.assumptions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-obsidian/60">Submit the form to preview a structured SOW draft.</p>
          )}
        </div>
      </div>
    </div>
  );
}
