"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSkeleton = () => {
  return (
    <section className="hero-glow relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-28">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-20 opacity-70" />
      <div
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10 xl:gap-16">
          <div className="relative z-10">
            <div className="inline-flex h-8 w-44 animate-pulse rounded-full bg-neutral-200/50 dark:bg-neutral-800/50" />

            <div className="mt-8 space-y-4">
              <div className="h-12 w-11/12 animate-pulse rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-16 lg:h-20" />
              <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-16 lg:h-20" />
            </div>

            <div className="mt-7 space-y-2.5 max-w-lg">
              <div className="h-4 w-full animate-pulse rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
              <div className="h-4 w-5/6 animate-pulse rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="h-12 w-full animate-pulse rounded-md bg-neutral-200/40 dark:bg-neutral-800/40 sm:w-40" />
              <div className="h-12 w-full animate-pulse rounded-md bg-neutral-200/40 dark:bg-neutral-800/40 sm:w-40" />
            </div>

            <div className="mt-10 flex items-center gap-3 sm:mt-14">
              <div className="h-9 w-9 animate-pulse rounded-full bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="h-4 w-56 animate-pulse rounded-md bg-neutral-200/30 dark:bg-neutral-800/30" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101b17] p-2 sm:rounded-[2rem] sm:p-3">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.35rem] bg-neutral-900/50 sm:min-h-[520px] sm:rounded-[1.5rem] animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                  <div className="h-8 w-48 rounded-full bg-white/10" />
                  <div className="h-10 w-10 rounded-full bg-white/10" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 space-y-4">
                  <div className="h-3.5 w-32 rounded bg-white/10" />
                  <div className="space-y-2">
                    <div className="h-8 w-3/4 rounded-lg bg-white/10" />
                    <div className="h-8 w-1/2 rounded-lg bg-white/10" />
                  </div>
                  <div className="h-4 w-2/3 rounded bg-white/10" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-4 h-[78px] w-56 rounded-2xl border border-line bg-card/90 p-3.5 shadow-xl sm:-right-5 sm:bottom-10 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-xl bg-neutral-200/30 dark:bg-neutral-800/30" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroContent = () => {
  const { t } = useI18n();

  return (
    <section className="hero-glow relative isolate overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-28">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-20 opacity-70" />

      <div
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10 xl:gap-16">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs font-semibold tracking-wide text-muted backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="mt-8 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[5.5rem]"
            >
              {t("hero.title1")}
              <br />
              <span className="text-gradient">{t("hero.title2")}</span>
              <span className="text-emerald-500">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.17, ease }}
              className="mt-7 max-w-lg text-base leading-8 text-muted sm:text-lg"
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link href="/register">
                <Button size="lg" className="group min-h-12 gap-3 px-6">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/grid-status">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-h-12 gap-2 px-6"
                >
                  {t("hero.ctaSecondary")}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
              className="mt-10 flex items-center gap-3 text-xs font-medium text-muted sm:mt-14"
            >
              <div className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface">
                <ArrowDown className="h-4 w-4" />
              </div>
              <span>Discover a smarter way to stay connected</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >
            <div
              className="absolute -inset-5 -z-10 rounded-[2rem] bg-emerald-500/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101b17] p-2 shadow-2xl shadow-black/20 sm:rounded-[2rem] sm:p-3">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.35rem] sm:min-h-[520px] sm:rounded-[1.5rem]">
                <Image
                  src="https://res.cloudinary.com/atwb5lzk/image/upload/v1791646310/Wwo8hsQ4yEA-unsplash.jpg"
                  alt="Electricity transmission infrastructure against the sky"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06100c] via-[#06100c]/25 to-black/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 to-transparent" />

                <div className="absolute left-5 right-5 top-5 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
                    <Zap className="h-3.5 w-3.5 text-emerald-400" />
                    Built for a connected Bangladesh
                  </div>

                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    Powering awareness
                  </p>

                  <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                    Better information.
                    <br />
                    Stronger communities.
                  </h2>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                    Stay informed about electricity outages, schedules, and
                    restoration updates with BIDYUT.
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/10">
                      <Zap className="h-5 w-5 text-emerald-300" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        One connected platform
                      </p>
                      <p className="mt-1 text-xs text-white/60">
                        Report · Track · Stay informed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease }}
              className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-line bg-card/95 p-3.5 shadow-xl backdrop-blur-xl sm:-right-5 sm:bottom-10 sm:p-4"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/10">
                <Zap className="h-5 w-5 text-emerald-500" />
              </div>

              <div className="pr-2">
                <p className="text-sm font-bold">
                  Smarter energy awareness
                </p>
                <p className="mt-1 text-xs text-muted">
                  Information when it matters
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Hero = () => {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroContent />
    </Suspense>
  );
};