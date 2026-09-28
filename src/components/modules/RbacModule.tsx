"use client";

import { useEffect, useState, useTransition } from "react";
import type { Role } from "@prisma/client";
import { PageHeader } from "@/components/ui/PageHeader";
import { createUser, listUsers, updateUserRole } from "@/app/actions/users";
import { roleLabel } from "@/lib/rbac";

type UserRow = Awaited<ReturnType<typeof listUsers>>[number];

const roles: Role[] = ["ADMIN", "MANAGER", "DESIGNER", "CLIENT"];

export function RbacModule() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function refresh() {
    listUsers()
      .then(setUsers)
      .catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    refresh();
  }, []);

  function onCreate(formData: FormData) {
    startTransition(async () => {
      try {
        await createUser({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          password: String(formData.get("password") ?? ""),
          role: String(formData.get("role") ?? "CLIENT") as Role,
        });
        refresh();
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unable to create user");
      }
    });
  }

  function onRoleChange(userId: string, role: Role) {
    startTransition(async () => {
      try {
        await updateUserRole(userId, role);
        refresh();
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unable to update role");
      }
    });
  }

  return (
    <div>
      <PageHeader
        index="15"
        title="RBAC User Management"
        emphasis="governed access."
        description="Assign roles and manage permissions across the NORTH® workspace."
      />
      {error ? <p className="mb-4 text-sm text-deep-red">{error}</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="overflow-hidden rounded-2xl border border-black/8 bg-white/50">
          <table className="min-w-full text-sm">
            <thead className="bg-soft-pearl text-left text-xs uppercase tracking-wider text-warm-sand">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-black/8">
                  <td className="px-4 py-3">{user.name ?? "—"}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      disabled={pending}
                      onChange={(e) => onRoleChange(user.id, e.target.value as Role)}
                      className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {roleLabel(role)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form action={onCreate} className="glass-panel space-y-3 rounded-2xl p-5">
          <h3 className="font-bold">Create user</h3>
          <input name="name" required placeholder="Full name" className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm" />
          <input name="email" required type="email" placeholder="Email" className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm" />
          <input
            name="password"
            required
            type="password"
            minLength={8}
            placeholder="Temporary password"
            className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm"
          />
          <select name="role" defaultValue="CLIENT" className="w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm">
            {roles.map((role) => (
              <option key={role} value={role}>
                {roleLabel(role)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-deep-red py-2 text-sm font-semibold text-soft-pearl"
          >
            Add user
          </button>
        </form>
      </div>
    </div>
  );
}
