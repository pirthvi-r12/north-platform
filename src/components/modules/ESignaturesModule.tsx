"use client";

import { useRef, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export function ESignaturesModule() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [signed, setSigned] = useState(false);

  function getCtx() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }

  function start(e: React.MouseEvent<HTMLCanvasElement>) {
    const ctx = getCtx();
    if (!ctx) return;
    setDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  function move(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing) return;
    const ctx = getCtx();
    if (!ctx) return;
    const rect = e.currentTarget.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#710014";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  }

  function end() {
    setDrawing(false);
  }

  function clear() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
  }

  return (
    <div>
      <PageHeader
        index="05"
        title="E-Signatures"
        emphasis="sealed."
        description="Review agreements and capture legally binding signatures on canvas."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6 text-sm leading-relaxed">
          <h3 className="text-lg font-bold">Master Services Agreement</h3>
          <p className="mt-3 text-obsidian/75">
            This agreement between NORTH® Studio and the Client defines scope, payment terms,
            intellectual property transfer upon final invoice, and confidentiality obligations.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Net-15 payment terms on milestone invoices</li>
            <li>Two revision cycles included per deliverable phase</li>
            <li>Source files released after final settlement</li>
          </ul>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <p className="text-sm font-semibold">Signature pad</p>
          <canvas
            ref={canvasRef}
            width={520}
            height={220}
            className="mt-3 w-full rounded-xl border border-black/10 bg-white"
            onMouseDown={start}
            onMouseMove={move}
            onMouseUp={end}
            onMouseLeave={end}
          />
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={clear} className="rounded-lg border px-3 py-2 text-sm">
              Clear
            </button>
            <button
              type="button"
              onClick={() => setSigned(true)}
              className="rounded-lg bg-deep-red px-3 py-2 text-sm font-semibold text-soft-pearl"
            >
              Sign agreement
            </button>
          </div>
          {signed ? (
            <p className="mt-3 text-sm font-medium text-deep-red">
              Agreement signed and archived with timestamp {new Date().toLocaleString()}.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
