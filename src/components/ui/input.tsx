import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn("h-10 w-full rounded-xl border border-line bg-surface px-3 text-sm outline-none focus:border-primary", className)} {...props} />
);

export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={cn("w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary", className)} {...props} />
);

export const Select = ({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn("h-10 w-full rounded-xl border border-line bg-surface px-3 text-sm outline-none focus:border-primary", className)} {...props}>
    {children}
  </select>
);