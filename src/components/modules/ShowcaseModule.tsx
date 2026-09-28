"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { SafeImage } from "@/components/ui/SafeImage";
import { listCaseStudies } from "@/app/actions/case-studies";

type CaseStudy = Awaited<ReturnType<typeof listCaseStudies>>[number];

export function ShowcaseModule() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  useEffect(() => {
    listCaseStudies().then(setItems);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );

  const filtered = items.filter((i) => category === "All" || i.category === category);

  return (
    <div>
      <PageHeader
        index="01"
        title="Showcase"
        emphasis="selected work."
        description="Filter case studies and inspect outcomes, metrics, and prototype notes."
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
              category === cat
                ? "bg-deep-red text-soft-pearl"
                : "glass-panel text-obsidian/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            layout
            whileHover={{ y: -4 }}
            onClick={() => setSelected(item)}
            className="arch-frame glass-panel text-left"
          >
            <div className="relative h-56 w-full">
              <SafeImage
                src={item.coverImage}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wider text-warm-sand">{item.category}</p>
              <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-obsidian/60">{item.clientName}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-obsidian/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.aside
              className="fixed top-0 right-0 z-50 h-full w-full max-w-md overflow-y-auto bg-soft-pearl p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <button
                type="button"
                className="text-sm font-semibold text-deep-red"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
              <div className="arch-frame relative mt-4 h-64 w-full">
                <SafeImage
                  src={selected.coverImage}
                  alt={selected.title}
                  fill
                  className="object-cover"
                  sizes="448px"
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold">{selected.title}</h2>
              <p className="mt-2 text-sm text-obsidian/70">
                {(selected.contentJson as { summary?: string }).summary}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {Object.entries(
                  ((selected.contentJson as { metrics?: Record<string, string> }).metrics ??
                    {}) as Record<string, string>,
                ).map(([key, value]) => (
                  <div key={key} className="glass-panel rounded-xl p-3">
                    <p className="text-xs uppercase text-warm-sand">{key}</p>
                    <p className="text-lg font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
