import { auth } from "@/lib/auth";
import type { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  return session;
}

export async function requireRoles(allowed: Role[]) {
  const session = await requireSession();
  if (!allowed.includes(session.user.role)) {
    redirect("/workspace/showcase");
  }
  return session;
}

export async function getOptionalSession() {
  return auth();
}
