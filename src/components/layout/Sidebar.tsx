"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { NAV_ITEMS } from "@/config/navigation";

interface SidebarProps {
  userName?: string | null;
  userRole?: string;
}

export function Sidebar({ userName, userRole }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-black/8 bg-obsidian text-soft-pearl">
      <div className="border-b border-white/10 px-6 py-7">
        <Link href="/workspace/showcase" className="block">
          <span className="text-xl font-bold tracking-tight">NORTH®</span>
          <p className="mt-1 text-xs text-soft-pearl/60">
            A clearer <span className="serif-emphasis text-warm-sand">way forward.</span>
          </p>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-deep-red text-soft-pearl"
                      : "text-soft-pearl/75 hover:bg-white/8 hover:text-soft-pearl"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] tracking-wider ${
                      active ? "text-warm-sand" : "text-warm-sand/70"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {active ? (
                    <motion.span
                      layoutId="sidebar-active"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-warm-sand"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <p className="truncate text-sm font-medium">{userName ?? "Guest"}</p>
        <p className="text-xs text-soft-pearl/50 uppercase tracking-wider">{userRole}</p>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-4 w-full rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition hover:bg-white/10"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
