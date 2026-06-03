import {
  SkeletonCard,
  SkeletonHero,
  SkeletonActivity,
} from "@/components/dashboard/SkeletonCard";

export default function Loading() {
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
