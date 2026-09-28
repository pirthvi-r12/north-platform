import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/workspace/showcase");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-soft-pearl px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-black/6 bg-white p-10 shadow-[0_24px_80px_rgba(113,0,20,0.08)]">
        <p className="font-serif text-2xl tracking-wide text-warm-sand">
          NORTH®
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-obsidian md:text-[2rem]">
          Sign in for a clearer <span className="serif-emphasis">way forward.</span>
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
