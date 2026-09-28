import { Sidebar } from "@/components/layout/Sidebar";
import { requireSession } from "@/lib/session";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <div className="min-h-screen bg-soft-pearl">
      <Sidebar userName={session.user.name} userRole={session.user.role} />
      <main className="ml-[280px] min-h-screen px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
