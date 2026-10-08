"use client";

import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./dialog";
import { cn } from "@/lib/utils";

export const Modal = ({ open, onClose, title, children, className }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode; className?: string;
}) => (
  <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
    <DialogContent
      showCloseButton={false}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-[min(92vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-line bg-card p-6 shadow-xl",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        <DialogClose
          render={<button aria-label="Close" className="rounded-lg p-1 hover:bg-surface" />}
        >
          <X className="h-4 w-4" />
        </DialogClose>
      </div>
      {children}
    </DialogContent>
  </Dialog>
);