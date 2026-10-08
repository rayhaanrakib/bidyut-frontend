"use client";

import { Check, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Pricing = () => {
  const { t } = useI18n();

  const plans = [
    {
      icon: Zap, title: t("pricing.pass.title"), desc: t("pricing.pass.desc"), price: "৳99", per: "",
      features: [t("pricing.pass.f1"), t("pricing.pass.f2"), t("pricing.pass.f3"), t("pricing.pass.f4")],
      popular: false,
    },
    {
      icon: ShieldCheck, title: t("pricing.sla.title"), desc: t("pricing.sla.desc"), price: "৳499", per: "/30d",
      features: [t("pricing.sla.f1"), t("pricing.sla.f2"), t("pricing.sla.f3"), t("pricing.sla.f4")],
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t("pricing.kicker")} title={t("pricing.title")} />
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {plans.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.12}>
              <div
                className={cn(
                  "relative h-full rounded-3xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5",
                  p.popular ? "border-accent/60 shadow-[0_24px_60px_-24px] shadow-accent/40" : "border-line hover:border-accent/40",
                )}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                    {t("pricing.popular")}
                  </span>
                )}
                <p.icon className={cn("h-8 w-8", p.popular ? "text-accent" : "text-primary")} />
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.desc}</p>
                <p className="mt-5">
                  <span className="text-4xl font-extrabold tracking-tight">{p.price}</span>
                  <span className="ml-1 text-sm text-muted">{p.per}</span>
                </p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-7 block">
                  <Button className="w-full" variant={p.popular ? "default" : "outline"}>{t("pricing.cta")}</Button>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted/70">{t("pricing.note")}</p>
      </div>
    </section>
  );
};