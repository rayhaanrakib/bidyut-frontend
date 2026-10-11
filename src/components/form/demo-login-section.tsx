"use client";

import { Suspense } from "react";
import { Activity, HardHat, Loader2, ShieldCheck, UserRound, Zap, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type DemoRole } from "@/lib/demo";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { DictKey } from "@/lib/dictionaries";

const DEMO_TILES: { role: DemoRole; icon: LucideIcon; labelKey: DictKey; blurbKey: DictKey; accent: string }[] = [
  { role: "CUSTOMER", icon: UserRound, labelKey: "demo.customer", blurbKey: "demo.customerBlurb", accent: "text-emerald-600" },
  { role: "FIELD_TECHNICIAN", icon: HardHat, labelKey: "demo.technician", blurbKey: "demo.technicianBlurb", accent: "text-amber-600" },
  { role: "POWER_OPERATOR", icon: Activity, labelKey: "demo.operator", blurbKey: "demo.operatorBlurb", accent: "text-sky-600" },
  { role: "ADMIN", icon: ShieldCheck, labelKey: "demo.admin", blurbKey: "demo.adminBlurb", accent: "text-violet-600" },
];

interface DemoLoginSectionProps {
  activeRole: DemoRole | null;
  disabled: boolean;
  onSelect: (role: DemoRole) => void;
}

const DemoLoginSectionSkeleton = () => {
  return (
    <div className="rounded-2xl border border-dashed p-3.5 animate-pulse">
      <header className="mb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
          <div className="h-3.5 w-20 rounded bg-neutral-200/50 dark:bg-neutral-800/50" />
        </div>
        <div className="h-4 w-12 rounded-full bg-neutral-200/40 dark:bg-neutral-800/40" />
      </header>

      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="flex h-[42px] items-center gap-2 rounded-md border border-input bg-background px-3 py-2"
          >
            <div className="h-4 w-4 rounded-full bg-neutral-200/40 dark:bg-neutral-800/40" />
            <div className="h-4 w-16 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-3.5 h-3 w-44 rounded bg-neutral-200/20 dark:bg-neutral-800/20" />
    </div>
  );
};

const DemoLoginMain = ({ activeRole, disabled, onSelect }: DemoLoginSectionProps) => {
  const { t } = useI18n();
  const active = DEMO_TILES.find((tile) => tile.role === activeRole);

  return (
    <div className="rounded-2xl border border-dashed p-3.5">
      <header className="mb-2.5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {t("demo.title")}
        </span>
        <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {t("demo.badge")}
        </span>
      </header>

      <div className="grid grid-cols-2 gap-2">
        {DEMO_TILES.map((tile) => {
          const isActive = activeRole === tile.role;
          return (
            <Button key={tile.role} type="button" variant="outline" disabled={disabled}
              aria-busy={isActive} aria-label={t(tile.blurbKey)} onClick={() => onSelect(tile.role)}
              className={cn("h-auto justify-start gap-2 py-2.5", isActive && "border-primary/60 bg-primary/5")}>
              {isActive
                ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                : <tile.icon className={cn("h-4 w-4", tile.accent)} aria-hidden="true" />}
              <span className="text-sm font-medium">{t(tile.labelKey)}</span>
            </Button>
          );
        })}
      </div>

      <p className="mt-2.5 text-center text-[11px] leading-relaxed text-muted-foreground" aria-live="polite">
        {active ? `${t("demo.signing")} ${t(active.labelKey)}` : t("demo.pick")}
      </p>
    </div>
  );
};

const DemoLoginSection = (props: DemoLoginSectionProps) => {
  return (
    <Suspense fallback={<DemoLoginSectionSkeleton />}>
      <DemoLoginMain {...props} />
    </Suspense>
  );
};

export default DemoLoginSection;