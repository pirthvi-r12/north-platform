import type { Role } from "@prisma/client";

export const ADMIN_ROLES: Role[] = ["ADMIN", "MANAGER"];
export const STAFF_ROLES: Role[] = ["ADMIN", "MANAGER", "DESIGNER"];

export function canAccessAdmin(role: Role): boolean {
  return ADMIN_ROLES.includes(role);
}

export function canAccessClientPortal(role: Role): boolean {
  return role === "CLIENT" || STAFF_ROLES.includes(role);
}

export function canManageUsers(role: Role): boolean {
  return role === "ADMIN";
}

export function roleLabel(role: Role): string {
  const labels: Record<Role, string> = {
    ADMIN: "Administrator",
    MANAGER: "Manager",
    DESIGNER: "Designer",
    CLIENT: "Client",
  };
  return labels[role];
}
