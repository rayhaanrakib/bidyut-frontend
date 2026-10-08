"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-5xl">⚡</p>
      <h1 className="text-xl font-bold">Something tripped a breaker</h1>
      <p className="text-sm text-muted">{error.message || "An unexpected error occurred."}</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}