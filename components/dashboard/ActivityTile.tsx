"use client";

import { motion } from "framer-motion";

const WEEKLY_GOAL_HOURS = 20;
const MAX_BAR_HOURS = 8;

const activityData = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 4 },
  { day: "Sat", hours: 6 },
  { day: "Sun", hours: 1 },
];

const barGradients = [
  "from-cyan-300 to-teal-400",
  "from-violet-300 to-purple-400",
  "from-teal-300 to-emerald-400",
  "from-purple-300 to-pink-400",
  "from-cyan-300 to-blue-400",
  "from-amber-300 to-orange-400",
  "from-emerald-300 to-teal-400",
];

const totalHours = activityData.reduce((sum, d) => sum + d.hours, 0);
const avgHours = Math.round((totalHours / activityData.length) * 10) / 10;
const goalPercent = Math.min(Math.round((totalHours / WEEKLY_GOAL_HOURS) * 100), 100);

export function ActivityTile() {
  return (
    <article className="rounded-2xl border border-[#1f1f1f] bg-[#141414] p-6">
      <div className="relative">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-zinc-200">
                This Week&apos;s Activity
              </h3>
              <p className="mt-1 text-xs text-zinc-600">
                Hours spent learning
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <motion.div
              className="rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg font-bold text-zinc-100">{totalHours}h</p>
              <p className="mt-0.5 text-[10px] text-zinc-600">Total</p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <p className="text-lg font-bold text-zinc-100">{avgHours}h</p>
              <p className="mt-0.5 text-[10px] text-zinc-600">Daily Avg</p>
            </motion.div>
            <motion.div
              className="rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg font-bold text-zinc-100">{WEEKLY_GOAL_HOURS}h</p>
              <p className="mt-0.5 text-[10px] text-zinc-600">Goal</p>
            </motion.div>
          </div>

          <div className="mt-5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500">Weekly goal progress</span>
              <motion.span
                className="font-bold text-emerald-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {goalPercent}%
              </motion.span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-teal-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: goalPercent / 100 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </div>

          <div className="mt-6 flex items-end gap-2.5">
            {activityData.map((item, i) => {
              const heightPercent = (item.hours / MAX_BAR_HOURS) * 100;

              return (
                <motion.div
                  key={item.day}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <motion.span
                    className="text-[10px] font-semibold text-zinc-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                  >
                    {item.hours}h
                  </motion.span>
                  <div className="relative h-36 w-full overflow-hidden rounded-lg bg-white/5">
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 top-0 rounded-lg bg-gradient-to-t ${barGradients[i]}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: heightPercent / 100 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + i * 0.08,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: "bottom" }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-600">
                    {item.day}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
