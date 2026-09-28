"use server";

import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { demoCaseStudies } from "@/lib/demo-data";

export async function listCaseStudies(category?: string) {
  await requireSession();
  try {
    const items = await prisma.caseStudy.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });
    const mapped = items.map((c) => ({
      id: c.id,
      title: c.title,
      slug: c.slug,
      category: c.category,
      clientName: c.clientName,
      coverImage: c.coverImage,
      contentJson: c.contentJson as Record<string, unknown>,
    }));
    type CaseStudyRow = (typeof demoCaseStudies)[number];
    const bySlug = new Map<string, CaseStudyRow>(
      demoCaseStudies.map((d) => [d.slug, d]),
    );
    for (const item of mapped) {
      const demoEntry = demoCaseStudies.find((d) => d.slug === item.slug);
      bySlug.set(item.slug, {
        ...item,
        coverImage: demoEntry?.coverImage ?? item.coverImage,
        contentJson: (demoEntry?.contentJson ?? item.contentJson) as CaseStudyRow["contentJson"],
      });
    }
    const merged = Array.from(bySlug.values());
    return merged.filter((c) => (category ? c.category === category : true));
  } catch {
    /* fallback */
  }
  return demoCaseStudies.filter((c) => (category ? c.category === category : true));
}
