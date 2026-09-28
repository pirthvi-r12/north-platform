"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Role } from "@prisma/client";
import { requireRoles } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

const roleSchema = z.enum(["ADMIN", "MANAGER", "DESIGNER", "CLIENT"]);

export async function listUsers() {
  await requireRoles(["ADMIN", "MANAGER"]);
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return users.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));
}

export async function updateUserRole(userId: string, role: Role) {
  const session = await requireRoles(["ADMIN"]);
  const parsed = roleSchema.safeParse(role);
  if (!parsed.success) {
    throw new Error("Invalid role");
  }
  if (userId === session.user.id && role !== "ADMIN") {
    throw new Error("You cannot demote your own admin account");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { role: parsed.data },
  });
  revalidatePath("/workspace/rbac");
  revalidatePath("/admin/users");
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
}) {
  await requireRoles(["ADMIN"]);
  const parsed = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      role: roleSchema,
    })
    .safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid user payload");
  }
  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      role: parsed.data.role,
      passwordHash,
    },
  });
  revalidatePath("/workspace/rbac");
}
