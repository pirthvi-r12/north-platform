import { requireRoles } from "@/lib/session";
import { ClientPortalModule } from "@/components/modules/ClientPortalModule";

export default async function ClientAreaPage() {
  await requireRoles(["CLIENT"]);
  return (
    <main className="min-h-screen bg-soft-pearl px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-warm-sand">Client area</p>
        <ClientPortalModule />
      </div>
    </main>
  );
}
