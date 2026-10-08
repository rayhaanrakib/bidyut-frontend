import { Skeleton } from "@/components/ui/misc";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-64 w-full rounded-3xl" />
    </main>
  );
}