"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  ChevronRight,
  Moon,
  Globe,
  LogOut,
} from "lucide-react";

interface SettingRowProps {
  icon: typeof User;
  label: string;
  description: string;
  action: React.ReactNode;
  delay: number;
}

function SettingRow({ icon: Icon, label, description, action, delay }: SettingRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      className="flex items-center justify-between rounded-xl border border-[#1f1f1f] bg-[#141414] p-4 transition-colors hover:border-[#2a2a2a]"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-800">
          <Icon className="size-5 text-zinc-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-200">{label}</p>
          <p className="text-xs text-zinc-600">{description}</p>
        </div>
      </div>
      {action}
    </motion.div>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-500/20 to-zinc-600/20 ring-1 ring-zinc-500/20">
            <Settings className="size-5 text-zinc-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Settings</h1>
            <p className="mt-1 text-sm text-zinc-500">Manage your preferences</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
          Profile
        </h2>
        <SettingRow
          icon={User}
          label="Profile Information"
          description="Name, email, and avatar"
          delay={0.1}
          action={<ChevronRight className="size-4 text-zinc-600" />}
        />
        <SettingRow
          icon={Globe}
          label="Language"
          description="English (US)"
          delay={0.15}
          action={<ChevronRight className="size-4 text-zinc-600" />}
        />
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
          Preferences
        </h2>
        <SettingRow
          icon={Bell}
          label="Notifications"
          description="Push notifications for course updates"
          delay={0.2}
          action={
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-cyan-500" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block size-5 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          }
        />
        <SettingRow
          icon={Palette}
          label="Theme"
          description="Dark mode (always on)"
          delay={0.25}
          action={
            <div className="flex items-center gap-2">
              <Moon className="size-4 text-cyan-400" />
              <span className="text-xs text-zinc-500">Dark</span>
            </div>
          }
        />
      </div>

      <div className="mt-8 space-y-3">
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
          Security
        </h2>
        <SettingRow
          icon={Shield}
          label="Privacy & Security"
          description="Password, 2FA, and sessions"
          delay={0.3}
          action={<ChevronRight className="size-4 text-zinc-600" />}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 20 }}
        className="mt-8"
      >
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm text-rose-400 transition-colors hover:bg-rose-500/10">
          <LogOut className="size-4" />
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}
