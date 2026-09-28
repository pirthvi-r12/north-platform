"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/actions/register";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/35";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
    };

    const result = await registerUser(payload);
    if (!result.success) {
      setLoading(false);
      setError(result.error);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: result.email,
      password: payload.password,
      redirect: false,
    });

    setLoading(false);
    if (signInResult?.error) {
      window.location.href = "/login";
      return;
    }
    window.location.href = "/workspace/showcase";
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <label className="block text-sm font-medium text-obsidian">
        Full name
        <input name="name" type="text" required minLength={2} autoComplete="name" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-obsidian">
        Email
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-obsidian">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
      </label>
      <label className="block text-sm font-medium text-obsidian">
        Confirm password
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
      </label>
      {error ? <p className="text-sm font-medium text-deep-red">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-deep-red py-3 text-sm font-bold text-soft-pearl disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>
      <p className="text-center text-sm text-obsidian/65">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-deep-red hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
