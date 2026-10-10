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
  <div className="flex min-h-screen">
    <div className="hidden w-60 shrink-0 space-y-3 border-r border-line p-4 lg:block">
      <Skeleton className="h-9 w-full rounded-xl" />
      {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-full rounded-lg" />)}
    </div>
    <div className="flex-1 space-y-4 p-4 sm:p-6 lg:p-8">
      <Skeleton className="h-9 w-56" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 4 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
  </div>
);