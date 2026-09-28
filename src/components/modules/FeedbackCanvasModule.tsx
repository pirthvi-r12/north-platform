"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { addDesignComment, listDesignComments } from "@/app/actions/comments";

interface Pin {
  id: string;
  x: number;
  y: number;
  commentText: string;
  author: string;
}

export function FeedbackCanvasModule() {
  const projectId = "seed-project-1";
  const [pins, setPins] = useState<Pin[]>([]);
  const [draft, setDraft] = useState("");
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    listDesignComments(projectId).then(setPins);
  }, []);

  function onCanvasClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPendingCoords({ x, y });
  }

  function submitComment() {
    if (!pendingCoords || !draft.trim()) return;
    startTransition(async () => {
      await addDesignComment({
        projectId,
        commentText: draft.trim(),
        x: pendingCoords.x,
        y: pendingCoords.y,
      });
      setDraft("");
      setPendingCoords(null);
      setPins(await listDesignComments(projectId));
    });
  }

  return (
    <div>
      <PageHeader
        index="07"
        title="Visual Feedback Canvas"
        emphasis="precisely placed."
        description="Click the preview to drop spatial pin comments for the team."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div
          className="arch-frame relative h-[420px] cursor-crosshair border border-black/8 bg-white/40"
          onClick={onCanvasClick}
        >
          <Image
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"
            alt="Design preview"
            fill
            className="object-cover"
          />
          {pins.map((pin) => (
            <button
              key={pin.id}
              type="button"
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-soft-pearl bg-deep-red"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              title={`${pin.author}: ${pin.commentText}`}
            />
          ))}
          {pendingCoords ? (
            <span
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-deep-red bg-warm-sand"
              style={{ left: `${pendingCoords.x}%`, top: `${pendingCoords.y}%` }}
            />
          ) : null}
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <p className="text-sm font-semibold">New comment</p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            placeholder={pendingCoords ? "Describe this pin…" : "Click the canvas to place a pin"}
            className="mt-2 w-full rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm"
          />
          <button
            type="button"
            disabled={!pendingCoords || !draft.trim() || pending}
            onClick={submitComment}
            className="mt-3 w-full rounded-lg bg-obsidian py-2 text-sm font-semibold text-soft-pearl disabled:opacity-40"
          >
            Add feedback
          </button>
          <ul className="mt-4 space-y-2 text-xs">
            {pins.map((pin) => (
              <li key={pin.id} className="rounded-lg border border-black/8 p-2">
                <p className="font-semibold">{pin.author}</p>
                <p className="text-obsidian/70">{pin.commentText}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
