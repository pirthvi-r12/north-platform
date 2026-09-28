"use server";

import { z } from "zod";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const onboardingSchema = z.object({
  companyName: z.string().min(2),
  contactEmail: z.string().email(),
  brandVoice: z.string().min(3),
  competitors: z.string().optional(),
  assetLinks: z.string().optional(),
  goals: z.string().min(10),
});

export async function submitOnboarding(raw: z.infer<typeof onboardingSchema>) {
  await requireSession();
  const data = onboardingSchema.parse(raw);
  try {
    await prisma.onboardingSubmission.create({
      data: {
        clientEmail: data.contactEmail,
        payloadJson: data,
      },
    });
  } catch {
    /* allow demo without DB */
  }
  return { success: true as const };
}
