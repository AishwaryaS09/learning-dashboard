"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Flame,
  Trophy,
  TrendingUp,
  Clock,
} from "lucide-react";

const weeklyData = [
  { day: "Mon", hours: 3, color: "from-cyan-500/40 to-blue-500/20" },
  { day: "Tue", hours: 5, color: "from-cyan-500/40 to-blue-500/20" },
  { day: "Wed", hours: 2, color: "from-cyan-500/40 to-blue-500/20" },
  { day: "Thu", hours: 7, color: "from-purple-500/40 to-pink-500/20" },
  { day: "Fri", hours: 4, color: "from-purple-500/40 to-pink-500/20" },
  { day: "Sat", hours: 6, color: "from-amber-500/40 to-orange-500/20" },
  { day: "Sun", hours: 1, color: "from-amber-500/40 to-orange-500/20" },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));

const stats = [
  {
    icon: Flame,
    label: "Day Streak",
    value: "12",
    gradient: "from-amber-500/20 to-rose-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Trophy,
    label: "Courses Completed",
    value: "3",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: TrendingUp,
    label: "Total Hours",
    value: "28",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Clock,
    label: "Avg. Daily",
    value: "4h",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
];

const contributionData = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

const activityLevels = ["bg-zinc-900", "bg-cyan-900/30", "bg-cyan-800/40", "bg-cyan-600/50", "bg-cyan-400/60"];

export function ActivityPageClient() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/20">
            <Activity className="size-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Activity
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Your learning journey at a glance
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 200, damping: 20 }}
              className="rounded-2xl border border-[#1f1f1f] bg-[#141414] p-5"
            >
              <div className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} ring-1 ring-white/5`}>
                <Icon className={`size-5 ${stat.iconColor}`} />
              </div>
              <p className="mt-4 text-2xl font-bold text-zinc-100">{stat.value}</p>
              <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="mt-6 rounded-2xl border border-[#1f1f1f] bg-[#141414] p-6"
      >
        <h3 className="text-sm font-medium text-zinc-200">This Week</h3>
        <p className="mt-1 text-xs text-zinc-600">Hours spent learning</p>

        <div className="mt-6 flex items-end gap-3">
          {weeklyData.map((item, i) => {
            const heightPercent = (item.hours / maxHours) * 100;
            return (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                <motion.span
                  className="text-[10px] font-medium text-zinc-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  {item.hours}h
                </motion.span>
                <div className="relative h-32 w-full rounded-lg bg-zinc-900/50">
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 rounded-lg bg-gradient-to-t ${item.color}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: heightPercent / 100 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                    style={{ transformOrigin: "bottom" }}
                  />
                </div>
                <span className="text-[10px] text-zinc-600">{item.day}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 20 }}
        className="mt-6 rounded-2xl border border-[#1f1f1f] bg-[#141414] p-6"
      >
        <h3 className="text-sm font-medium text-zinc-200">Contribution Graph</h3>
        <p className="mt-1 text-xs text-zinc-600">Past 52 weeks</p>

        <div className="mt-4 overflow-x-auto">
          <div className="flex gap-[3px]">
            {contributionData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className={`size-3 rounded-sm ${activityLevels[level]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-600">
          <span>Less</span>
          {activityLevels.map((level) => (
            <div key={level} className={`size-3 rounded-sm ${level}`} />
          ))}
          <span>More</span>
        </div>
      </motion.div>
    </div>
  );
}
