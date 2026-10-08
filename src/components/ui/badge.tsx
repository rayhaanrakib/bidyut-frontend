import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tones = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    tone: {
      emerald: "bg-emerald-500/15 text-emerald-500",
      red: "bg-red-500/15 text-red-400",
      amber: "bg-amber-500/15 text-amber-500",
      blue: "bg-blue-500/15 text-blue-400",
      violet: "bg-violet-500/15 text-violet-400",
      neutral: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export const Badge = ({ className, tone, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof tones>) => (
  <span className={cn(tones({ tone }), className)} {...props} />
);

export const statusTone = (status: string): "emerald" | "red" | "amber" | "blue" | "violet" | "neutral" => {
  const map: Record<string, "emerald" | "red" | "amber" | "blue" | "violet" | "neutral"> = {
    PENDING: "amber", ASSIGNED: "blue", IN_PROGRESS: "violet", RESOLVED: "emerald", CANCELLED: "neutral",
    COMPLETED: "emerald", REFUNDED: "red", FAILED: "red", ACTIVE: "emerald", BLOCKED: "red",
    APPROVED: "emerald", REJECTED: "red",
  };
  return map[status] ?? "neutral";
};