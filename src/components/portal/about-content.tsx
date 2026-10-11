"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Activity, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const infrastructureImages = [
  {
    title: "Power Transmission",
    description: "The network that carries electricity across long distances.",
    image:
      "https://res.cloudinary.com/atwb5lzk/image/upload/v1791646758/2HAd6_Jz5H4-unsplash.jpg",
    alt: "Energy infrastructure and power generation",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Power Distribution",
    description: "Connecting electricity networks to communities.",
    image:
      "https://res.cloudinary.com/atwb5lzk/image/upload/v1791646758/UFzIeDxhJc-unsplash.jpg",
    alt: "Energy infrastructure in an open landscape",
    className: "",
  },
  {
    title: "A Smarter Grid",
    description: "Making outage information easier to access.",
    image:
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=900&q=85",
    alt: "Electrical energy infrastructure",
    className: "",
  },
];

const AboutSkeleton = () => {
  return (
    <main className="container mx-auto min-h-screen px-8 py-16 sm:py-24">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 h-9 w-72 animate-pulse rounded-full bg-neutral-200/50 dark:bg-neutral-800/50" />

          <div className="space-y-3.5">
            <div className="h-10 w-full animate-pulse rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-12 lg:h-14 lg:w-11/12" />
            <div className="h-10 w-4/5 animate-pulse rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-12 lg:h-14" />
          </div>

          <div className="mt-6 space-y-2.5 max-w-xl">
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>

          <div className="mt-4 space-y-2.5 max-w-xl">
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex h-[78px] w-64 items-center gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="h-11 w-11 animate-pulse rounded-lg bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 animate-pulse rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-3 w-40 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>
            </div>

            <div className="flex h-[78px] w-64 items-center gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="h-11 w-11 animate-pulse rounded-lg bg-neutral-200/40 dark:bg-neutral-800/40" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-36 animate-pulse rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
                <div className="h-3 w-36 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-emerald-500/10 blur-2xl" />

          <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[200px]">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-neutral-200/20 dark:bg-neutral-800/20 md:col-span-2 md:row-span-2 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 space-y-3">
                <div className="h-5 w-48 rounded bg-white/10" />
                <div className="h-4 w-80 rounded bg-white/10" />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-line bg-neutral-200/20 dark:bg-neutral-800/20 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                <div className="h-4.5 w-36 rounded bg-white/10" />
                <div className="h-3.5 w-44 rounded bg-white/10" />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-line bg-neutral-200/20 dark:bg-neutral-800/20 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                <div className="h-4.5 w-32 rounded bg-white/10" />
                <div className="h-3.5 w-40 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 border-t border-line pt-10 sm:mt-28 sm:pt-14">
        <div className="max-w-2xl">
          <div className="h-4.5 w-28 animate-pulse rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
          <div className="mt-3 h-8 w-full animate-pulse rounded-lg bg-neutral-200/50 dark:bg-neutral-800/50 sm:h-10 sm:w-5/6" />

          <div className="mt-5 space-y-2.5">
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-200/30 dark:bg-neutral-800/30" />
          </div>
        </div>
      </section>
    </main>
  );
};

const AboutMain = () => {
  const { t } = useI18n();

  return (
    <main className="container mx-auto min-h-screen px-8 py-16 sm:py-24">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted">
            <Zap className="h-4 w-4 text-emerald-500" />
            Bangladesh's Power Grid, Made Smarter
          </div>

          <h1 className="max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {t("about.title")}
          </h1>

          <p className="mt-6 text-base leading-8 text-muted">
            {t("about.p1")}
          </p>

          <p className="mt-4 text-base leading-8 text-muted">
            {t("about.p2")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-500/10">
                <Activity className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold">Real-time Awareness</p>
                <p className="mt-1 text-xs text-muted">
                  Stay informed about outages
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-500/10">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="font-semibold">Reliable Information</p>
                <p className="mt-1 text-xs text-muted">
                  Clear updates for communities
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-emerald-500/10 blur-2xl" />

          <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[200px]">
            {infrastructureImages.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + index * 0.12 }}
                className={`group relative isolate overflow-hidden rounded-2xl border border-line bg-surface ${item.className}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-white sm:text-xl">
                        {item.title}
                      </h2>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-white/75">
                        {item.description}
                      </p>
                    </div>
                    <ArrowUpRight className="mb-1 h-5 w-5 shrink-0 text-white/80 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mt-20 border-t border-line pt-10 sm:mt-28 sm:pt-14">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">
            Our Purpose
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Helping people stay connected and informed
          </h2>
          <p className="mt-5 leading-8 text-muted">
            BIDYUT brings outage reporting, restoration updates, and load-shedding
            information together in one place, helping communities understand
            what's happening with their electricity service.
          </p>
        </div>
      </section>
    </main>
  );
};

export const AboutContent = () => {
  return (
    <Suspense fallback={<AboutSkeleton />}>
      <AboutMain />
    </Suspense>
  );
};