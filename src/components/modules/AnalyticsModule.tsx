"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";

const mrr = [42, 48, 51, 55, 58, 63, 67];
const velocity = [3, 4, 5, 4, 6, 7, 8];
const pipeline = [
  { stage: "Discovery", value: 24 },
  { stage: "Proposal", value: 18 },
  { stage: "Closed", value: 12 },
];

const CHART_HEIGHT = 192;

export function AnalyticsModule() {
  const maxMrr = Math.max(...mrr);

  return (
    <div>
      <PageHeader
        index="10"
        title="Analytics Dashboard"
        emphasis="momentum."
        description="Revenue, delivery velocity, and pipeline conversion at a glance."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-bold">MRR (USD thousands)</h3>
          <div className="mt-6 flex items-end gap-3" style={{ height: CHART_HEIGHT }}>
            {mrr.map((value, idx) => {
              const barHeight = Math.round((value / maxMrr) * (CHART_HEIGHT - 24));
              return (
                <div
                  key={`mrr-${idx}`}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-[10px] font-semibold text-deep-red">{value}k</span>
                  <motion.div
                    className="w-full rounded-t-lg bg-deep-red/90"
                    initial={{ height: 0 }}
                    animate={{ height: barHeight }}
                    transition={{ delay: idx * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="text-[10px] text-obsidian/50">M{idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <h3 className="font-bold">Project velocity</h3>
          <motion.p
            className="mt-2 text-4xl font-bold text-deep-red"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {velocity[velocity.length - 1]}
          </motion.p>
          <p className="text-sm text-obsidian/60">Shipped milestones this month</p>
          <ul className="mt-4 space-y-2 text-sm">
            {velocity.map((v, i) => (
              <li key={i} className="flex justify-between">
                <span>Week {i + 1}</span>
                <span className="font-semibold">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel rounded-2xl p-5 lg:col-span-3">
          <h3 className="font-bold">Pipeline conversion</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {pipeline.map((row, idx) => (
              <div key={row.stage} className="rounded-xl border border-black/8 p-4">
                <p className="text-xs uppercase tracking-wider text-warm-sand">{row.stage}</p>
                <p className="mt-1 text-2xl font-bold">{row.value}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/8">
                  <motion.div
                    className="h-2 rounded-full bg-warm-sand"
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.value / 24) * 100}%` }}
                    transition={{ delay: 0.2 + idx * 0.15, duration: 0.7 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
