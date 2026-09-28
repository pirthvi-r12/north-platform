"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { demoJournal } from "@/lib/demo-data";

export function PerspectivesModule() {
  const [activeId, setActiveId] = useState(demoJournal[0]?.id ?? "");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const active = useMemo(
    () => demoJournal.find((p) => p.id === activeId) ?? demoJournal[0],
    [activeId],
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
    setProgress(0);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  }, [activeId]);

  function toggleListen() {
    if (typeof window === "undefined" || !active) {
      return;
    }

    const synth = window.speechSynthesis;
    if (playing) {
      synth.cancel();
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      setPlaying(false);
      setProgress(0);
      return;
    }

    synth.cancel();
    const text = `${active.title}. ${active.excerpt} ${active.body}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    const preferred =
      voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")) ??
      voices.find((v) => v.lang.startsWith("en"));
    if (preferred) {
      utterance.voice = preferred;
    }

    const estimatedMs = Math.max(active.readMinutes * 60 * 1000, 8000);
    setProgress(0);
    intervalRef.current = window.setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (estimatedMs / 200), 100));
    }, 200);

    utterance.onend = () => {
      setPlaying(false);
      setProgress(100);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
    utterance.onerror = () => {
      setPlaying(false);
      setProgress(0);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };

    synth.speak(utterance);
    setPlaying(true);

    if (voices.length === 0) {
      synth.onvoiceschanged = () => {
        const updated = synth.getVoices().find((v) => v.lang.startsWith("en"));
        if (updated) {
          utterance.voice = updated;
        }
      };
    }
  }

  return (
    <div>
      <PageHeader
        index="09"
        title="Perspectives"
        emphasis="journal."
        description="Editorial insights with reading time and listen mode powered by your browser voice engine."
      />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-2">
          {demoJournal.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setActiveId(post.id)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm ${
                post.id === active?.id ? "bg-deep-red text-soft-pearl" : "glass-panel"
              }`}
            >
              {post.title}
            </button>
          ))}
        </aside>
        <article className="glass-panel rounded-2xl p-6">
          <p className="text-xs uppercase tracking-wider text-warm-sand">
            {active?.readMinutes} min read
          </p>
          <h2 className="mt-2 text-3xl font-bold">{active?.title}</h2>
          <p className="mt-2 text-obsidian/70">{active?.excerpt}</p>
          <p className="mt-6 leading-relaxed text-obsidian/85">{active?.body}</p>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={toggleListen}
              className="rounded-full bg-obsidian px-4 py-2 text-sm font-semibold text-soft-pearl"
            >
              {playing ? "Pause audio" : "Listen"}
            </button>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full bg-warm-sand transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-obsidian/50">
            Uses Web Speech API — ensure system volume is up and a voice pack is installed.
          </p>
        </article>
      </div>
    </div>
  );
}
