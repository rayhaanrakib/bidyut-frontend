"use client";

import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { FadeIn } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";

export const Cta = () => {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <FadeIn>
        <div className="hero-glow relative overflow-hidden rounded-[32px] border border-line bg-card p-12 text-center sm:p-16">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_40px_-8px] shadow-accent/60">
              <Zap className="h-7 w-7" />
            </span>
            <h2 className="mx-auto mt-6 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">{t("cta.sub")}</p>
            <Link href="/register" className="mt-8 inline-block">
              <Button size="lg">
                {t("cta.button")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};