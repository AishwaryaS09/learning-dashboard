"use client";

import type { Course } from "@/types/course";
import { MotionContainer, MotionItem } from "./MotionWrapper";
import { HeroTile } from "./HeroTile";
import { CourseCard } from "./CourseCard";
import { ActivityTile } from "./ActivityTile";
import { AlertCircle } from "lucide-react";

interface BentoGridProps {
  courses: Course[] | null;
  error: string | null;
}

export function BentoGrid({ courses, error }: BentoGridProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="size-10 text-rose-400 mb-4" />
        <p className="text-sm text-zinc-400">Failed to load courses</p>
        <p className="mt-1 text-xs text-zinc-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <MotionContainer>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MotionItem className="col-span-full">
            <HeroTile name="Alex" streak={12} />
          </MotionItem>

          {courses?.map((course, i) => (
            <MotionItem key={course.id}>
              <CourseCard course={course} index={i} />
            </MotionItem>
          ))}

          <MotionItem className="col-span-full">
            <ActivityTile />
          </MotionItem>
        </div>
      </MotionContainer>
    </section>
  );
}
