"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedMetricProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedMetric({ label, value, prefix = "", suffix = "" }: AnimatedMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-soft-pearl/20 bg-soft-pearl/95 px-5 py-4 text-obsidian">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-warm-sand">{label}</p>
      <motion.p className="mt-1 text-2xl font-bold text-deep-red">{display}</motion.p>
    </div>
  );
}
