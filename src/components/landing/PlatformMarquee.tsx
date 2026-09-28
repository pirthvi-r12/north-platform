"use client";

import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/config/navigation";

const items = [...NAV_ITEMS, ...NAV_ITEMS];

export function PlatformMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-black/8 bg-obsidian py-5">
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, idx) => (
          <span
            key={`${item.slug}-${idx}`}
            className="inline-flex items-center gap-2 rounded-full border border-soft-pearl/15 bg-soft-pearl/5 px-4 py-2 text-xs font-medium text-soft-pearl"
          >
            <span className="font-mono text-[10px] text-warm-sand">{item.index}</span>
            {item.label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
