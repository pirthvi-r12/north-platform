"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjectOverview } from "@/app/actions/projects";
import { ClientPrototypeEmbed } from "@/components/modules/ClientPrototypeEmbed";

export function ClientPortalModule() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getProjectOverview>> | null>(null);
  const [tasks, setTasks] = useState([
    { id: "t1", label: "Approve color palette", done: true },
    { id: "t2", label: "Review homepage wireframes", done: true },
    { id: "t3", label: "Upload product photography", done: false },
  ]);

  useEffect(() => {
    getProjectOverview().then(setData);
  }, []);

  if (!data) {
    return <div className="text-sm text-obsidian/60">Loading client portal…</div>;
  }

  return (
    <div>
      <PageHeader
        index="02"
        title="Client Portal"
        emphasis="in sync."
        description="Live milestone progress, actionable tasks, and embedded prototype review."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6">
          <p className="text-xs uppercase tracking-wider text-warm-sand">Active project</p>
          <h2 className="mt-1 text-2xl font-bold">{data.project.title}</h2>
          <p className="text-sm text-obsidian/60">{data.project.clientName}</p>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-semibold">{data.project.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-black/8">
              <motion.div
                className="h-full bg-deep-red"
                initial={{ width: 0 }}
                animate={{ width: `${data.project.progress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {data.milestones.map((m) => (
              <li key={m.id} className="flex items-center justify-between text-sm">
                <span className={m.isCompleted ? "line-through opacity-50" : ""}>{m.title}</span>
                <span className="text-xs text-warm-sand">{m.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-bold">Task checklist</h3>
            <ul className="mt-4 space-y-2">
              {tasks.map((task) => (
                <li key={task.id}>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() =>
                        setTasks((prev) =>
                          prev.map((t) =>
                            t.id === task.id ? { ...t, done: !t.done } : t,
                          ),
                        )
                      }
                      className="accent-deep-red"
                    />
                    {task.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel overflow-hidden rounded-2xl p-1">
            <div className="px-3 py-2 text-sm font-semibold">Prototype review</div>
            <ClientPrototypeEmbed />
          </div>
        </div>
      </div>
    </div>
  );
}
