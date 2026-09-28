"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-warm-sand focus:ring-2 focus:ring-warm-sand/35";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password");
      return;
    }
    window.location.href = "/workspace/showcase";
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <label className="block text-sm font-medium text-obsidian">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </label>
      <label className="block text-sm font-medium text-obsidian">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          className={inputClass}
        />
      </label>
      {error ? <p className="text-sm font-medium text-deep-red">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-deep-red py-3 text-sm font-bold text-soft-pearl disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm text-obsidian/65">
        No account yet?{" "}
        <Link href="/signup" className="font-semibold text-deep-red hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
