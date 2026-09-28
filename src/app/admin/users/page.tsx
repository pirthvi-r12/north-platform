import { requireRoles } from "@/lib/session";
import { RbacModule } from "@/components/modules/RbacModule";

export default async function AdminUsersPage() {
  await requireRoles(["ADMIN", "MANAGER"]);
  return (
    <main className="min-h-screen bg-soft-pearl px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-warm-sand">Administration</p>
        <RbacModule />
      </div>
    </main>
  );
}
