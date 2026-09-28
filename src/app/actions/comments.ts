"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const commentSchema = z.object({
  projectId: z.string().min(1),
  commentText: z.string().min(1).max(2000),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
});

export async function addDesignComment(input: z.infer<typeof commentSchema>) {
  const session = await requireSession();
  const parsed = commentSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid comment");
  }
  const { projectId, commentText, x, y } = parsed.data;
  await prisma.designComment.create({
    data: {
      projectId,
      authorId: session.user.id,
      commentText,
      canvasCoordinatesJson: { x, y },
    },
  });
  revalidatePath("/workspace/feedback-canvas");
}

export async function listDesignComments(projectId: string) {
  await requireSession();
  try {
    const comments = await prisma.designComment.findMany({
      where: { projectId },
      include: { author: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return comments.map((c) => ({
      id: c.id,
      commentText: c.commentText,
      x: (c.canvasCoordinatesJson as { x: number }).x,
      y: (c.canvasCoordinatesJson as { y: number }).y,
      author: c.author.name ?? c.author.email,
    }));
  } catch {
    return [];
  }
}
