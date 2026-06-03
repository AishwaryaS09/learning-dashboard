import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchCourseById } from "@/lib/courses";
import { SkeletonCard } from "@/components/dashboard/SkeletonCard";
import {
  AlertCircle,
  ArrowLeft,
  Atom,
  Palette,
  Code2,
  BarChart3,
  BookOpen,
  Clock,
  Calendar,
  type LucideIcon,
} from "lucide-react";

export const dynamic = "force-dynamic";

const iconMap: Record<string, LucideIcon> = {
  Atom,
  Palette,
  Code2,
  BarChart3,
  BookOpen,
};

const gradients: Record<string, string> = {
  Atom: "from-cyan-500 to-blue-600",
  Palette: "from-purple-500 to-pink-600",
  Code2: "from-emerald-500 to-teal-600",
  BarChart3: "from-amber-500 to-orange-600",
};

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: course } = await fetchCourseById(id);

  if (!course) return { title: "Course Not Found — LearnLab" };

  return {
    title: `${course.title} — LearnLab`,
    description: `Track your progress in ${course.title}.`,
  };
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-6 h-4 w-24 rounded bg-[#1f1f1f] animate-skeleton" />
      <SkeletonCard />
    </div>
  );
}

async function CourseDetailContent({ id }: { id: string }) {
  const { data: course, error } = await fetchCourseById(id);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="size-10 text-rose-400 mb-4" />
        <p className="text-sm text-zinc-400">Failed to load course</p>
        <p className="mt-1 text-xs text-zinc-600">{error.message}</p>
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const Icon = iconMap[course.icon_name] ?? BookOpen;
  const gradient = gradients[course.icon_name] ?? "from-cyan-500 to-blue-600";
  const createdAt = new Date(course.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 lg:px-8">
      <Link
        href="/courses"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="size-4" />
        Back to Courses
      </Link>

      <article className="rounded-2xl border border-[#1f1f1f] bg-[#141414] p-8">
        <div className="flex items-center gap-4">
          <div
            className={`flex size-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}
          >
            <Icon className="size-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">{course.title}</h1>
            <p className="mt-1 text-sm text-zinc-500">Course Details</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Progress</span>
              <span className="text-2xl font-bold gradient-text">
                {course.progress}%
              </span>
            </div>
            <div className="relative h-2.5 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] p-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <Calendar className="size-4" />
                <span className="text-xs">Started</span>
              </div>
              <p className="mt-1 text-sm text-zinc-300">{createdAt}</p>
            </div>
            <div className="rounded-xl border border-[#1f1f1f] bg-[#0f0f0f] p-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <Clock className="size-4" />
                <span className="text-xs">Status</span>
              </div>
              <p className="mt-1 text-sm text-zinc-300">
                {course.progress === 100 ? "Completed" : "In Progress"}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <CourseDetailContentWrapper params={params} />
    </Suspense>
  );
}

async function CourseDetailContentWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CourseDetailContent id={id} />;
}
