"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { demoMilestones } from "@/lib/demo-data";

export async function getProjectOverview() {
  const session = await requireSession();
  try {
    const project = await prisma.project.findFirst({
      where:
        session.user.role === "CLIENT"
          ? { clientId: session.user.id }
          : undefined,
      include: {
        milestones: { orderBy: { sortOrder: "asc" } },
        client: { select: { name: true, email: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
    if (project) {
      return {
        project: {
          id: project.id,
          title: project.title,
          progress: project.progress,
          status: project.status,
          clientName: project.client.name ?? project.client.email,
        },
        milestones: project.milestones.map((m) => ({
          id: m.id,
          title: m.title,
          isCompleted: m.isCompleted,
          dueDate: m.dueDate?.toISOString().slice(0, 10) ?? "",
        })),
      };
    }
  } catch {
    /* database optional during local UI dev */
  }
  return {
    project: {
      id: "demo",
      title: "Acme Rebrand 2026",
      progress: 62,
      status: "DESIGN",
      clientName: "Acme Corp",
    },
    milestones: demoMilestones,
  };
}

export async function toggleMilestone(milestoneId: string, completed: boolean) {
  const session = await requireSession();
  if (session.user.role === "CLIENT") {
    throw new Error("Clients cannot modify milestones");
  }
  await prisma.milestone.update({
    where: { id: milestoneId },
    data: { isCompleted: completed },
  });
  revalidatePath("/workspace/client-portal");
}
