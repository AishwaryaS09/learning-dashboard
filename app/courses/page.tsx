import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchCourses } from "@/lib/courses";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { MotionContainer, MotionItem } from "@/components/dashboard/MotionWrapper";
import { SkeletonCard } from "@/components/dashboard/SkeletonCard";
import { AlertCircle, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Courses — LearnLab",
  description: "Browse your learning courses and track progress.",
};

function CoursesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-8 w-48 rounded bg-[#1f1f1f] animate-skeleton" />
        <div className="mt-2 h-4 w-72 rounded bg-[#1f1f1f] animate-skeleton" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

async function CoursesContent() {
  const { data: courses, error } = await fetchCourses();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="size-10 text-rose-400 mb-4" />
        <p className="text-sm text-zinc-400">Failed to load courses</p>
        <p className="mt-1 text-xs text-zinc-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-purple-500/20">
            <BookOpen className="size-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              My Courses
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {courses?.length ?? 0} courses in progress
            </p>
          </div>
        </div>
      </div>

      <MotionContainer>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses?.map((course, i) => (
            <MotionItem key={course.id}>
              <CourseCard course={course} index={i} />
            </MotionItem>
          ))}
        </div>
      </MotionContainer>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<CoursesSkeleton />}>
      <CoursesContent />
    </Suspense>
  );
}
