"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, CalendarClock, Zap } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { usePublicGridStatus } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/misc";

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero = () => {
  const { t } = useI18n();
  const demoAreaId = process.env.NEXT_PUBLIC_DEMO_AREA_ID || null;
  const { data, isLoading } = usePublicGridStatus(demoAreaId);
  const status = data?.data;

  return (
    <section className="hero-glow relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left — copy */}
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-primary">
              <span className="live-dot flex h-2 w-2 rounded-full bg-danger text-danger" />
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl"
          >
            {t("hero.title1")}
            <br />
            <span className="text-gradient">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/register">
              <Button size="lg">
                {t("hero.ctaPrimary")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/grid-status">
              <Button size="lg" variant="outline">{t("hero.ctaSecondary")}</Button>
            </Link>
          </motion.div>
        </div>

        {/* right — live status card (real API data) */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-[28px] bg-accent/10 blur-2xl" aria-hidden />
          <div className="relative rounded-3xl border border-line bg-card/90 p-6 shadow-2xl backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
                <Activity className="h-3.5 w-3.5 text-accent" /> {t("hero.area")}
              </span>
              {status && (
                <Badge tone={status.loadSheddingNow ? "red" : "emerald"}>
                  <span className={`live-dot flex h-1.5 w-1.5 rounded-full ${status.loadSheddingNow ? "bg-danger text-danger" : "bg-emerald-500 text-emerald-500"}`} />
                  {status.loadSheddingNow ? t("hero.liveNow") : t("hero.allClear")}
                </Badge>
              )}
            </div>

            {isLoading || !status ? (
              <div className="space-y-3">
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{status.area.name}</h3>
                  <p className="mt-0.5 text-xs text-muted">
                    {status.area.zone} → {status.area.substation} → {status.area.feeder}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-line bg-surface p-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      <CalendarClock className="h-3 w-3" /> {t("hero.nextOutage")}
                    </div>
                    <p className="mt-1.5 text-sm font-semibold leading-snug">
                      {status.nextScheduled
                        ? new Date(status.nextScheduled.startsAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
                        : "—"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line bg-surface p-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      <Zap className="h-3 w-3" /> {t("hero.activeReports")}
                    </div>
                    <p className="mt-1.5 text-2xl font-extrabold text-primary">{status.activeOutageReports}</p>
                  </div>
                </div>

                {status.nextScheduled && (
                  <div className="rounded-2xl border border-line bg-surface px-4 py-3 text-xs text-muted">
                    <span className="font-semibold text-foreground">{status.nextScheduled.title}</span> · {status.nextScheduled.type}
                  </div>
                )}
              </div>
            )}

            <p className="mt-5 border-t border-line pt-4 text-[11px] text-muted/70">
              GET /api/v1/public/grid-status/:areaId · <span className="font-mono">X-Cache: HIT/MISS</span> · updates every 60s
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};