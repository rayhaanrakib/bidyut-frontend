"use client";

import { UserRound, Wrench, Gauge, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FadeIn, SectionHeading } from "@/components/ui/misc";

export const Roles = () => {
  const { t } = useI18n();
  const roles = [
    { icon: UserRound, name: "roles.customer" as const, desc: "roles.customer.d" as const },
    { icon: Wrench, name: "roles.technician" as const, desc: "roles.technician.d" as const },
    { icon: Gauge, name: "roles.operator" as const, desc: "roles.operator.d" as const },
    { icon: ShieldCheck, name: "roles.admin" as const, desc: "roles.admin.d" as const },
  ];
  return (
    <section className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t("roles.kicker")} title={t("roles.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-line bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-semibold">{t(r.name)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(r.desc)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};