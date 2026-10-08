import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[0_0_24px_-8px] shadow-accent/50 hover:opacity-90",
        outline: "border border-line bg-transparent hover:bg-surface",
        ghost: "hover:bg-surface",
        danger: "bg-danger text-white hover:opacity-90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: { sm: "h-9 px-3.5", md: "h-10 px-5", lg: "h-12 px-7 text-base" },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = ({ className, variant, size, loading, disabled, children, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} {...props}>
    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    {children}
  </button>
);
export { buttonVariants };