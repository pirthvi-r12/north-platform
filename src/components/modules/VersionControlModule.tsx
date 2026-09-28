"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SafeImage } from "@/components/ui/SafeImage";
import { demoDesignVersions } from "@/lib/demo-data";

export function VersionControlModule() {
  const [left, setLeft] = useState(demoDesignVersions[0].id);
  const [right, setRight] = useState(demoDesignVersions[demoDesignVersions.length - 1].id);

  const leftVersion = demoDesignVersions.find((v) => v.id === left)!;
  const rightVersion = demoDesignVersions.find((v) => v.id === right)!;

  return (
    <div>
      <PageHeader
        index="14"
        title="Version Control"
        emphasis="compared."
        description="Inspect revision history and compare design iterations side by side."
      />
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          className="rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm"
        >
          {demoDesignVersions.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
        <select
          value={right}
          onChange={(e) => setRight(e.target.value)}
          className="rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm"
        >
          {demoDesignVersions.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[leftVersion, rightVersion].map((version) => (
          <div key={`${version.id}-compare`} className="glass-panel rounded-2xl p-4">
            <p className="text-sm font-semibold">{version.label}</p>
            <p className="text-xs text-obsidian/50">{version.date}</p>
            <div className="arch-frame relative mt-3 h-64 w-full">
              <SafeImage
                src={version.image}
                alt={version.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
            <p className="mt-3 text-sm text-obsidian/70">{version.notes}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-sm font-bold uppercase tracking-wider text-warm-sand">All revisions</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {demoDesignVersions.map((version) => (
            <button
              key={version.id}
              type="button"
              onClick={() => setRight(version.id)}
              className="arch-frame glass-panel overflow-hidden text-left transition hover:-translate-y-0.5"
            >
              <div className="relative h-32 w-full">
                <SafeImage
                  src={version.image}
                  alt={version.label}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold">{version.label}</p>
                <p className="text-[10px] text-obsidian/50">{version.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
