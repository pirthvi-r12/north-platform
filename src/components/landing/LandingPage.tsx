"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedMetric } from "@/components/landing/AnimatedMetric";
import { FeatureCube } from "@/components/landing/FeatureCube";
import { PlatformMarquee } from "@/components/landing/PlatformMarquee";
import { SaasActivityTicker } from "@/components/landing/SaasActivityTicker";
import { SaasHeroDashboard } from "@/components/landing/SaasHeroDashboard";
import { SaasWorkflowAnimation } from "@/components/landing/SaasWorkflowAnimation";
import { OCTABOOT_FEATURES, PROCESS_STEPS } from "@/components/landing/landing-content";

interface LandingPageProps {
  isAuthenticated: boolean;
}

export function LandingPage({ isAuthenticated }: LandingPageProps) {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="bg-soft-pearl text-obsidian">
      {loading ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-soft-pearl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-3xl font-bold md:text-5xl">Are you ready?</p>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-soft-pearl/50">
            Loading experience
          </p>
          <button
            type="button"
            onClick={() => setLoading(false)}
            className="mt-10 text-xs uppercase tracking-widest text-warm-sand underline-offset-4 hover:underline"
          >
            Skip
          </button>
        </motion.div>
      ) : null}

      <header className="fixed top-0 z-40 w-full border-b border-black/6 bg-soft-pearl/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-xl text-warm-sand">
            NORTH®
          </Link>
          <p className="hidden text-xs uppercase tracking-[0.2em] text-obsidian/50 sm:block">
            Digital experience studio
          </p>
          <Link
            href={isAuthenticated ? "/workspace/showcase" : "/signup"}
            className="rounded-full bg-deep-red px-5 py-2 text-xs font-bold uppercase tracking-wider text-soft-pearl"
          >
            {isAuthenticated ? "Enter workspace" : "Start your project"}
          </Link>
        </div>
      </header>

      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative overflow-hidden bg-obsidian px-6 pb-16 pt-28 text-soft-pearl md:pb-20 md:pt-32"
      >
        <motion.div
          className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-deep-red/25 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-warm-sand/20 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-warm-sand">NORTH® Studio</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              WEBSITES TO REMEMBER
            </h1>
            <p className="mt-8 max-w-xl text-lg text-soft-pearl/70">
              A clearer <span className="serif-emphasis text-warm-sand">way forward</span> for brands
              that refuse to blend in — powered by a full client SaaS workspace.
            </p>
            <SaasActivityTicker />
          </div>
          <SaasHeroDashboard />
        </div>
      </motion.section>

      <PlatformMarquee />

      <section className="border-b border-black/8 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-warm-sand">The problem</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            you&apos;re selling words, not <span className="serif-emphasis">emotions.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-obsidian/70">
            Most sites explain what you do. Few make people feel why it matters. That gap is where
            attention, trust, and conversion die quietly.
          </p>
        </div>
      </section>

      <section className="bg-deep-red px-6 py-24 text-soft-pearl">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold md:text-6xl">We don&apos;t build websites.</h2>
          <p className="mt-4 text-xl text-soft-pearl/80 md:text-2xl">
            We build memory — and the SaaS platform that delivers it from kickoff to invoice.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <AnimatedMetric label="Monthly revenue tracked" value={67} prefix="$" suffix="k" />
            <AnimatedMetric label="Active client projects" value={24} />
            <AnimatedMetric label="Milestones shipped / month" value={8} />
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-warm-sand">
            Agency operating system
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            From onboarding to billing — <span className="serif-emphasis">one animated pipeline.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-obsidian/70">
            NORTH® connects client intake, AI scope drafts, e-signatures, milestone tracking, visual
            feedback, and Stripe invoices in a single workspace your team and clients actually use.
          </p>
          <SaasWorkflowAnimation />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            4 ways to make your brand impossible to ignore.
          </h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {OCTABOOT_FEATURES.map((feature, idx) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="glass-panel group rounded-3xl p-8 transition hover:-translate-y-1"
              >
                <p className="font-mono text-xs text-warm-sand">{feature.index}</p>
                <h3 className="mt-3 text-2xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-obsidian/70">{feature.description}</p>
                <div className="mt-6 h-1 w-12 rounded-full bg-deep-red transition-all group-hover:w-20" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/8 bg-white/40 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-warm-sand">Process</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Your time is valuable. So is ours.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-2xl border border-black/8 bg-soft-pearl p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-deep-red">
                  Step {idx + 1}
                </p>
                <p className="mt-2 text-sm font-bold uppercase leading-snug">{step.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-obsidian/65">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Here&apos;s a cube to play with. Because why not?
          </h2>
          <p className="mt-3 text-sm text-obsidian/60">Drag it — motion is part of the story.</p>
          <FeatureCube />
        </div>
      </section>

      <section className="bg-obsidian px-6 py-24 text-soft-pearl">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Not for everyone. Only for brands ready to stand out.
          </h2>
          <p className="mt-6 text-lg text-soft-pearl/70">
            If you want a basic website, we are not the right studio. If you want people to remember
            your brand, let&apos;s talk.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={isAuthenticated ? "/workspace/onboarding" : "/signup"}
              className="rounded-full bg-deep-red px-8 py-3 text-sm font-bold uppercase tracking-wider"
            >
              Start your project
            </Link>
            <Link
              href={
                isAuthenticated
                  ? "/workspace/cost-estimator"
                  : "/signup?callbackUrl=/workspace/cost-estimator"
              }
              className="rounded-full border border-soft-pearl/25 px-8 py-3 text-sm font-semibold uppercase tracking-wider"
            >
              Estimate scope
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/8 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-2xl text-warm-sand">NORTH®</p>
            <p className="mt-1 text-sm text-obsidian/60">Premium digital experience studio</p>
          </div>
          <div className="flex flex-col gap-2 text-sm md:items-end">
            <a href="mailto:hello@north.studio" className="hover:text-deep-red">
              hello@north.studio
            </a>
            <Link href="/signup" className="hover:text-deep-red">
              Create account
            </Link>
            <Link href="/login" className="hover:text-deep-red">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
