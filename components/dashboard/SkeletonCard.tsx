export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#1f1f1f] bg-[#141414] p-6 animate-skeleton">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-lg bg-[#1f1f1f]" />
        <div className="h-4 w-36 rounded bg-[#1f1f1f]" />
      </div>
      <div className="space-y-3">
        <div className="h-2 w-full rounded bg-[#1f1f1f]" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-12 rounded bg-[#1f1f1f]" />
          <div className="h-3 w-16 rounded bg-[#1f1f1f]" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative col-span-full rounded-2xl border border-[#1f1f1f] bg-[#141414] p-8 animate-skeleton overflow-hidden">
      <div className="space-y-3">
        <div className="h-8 w-64 rounded bg-[#1f1f1f]" />
        <div className="h-4 w-48 rounded bg-[#1f1f1f]" />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="size-12 rounded-full bg-[#1f1f1f]" />
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-[#1f1f1f]" />
          <div className="h-5 w-10 rounded bg-[#1f1f1f]" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonActivity() {
  return (
    <div className="col-span-full rounded-2xl border border-[#1f1f1f] bg-[#141414] p-6 animate-skeleton">
      <div className="h-5 w-32 rounded bg-[#1f1f1f] mb-6" />
      <div className="flex gap-1.5">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="h-8 flex-1 rounded bg-[#1f1f1f]"
          />
        ))}
      </div>
    </div>
  );
}
