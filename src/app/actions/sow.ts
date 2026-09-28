"use server";

import { z } from "zod";
import { requireSession } from "@/lib/session";

const sowSchema = z.object({
  clientName: z.string().min(2),
  projectType: z.string().min(2),
  timelineWeeks: z.coerce.number().min(2).max(52),
  budgetRange: z.string().min(2),
  deliverables: z.string().min(10),
});

export interface SowDraft {
  title: string;
  overview: string;
  milestones: { title: string; durationWeeks: number }[];
  assumptions: string[];
}

export async function generateSowDraft(
  raw: z.infer<typeof sowSchema>,
): Promise<SowDraft> {
  await requireSession();
  const data = sowSchema.parse(raw);
  const chunk = Math.max(2, Math.floor(data.timelineWeeks / 4));
  return {
    title: `${data.clientName} — ${data.projectType} Scope of Work`,
    overview: `North will deliver a ${data.projectType.toLowerCase()} engagement for ${data.clientName} over ${data.timelineWeeks} weeks within ${data.budgetRange}. Primary deliverables: ${data.deliverables}`,
    milestones: [
      { title: "Discovery & alignment workshops", durationWeeks: chunk },
      { title: "Concept exploration & design direction", durationWeeks: chunk },
      { title: "Production & implementation", durationWeeks: chunk },
      { title: "QA, launch support & documentation", durationWeeks: chunk },
    ],
    assumptions: [
      "Client provides brand assets within 5 business days of kickoff.",
      "Two consolidated feedback rounds per milestone are included.",
      "Third-party licensing (fonts, stock) billed separately if required.",
    ],
  };
}
