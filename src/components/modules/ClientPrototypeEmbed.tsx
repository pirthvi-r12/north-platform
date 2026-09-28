"use client";

import { useState } from "react";
import { FIGMA_EMBED_SRC, FIGMA_PROTOTYPE_FALLBACK_IMAGE } from "@/lib/demo-data";
import { SafeImage } from "@/components/ui/SafeImage";

export function ClientPrototypeEmbed() {
  const [mode, setMode] = useState<"preview" | "figma">("preview");

  return (
    <div className="overflow-hidden rounded-2xl">
      <div className="flex border-b border-black/8 bg-white/80">
        <button
          type="button"
          onClick={() => setMode("preview")}
          className={`flex-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider ${
            mode === "preview" ? "bg-deep-red text-soft-pearl" : "text-obsidian/70"
          }`}
        >
          NORTH preview
        </button>
        <button
          type="button"
          onClick={() => setMode("figma")}
          className={`flex-1 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider ${
            mode === "figma" ? "bg-deep-red text-soft-pearl" : "text-obsidian/70"
          }`}
        >
          Figma embed
        </button>
      </div>
      {mode === "figma" ? (
        <iframe
          title="Figma prototype — Acme Rebrand"
          className="h-80 w-full bg-white"
          src={FIGMA_EMBED_SRC}
          allowFullScreen
        />
      ) : (
        <div className="relative h-80 w-full bg-obsidian/5">
          <SafeImage
            src={FIGMA_PROTOTYPE_FALLBACK_IMAGE}
            alt="Acme Rebrand UI prototype"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 space-y-2 p-5 text-soft-pearl">
            <p className="text-sm font-bold">Acme Rebrand — Homepage v3</p>
            <p className="text-xs leading-relaxed text-soft-pearl/85">
              Click-through prototype: hero, milestone strip, and client portal entry. Matches
              active sprint deliverables in NORTH® workspace.
            </p>
            <div className="flex gap-2 pt-1">
              {["Home", "Portal", "Billing"].map((screen) => (
                <span
                  key={screen}
                  className="rounded-full border border-soft-pearl/30 px-2 py-0.5 text-[10px] uppercase"
                >
                  {screen}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
