import { Skeleton } from "@/components/ui/misc";

export const AuthLoading = () => (
  <div className="mx-auto max-w-6xl space-y-6 px-4 py-16">
    <Skeleton className="h-9 w-56" />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}
    </div>
    <Skeleton className="h-64 w-full rounded-2xl" />
  </div>
);