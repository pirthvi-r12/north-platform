"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EVENTS = [
  "Client signed SOW on E-Signatures",
  "Milestone marked complete in Client Portal",
  "Stripe invoice #1042 paid",
  "Design pin added on Feedback Canvas",
  "New asset uploaded to Digital Asset Hub",
  "AI SOW draft generated for Northwind",
];

interface SaasActivityTickerProps {
  tone?: "dark" | "light";
}

export function SaasActivityTicker({ tone = "dark" }: SaasActivityTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % EVENTS.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-full px-5 py-3 ${
        tone === "dark"
          ? "border border-white/15 bg-white/10 backdrop-blur"
          : "border border-black/8 bg-white/70"
      }`}
    >
      <motion.span
        className="h-2 w-2 rounded-full bg-emerald-500"
        animate={{ scale: [1, 1.35, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      <p className="text-[10px] font-semibold uppercase tracking-wider text-warm-sand">Live</p>
      <div className="relative h-5 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={EVENTS[index]}
            className={`absolute inset-0 truncate text-sm ${
              tone === "dark" ? "text-soft-pearl/85" : "text-obsidian/80"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {EVENTS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
