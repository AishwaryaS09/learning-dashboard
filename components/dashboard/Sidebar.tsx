"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { navItems } from "@/lib/navigation";
import { useUnread } from "@/lib/UnreadContext";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { totalUnread } = useUnread();

  const getActiveId = (href: string) => {
    if (href === "/") return pathname === "/" ? "dashboard" : null;
    return pathname.startsWith(href) ? href.split("/").pop() ?? null : null;
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-full flex-col border-r border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300
        hidden md:flex w-16
        ${collapsed ? "lg:w-16" : "lg:w-60"}`}
    >
      <Link href="/" className="flex h-16 items-center justify-center gap-3 border-b border-[#1f1f1f] px-4 lg:justify-start">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
          <GraduationCap className="size-5 text-white" />
        </div>
        <span className={`truncate text-sm font-semibold tracking-tight ${
          collapsed ? "hidden lg:hidden" : "hidden lg:inline"
        }`}>
          LearnLab
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const activeId = getActiveId(item.href);
          const isActive = activeId === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`relative flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors lg:justify-start ${
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-white/5"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-2">
                <Icon className="size-5 shrink-0" />
                {item.id === "messages" && totalUnread > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {totalUnread}
                  </span>
                )}
              </div>
              <span className={`relative z-10 ${
                collapsed ? "hidden lg:hidden" : "hidden lg:inline"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-[#1f1f1f] p-3 lg:block">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-zinc-500 transition-colors hover:text-zinc-300"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
