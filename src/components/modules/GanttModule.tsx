"use client";

import { PageHeader } from "@/components/ui/PageHeader";

const rows = [
  { name: "Discovery", start: 0, width: 20, color: "#B38F6F" },
  { name: "Identity design", start: 18, width: 28, color: "#710014" },
  { name: "Web production", start: 40, width: 30, color: "#0A0A0A" },
  { name: "Launch & QA", start: 68, width: 22, color: "#B38F6F" },
];

export function GanttModule() {
  return (
    <div>
      <PageHeader
        index="12"
        title="Interactive Gantt Timeline"
        emphasis="mapped."
        description="Deliverables, review cycles, and launch targets on one timeline."
      />
      <div className="glass-panel overflow-x-auto rounded-2xl p-6">
        <div className="min-w-[720px]">
          <div className="mb-4 grid grid-cols-12 text-xs uppercase tracking-wider text-warm-sand">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>W{i + 1}</span>
            ))}
          </div>
          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row.name} className="grid grid-cols-[160px_1fr] items-center gap-4">
                <p className="text-sm font-medium">{row.name}</p>
                <div className="relative h-8 rounded-lg bg-black/5">
                  <div
                    className="absolute top-1 h-6 rounded-md"
                    style={{
                      left: `${row.start}%`,
                      width: `${row.width}%`,
                      backgroundColor: row.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-obsidian/60">
            Target launch: <span className="font-semibold text-deep-red">November 30, 2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}
