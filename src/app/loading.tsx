import { Suspense, ReactNode } from "react";

export function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] w-full items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-7 w-7">
          <svg
            className="h-full w-full text-neutral-200 dark:text-neutral-800"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="14" cy="14" r="12" strokeWidth="2" />
          </svg>

          <svg
            className="absolute inset-0 h-full w-full animate-spin text-neutral-900 dark:text-neutral-100"
            style={{ animationDuration: "800ms" }}
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M14 2 a 12 12 0 0 1 12 12"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="sr-only">Loading content...</span>
      </div>
    </div>
  );
}


interface SuspenseLayoutProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function SuspenseLayout({
  children,
  fallback = <LoadingSpinner />,
}: SuspenseLayoutProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}