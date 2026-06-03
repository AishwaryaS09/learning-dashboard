"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Atom,
  Palette,
  Code2,
  BarChart3,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { createElement } from "react";
import type { Course } from "@/types/course";

const iconMap: Record<string, LucideIcon> = {
  Atom,
  Palette,
  Code2,
  BarChart3,
  BookOpen,
};

function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? BookOpen;
}

function IconRender({ name, className }: { name: string; className?: string }) {
  const Icon = getIcon(name);
  return createElement(Icon, { className });
}

interface CourseCardProps {
  course: Course;
  index: number;
}

const gradients = [
  "from-cyan-500/20 to-blue-500/10",
  "from-purple-500/20 to-pink-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
];

const iconGradients = [
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
];

const barGradients = [
  "from-cyan-300 to-blue-400",
  "from-purple-300 to-pink-400",
  "from-emerald-300 to-teal-400",
  "from-amber-300 to-orange-400",
];

export function CourseCard({ course, index }: CourseCardProps) {
  const bgGradient = gradients[index % gradients.length];
  const iconGradient = iconGradients[index % iconGradients.length];
  const barGradient = barGradients[index % barGradients.length];

  return (
    <Link href={`/courses/${course.id}`}>
      <motion.article
        className="group relative overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#141414] p-6 cursor-pointer"
        whileHover={{
          scale: 1.02,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />

        <div className="absolute inset-0 grain" />

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 30px rgba(6, 182, 212, 0.08)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${iconGradient}`}
            >
              <IconRender name={course.icon_name} className="size-5 text-white" />
            </div>
            <h3 className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-200">
              {course.title}
            </h3>
          </div>

          <div className="mt-5">
            <div className="flex items-center gap-3">
              <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${barGradient}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: course.progress / 100 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.2 + index * 0.1,
                  }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
              <motion.span
                className="min-w-[3ch] text-right text-sm font-bold tabular-nums text-zinc-200"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
              >
                {course.progress}%
              </motion.span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
