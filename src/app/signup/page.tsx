import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignupForm } from "@/components/auth/SignupForm";

export default async function SignupPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/workspace/showcase");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-soft-pearl px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-black/6 bg-white p-10 shadow-[0_24px_80px_rgba(113,0,20,0.08)]">
        <Link href="/" className="font-serif text-2xl tracking-wide text-warm-sand">
          NORTH®
        </Link>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-obsidian md:text-[2rem]">
          Create your <span className="serif-emphasis">workspace account.</span>
        </h1>
        <p className="mt-2 text-sm text-obsidian/60">
          Register first, then sign in anytime. The first account becomes administrator.
        </p>
        <SignupForm />
      </div>
    </main>
  );
}
