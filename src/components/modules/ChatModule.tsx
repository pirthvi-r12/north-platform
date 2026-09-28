"use client";

import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

interface Message {
  id: string;
  author: string;
  body: string;
  time: string;
}

const seed: Message[] = [
  {
    id: "1",
    author: "Studio Manager",
    body: "Updated milestone deck is ready for your review.",
    time: "09:12",
  },
  {
    id: "2",
    author: "Client",
    body: "Looks great — can we emphasize the hero typography?",
    time: "09:20",
  },
];

function buildReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! I am on the studio side — share feedback on the latest prototype and I will loop in design.";
  }
  if (lower.includes("invoice") || lower.includes("pay") || lower.includes("billing")) {
    return "Billing is updated in module 06 — you will see milestone invoices with Stripe checkout links there.";
  }
  if (lower.includes("deadline") || lower.includes("timeline")) {
    return "Current target for Digital launch kit is Oct 20. I can adjust the Gantt timeline if you need a shift.";
  }
  return "Thanks — noted in the project thread. Design will reflect this in the next version compare (module 14) within one business day.";
}

export function ChatModule() {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send() {
    if (!text.trim()) return;
    const userBody = fileName ? `${text.trim()} (attachment: ${fileName})` : text.trim();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      author: "You",
      body: userBody,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setFileName(null);
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          author: "Studio Manager",
          body: buildReply(userBody),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1100);
  }

  return (
    <div>
      <PageHeader
        index="13"
        title="Live In-App Chat"
        emphasis="threaded."
        description="Real-time client-to-team messaging with attachment support."
      />
      <div className="glass-panel flex h-[520px] flex-col rounded-2xl">
        <div className="border-b border-black/8 px-4 py-3 text-sm font-semibold">
          Acme Rebrand — Project thread
        </div>
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-lg rounded-xl border border-black/8 p-3 ${
                msg.author === "You" ? "ml-auto bg-deep-red/10" : "bg-white/60"
              }`}
            >
              <div className="flex items-center justify-between text-xs text-obsidian/50">
                <span className="font-semibold text-obsidian">{msg.author}</span>
                <span>{msg.time}</span>
              </div>
              <p className="mt-1 text-sm">{msg.body}</p>
            </div>
          ))}
          {typing ? (
            <p className="text-xs italic text-obsidian/50">Studio Manager is typing…</p>
          ) : null}
        </div>
        <div className="border-t border-black/8 p-4">
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Write a message…"
              className="flex-1 rounded-lg border border-black/10 bg-white/80 px-3 py-2 text-sm"
            />
            <label className="cursor-pointer rounded-lg border border-black/10 px-3 py-2 text-xs font-semibold uppercase">
              Attach
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
            <button
              type="button"
              onClick={send}
              disabled={typing}
              className="rounded-lg bg-deep-red px-4 py-2 text-sm font-semibold text-soft-pearl disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
