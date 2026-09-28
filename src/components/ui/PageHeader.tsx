"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  index: string;
  title: string;
  emphasis?: string;
  description?: string;
}

export function PageHeader({ index, title, emphasis, description }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-warm-sand uppercase">
        [{index}]
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-obsidian md:text-4xl">
        {title}
        {emphasis ? (
          <>
            {" "}
            <span className="serif-emphasis">{emphasis}</span>
          </>
        ) : null}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-obsidian/70">
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
