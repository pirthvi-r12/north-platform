"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { demoAssets } from "@/lib/demo-data";

export function AssetHubModule() {
  function download(name: string) {
    const blob = new Blob([`NORTH® asset placeholder for ${name}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        index="08"
        title="Digital Asset Hub"
        emphasis="deliverables."
        description="Download logo kits, vector masters, and brand documentation."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demoAssets.map((asset) => (
          <div key={asset.id} className="glass-panel rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-warm-sand">{asset.fileType}</p>
            <h3 className="mt-1 font-bold">{asset.name}</h3>
            <p className="text-sm text-obsidian/60">
              {(asset.sizeBytes / 1_000_000).toFixed(1)} MB
            </p>
            <button
              type="button"
              onClick={() => download(asset.name)}
              className="mt-4 rounded-lg bg-deep-red px-3 py-2 text-xs font-semibold uppercase tracking-wider text-soft-pearl"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
