"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
}

export function HeroTile({ name, streak }: HeroTileProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[#1f1f1f] bg-gradient-to-br from-[#141414] via-[#141414] to-[#0f0f0f] p-8">
      <div className="absolute -right-20 -top-20 size-64 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-48 rounded-full bg-purple-500/8 blur-3xl" />

      <div className="relative z-10">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Welcome back,{" "}
          <span className="gradient-text">{name}</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Continue your learning journey
        </p>

        <motion.div
          className="mt-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 ring-1 ring-amber-500/20">
            <Flame className="size-6 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500">Daily Streak</p>
            <p className="text-xl font-bold text-amber-400">
              {streak} days
            </p>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
