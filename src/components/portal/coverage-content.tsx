"use client";

import { Suspense, useState } from "react";
import { ArrowRight, Lock, MapPin } from "lucide-react";
import Link from "next/link";
import { useAreaList, useFeederList, useSubstationList, useZoneList } from "@/hooks";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { DISTRICTS } from "@/lib/districts";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";

const CoverageSkeleton = () => {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-32 text-center sm:px-6 animate-pulse">
        <div className="mx-auto h-4 w-32 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
        <div className="mx-auto mt-6 h-12 max-w-2xl rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-16" />
        <div className="mx-auto mt-6 space-y-2 max-w-xl">
          <div className="h-4 w-full rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          <div className="h-4 w-5/6 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-10 w-36 rounded-md bg-neutral-200/40 dark:bg-neutral-800/40" />
          <div className="h-10 w-28 rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-[2rem] border border-line bg-card p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3 animate-pulse">
            <div className="h-8 w-48 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50" />
            <div className="h-4 w-32 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 animate-pulse">
            <div className="h-10 w-full rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
            <div className="h-10 w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
            <div className="h-10 w-full rounded-md bg-neutral-200/20 dark:bg-neutral-800/20" />
          </div>

          <div className="space-y-3 animate-pulse">
            <div className="h-4.5 w-28 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
            <div className="h-4 w-40 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="h-8 w-44 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="rounded-3xl border border-line bg-card p-6 space-y-2">
              <div className="h-10 w-16 rounded-md bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="h-4 w-24 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-3xl border border-line bg-card p-6 space-y-4 animate-pulse">
          <div className="flex items-baseline justify-between">
            <div className="h-4 w-48 rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
            <div className="h-4 w-10 rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>
          <div className="h-2.5 w-full rounded-full bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 text-center sm:px-6 animate-pulse">
        <div className="mx-auto h-10 max-w-md rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-12" />
        <div className="mx-auto mt-4 h-4 max-w-sm rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-10 w-36 rounded-md bg-neutral-200/40 dark:bg-neutral-800/40" />
          <div className="h-10 w-24 rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
        </div>
      </section>
    </main>
  );
};

const CoverageMain = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const [zoneId, setZoneId] = useState("");
  const [substationId, setSubstationId] = useState("");
  const [feederId, setFeederId] = useState("");

  const live = !!user;
  const zones = useZoneList({ limit: 100, enabled: live });
  const substations = useSubstationList({ zoneId: zoneId || undefined, limit: 100, enabled: live });
  const feeders = useFeederList({ substationId: substationId || undefined, limit: 100, enabled: live });
  const areas = useAreaList({ feederId: feederId || undefined, limit: 100, enabled: live });

  const substationTotals = useSubstationList({ page: 1, limit: 1, enabled: live });
  const feederTotals = useFeederList({ page: 1, limit: 1, enabled: live });
  const areaTotals = useAreaList({ page: 1, limit: 1, enabled: live });

  const zoneRows = zones.data?.data ?? [];
  const subRows = substations.data?.data ?? [];
  const feederRows = feeders.data?.data ?? [];
  const areaRows = areas.data?.data ?? [];

  const zoneTotal = zones.data?.meta?.total ?? 0;
  const stats = [
    { label: t("dash.zones"), value: zoneTotal },
    { label: t("dash.substations"), value: substationTotals.data?.meta?.total ?? 0 },
    { label: t("dash.feeders"), value: feederTotals.data?.meta?.total ?? 0 },
    { label: t("dash.areas"), value: areaTotals.data?.meta?.total ?? 0 },
  ];
  const pct = Math.min(100, Math.round((zoneTotal / DISTRICTS.length) * 100));

  const activeZone = zoneRows.find((z) => z.id === zoneId);
  const activeSubstation = subRows.find((s) => s.id === substationId);
  const activeFeeder = feederRows.find((f) => f.id === feederId);
  const trail = [activeZone?.name, activeSubstation?.name, activeFeeder?.name].filter(Boolean).join("  →  ");

  const pickZone = (id: string) => {
    setZoneId(id);
    setSubstationId("");
    setFeederId("");
  };

  const pickSubstation = (id: string) => {
    setSubstationId(id);
    setFeederId("");
  };

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-32 text-center sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">{t("coverage.kicker")}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {t("coverage.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{t("coverage.sub")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/grid-status">
            <Button>{t("coverage.checkStatus")}</Button>
          </Link>
          {!user && (
            <Link href="/register">
              <Button variant="outline">{t("cta.button")}</Button>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-[2rem] border border-line bg-card p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight">{t("coverage.explore")}</h2>
            {trail && <p className="font-mono text-xs uppercase tracking-wider text-muted">{trail}</p>}
          </div>

          {live ? (
            <div className="mt-8 space-y-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <Select
                  value={zoneId}
                  onChange={(e) => pickZone(e.target.value)}
                  aria-label={t("grid.zone")}
                >
                  <option value="">{t("coverage.pickZone")}</option>
                  {zoneRows.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
                    </option>
                  ))}
                </Select>
                <Select
                  value={substationId}
                  onChange={(e) => pickSubstation(e.target.value)}
                  disabled={!zoneId}
                  aria-label={t("grid.substation")}
                >
                  <option value="">{t("coverage.pickSubstation")}</option>
                  {subRows.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
                <Select
                  value={feederId}
                  onChange={(e) => setFeederId(e.target.value)}
                  disabled={!substationId}
                  aria-label={t("grid.feeder")}
                >
                  <option value="">{t("coverage.pickFeeder")}</option>
                  {feederRows.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <p className="text-sm font-semibold">{t("coverage.servedAreas")}</p>
                {feederId ? (
                  areaRows.length === 0 ? (
                    <p className="mt-3 text-sm text-muted">{t("c.empty")}</p>
                  ) : (
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {areaRows.map((area) => (
                        <span
                          key={area.id}
                          className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium"
                        >
                          <MapPin className="h-3.5 w-3.5 text-primary" /> {area.name}
                        </span>
                      ))}
                    </div>
                  )
                ) : (
                  <p className="mt-3 text-sm text-muted">{t("coverage.pickFeeder")}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-surface px-6 py-14 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-card">
                <Lock className="h-6 w-6 text-muted" />
              </span>
              <p className="max-w-md text-sm text-muted">{t("coverage.signInHint")}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/login?redirect=/coverage">
                  <Button size="sm">{t("auth.signIn")}</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" variant="outline">
                    {t("auth.signUp")}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight">{t("coverage.numbers")}</h2>
        {live ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-line bg-card p-6">
                  <p className="text-4xl font-extrabold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-line bg-card p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">
                  {zoneTotal} <span className="text-muted">{t("coverage.of64")} {DISTRICTS.length} {t("coverage.districtsOnline")}</span>
                </p>
                <p className="font-mono text-xs text-muted">{pct}%</p>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-line bg-surface px-6 py-12 text-center text-sm text-muted">
            <Lock className="mx-auto mb-3 h-5 w-5" />
            {t("coverage.signInHint")}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 text-center sm:px-6">
        <h2 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">{t("coverage.ctaTitle")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{t("coverage.ctaSub")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={user ? "/grid-status" : "/register"}>
            <Button>
              {user ? t("coverage.checkStatus") : t("cta.button")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/grid-status">
            <Button variant="ghost">{t("nav.status")}</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

const CoverageContent = () => {
  return (
    <Suspense fallback={<CoverageSkeleton />}>
      <CoverageMain />
    </Suspense>
  );
};

export default CoverageContent;