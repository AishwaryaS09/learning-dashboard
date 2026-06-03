"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { navItems } from "@/lib/navigation";
import { useUnread } from "@/lib/UnreadContext";
import {
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <div>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <MobileBottomNav />

      {mobileMenuOpen && (
        <MobileMenuOverlay onClose={() => setMobileMenuOpen(false)} />
      )}

      <main
        className={`flex-1 pb-20 transition-all duration-300 md:pb-0 md:ml-16 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"
        }`}
      >
        <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#1f1f1f] bg-[#0a0a0a]/80 px-4 backdrop-blur-xl md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
              <GraduationCap className="size-4 text-white" />
            </div>
            <span className="text-sm font-semibold">LearnLab</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        <div className="mesh-bg min-h-full">{children}</div>
      </main>
    </div>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();
  const { totalUnread } = useUnread();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#1f1f1f] bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                isActive(item.href) ? "text-cyan-400" : "text-zinc-500"
              }`}
            >
              <div className="relative">
                <Icon className="size-5" />
                {item.id === "messages" && totalUnread > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">
                    {totalUnread}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { totalUnread } = useUnread();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden">
      <div className="absolute right-0 top-0 flex h-full w-64 flex-col border-l border-[#1f1f1f] bg-[#0a0a0a] p-4">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold">Navigation</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-white/5 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="size-5" />
                {item.label}
                {item.id === "messages" && totalUnread > 0 && (
                  <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    {totalUnread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
