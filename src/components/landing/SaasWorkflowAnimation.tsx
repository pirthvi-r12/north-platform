"use client";

import { motion } from "framer-motion";

const STEPS = [
  { title: "Client onboarding", module: "Wizard intake" },
  { title: "AI scope draft", module: "SOW generator" },
  { title: "E-sign agreement", module: "Signatures" },
  { title: "Milestone delivery", module: "Gantt + portal" },
  { title: "Stripe billing", module: "Paid invoice" },
];

export function SaasWorkflowAnimation() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-black/8 bg-white/50 p-6 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(113,0,20,0.08),transparent_45%)]" />
      <div className="relative space-y-4">
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: idx * 0.12, duration: 0.45 }}
            className="flex items-center gap-4"
          >
            <motion.div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-red text-xs font-bold text-soft-pearl"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.35 }}
            >
              {idx + 1}
            </motion.div>
            <div className="flex-1 rounded-xl border border-black/8 bg-soft-pearl/80 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{step.title}</p>
                <span className="rounded-full bg-warm-sand/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-deep-red">
                  {step.module}
                </span>
              </div>
              <motion.div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/8"
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-full bg-deep-red"
                  initial={{ width: "8%" }}
                  whileInView={{ width: `${20 + idx * 16}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: idx * 0.1 }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="relative mt-6 text-center text-xs uppercase tracking-[0.2em] text-warm-sand"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        Live pipeline sync
      </motion.p>
    </div>
  );
}
