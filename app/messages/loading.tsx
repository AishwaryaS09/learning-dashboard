export default function MessagesLoading() {
  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-7xl md:h-[calc(100vh-0rem)]">
      <div className="hidden w-72 flex-col border-r border-[#1f1f1f] bg-[#0f0f0f] md:flex">
        <div className="border-b border-[#1f1f1f] p-4">
          <div className="mb-3 h-5 w-20 rounded bg-[#1f1f1f] animate-skeleton" />
          <div className="h-9 w-full rounded-lg bg-[#1f1f1f] animate-skeleton" />
        </div>
        <div className="flex-1 space-y-1 p-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 rounded bg-[#1f1f1f] animate-skeleton" />
                <div className="h-3 w-14 rounded bg-[#1f1f1f] animate-skeleton" />
              </div>
              <div className="mt-2 h-3 w-48 rounded bg-[#1f1f1f] animate-skeleton" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-[#1f1f1f] px-4 py-3">
          <div className="size-8 rounded-lg bg-[#1f1f1f] animate-skeleton" />
          <div className="space-y-1">
            <div className="h-4 w-32 rounded bg-[#1f1f1f] animate-skeleton" />
            <div className="h-3 w-16 rounded bg-[#1f1f1f] animate-skeleton" />
          </div>
        </div>

        <div className="flex-1 space-y-4 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3" style={{ justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }}>
              {i % 2 === 0 && <div className="size-8 rounded-lg bg-[#1f1f1f] animate-skeleton shrink-0" />}
              <div className="h-16 w-64 rounded-2xl bg-[#1f1f1f] animate-skeleton" />
              {i % 2 !== 0 && <div className="size-8 rounded-lg bg-[#1f1f1f] animate-skeleton shrink-0" />}
            </div>
          ))}
        </div>

        <div className="border-t border-[#1f1f1f] p-4">
          <div className="h-11 w-full rounded-xl bg-[#1f1f1f] animate-skeleton" />
        </div>
      </div>
    </div>
  );
}
