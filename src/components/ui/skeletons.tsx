import { Skeleton } from "@/components/ui/misc";

export const PublicLoading = () => (
  <div className="mx-auto max-w-6xl space-y-6 px-4 pb-10 pt-28">
    <Skeleton className="h-6 w-40" />
    <Skeleton className="h-80 w-full rounded-3xl" />
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
    </div>
  </div>
);

export const DashLoading = () => (
  <div className="min-h-screen bg-background text-foreground">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[270px] flex-col bg-[#0b1411] p-5 lg:flex">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-xl font-black text-[#07130f]">
          ⚡
        </div>

        <div>
          <p className="text-lg font-black tracking-[0.12em] text-white">
            BIDYUT
          </p>
          <p className="text-[10px] tracking-[0.18em] text-white/40">
            POWER MANAGEMENT
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-3">
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
          Workspace
        </p>

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-11 animate-pulse rounded-xl bg-white/[0.06]"
          />
        ))}
      </div>

      <div className="mt-auto space-y-4 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
            <div className="h-2.5 w-16 animate-pulse rounded bg-white/[0.06]" />
          </div>
        </div>

        <div className="h-11 animate-pulse rounded-xl bg-white/[0.06]" />
      </div>
    </aside>

    <div className="lg:pl-[270px]">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-muted lg:hidden" />

          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-3 w-48 animate-pulse rounded bg-muted/70" />
          </div>
        </div>

        <div className="h-10 w-20 animate-pulse rounded-xl bg-muted md:hidden" />
      </header>

      <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1600px] p-4 sm:p-6 lg:p-9">
        <div className="mb-8">
          <div className="h-7 w-52 animate-pulse rounded-lg bg-muted" />

          <p className="mt-3 text-sm text-muted">
            Preparing your workspace. This should only take a moment.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/60 bg-card p-5"
            >
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="mt-5 h-8 w-20 animate-pulse rounded-lg bg-muted" />
              <div className="mt-4 h-3 w-36 animate-pulse rounded bg-muted/70" />
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />
              <div className="h-3 w-56 animate-pulse rounded bg-muted/70" />
            </div>

            <div className="h-9 w-28 animate-pulse rounded-xl bg-muted" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-border/50 p-4"
              >
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-muted" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted/70" />
                </div>

                <div className="hidden h-7 w-20 animate-pulse rounded-full bg-muted sm:block" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 4 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
  </div>
);