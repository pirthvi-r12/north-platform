"use client";

import { motion } from "framer-motion";

const bars = [42, 58, 48, 72, 66, 84, 78];

export function SaasHeroDashboard() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-xl lg:mt-0 lg:max-w-none">
      <motion.div
        className="absolute -left-6 top-8 z-10 hidden rounded-2xl border border-black/10 bg-white/90 p-3 shadow-lg backdrop-blur md:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-[10px] uppercase tracking-wider text-warm-sand">Invoice paid</p>
        <p className="text-lg font-bold text-deep-red">$12,000</p>
      </motion.div>

      <motion.div
        className="absolute -right-4 top-24 z-10 hidden rounded-2xl border border-black/10 bg-obsidian p-3 text-soft-pearl shadow-lg md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <p className="text-[10px] uppercase tracking-wider text-warm-sand">New feedback pin</p>
        <p className="text-xs">Visual canvas · 2m ago</p>
      </motion.div>

      <motion.div
        className="overflow-hidden rounded-3xl border border-white/10 bg-soft-pearl/95 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
        initial={{ opacity: 0, y: 32, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 border-b border-black/8 bg-white/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-deep-red/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-warm-sand" />
          <span className="h-2.5 w-2.5 rounded-full bg-obsidian/30" />
          <p className="ml-2 text-xs font-semibold text-obsidian/60">NORTH® Workspace</p>
        </div>

        <div className="grid grid-cols-[88px_1fr]">
          <div className="space-y-2 border-r border-black/8 bg-obsidian p-3">
            {["01", "06", "10", "13"].map((id, i) => (
              <motion.div
                key={id}
                className={`rounded-lg px-2 py-1.5 text-[10px] font-medium ${
                  i === 0 ? "bg-deep-red text-soft-pearl" : "text-soft-pearl/65"
                }`}
                animate={i === 0 ? { opacity: [1, 0.75, 1] } : undefined}
                transition={{ duration: 2, repeat: Infinity }}
              >
                [{id}]
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 p-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "MRR", value: "$67k" },
                { label: "Projects", value: "24" },
                { label: "Velocity", value: "8/wk" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-black/8 bg-white/80 p-2">
                  <p className="text-[9px] uppercase tracking-wider text-warm-sand">{stat.label}</p>
                  <p className="text-sm font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-black/8 bg-white/80 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold">Acme Rebrand</span>
                <span className="text-deep-red">62%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/8">
                <motion.div
                  className="h-full bg-deep-red"
                  initial={{ width: "20%" }}
                  animate={{ width: ["38%", "62%", "58%", "62%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            <div className="flex h-24 items-end gap-1.5 rounded-xl border border-black/8 bg-white/80 p-3">
              {bars.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-warm-sand/80"
                  initial={{ height: "20%" }}
                  animate={{ height: [`${height - 12}%`, `${height}%`, `${height - 8}%`] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
