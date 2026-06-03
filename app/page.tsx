export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { fetchCourses } from "@/lib/courses";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import {
  SkeletonCard,
  SkeletonHero,
  SkeletonActivity,
} from "@/components/dashboard/SkeletonCard";

function DashboardSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SkeletonHero />
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
        <SkeletonActivity />
      </div>
    </section>
  );
}

async function DashboardContent() {
  const { data: courses, error } = await fetchCourses();

  return (
    <BentoGrid
      courses={courses}
      error={error?.message ?? null}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
