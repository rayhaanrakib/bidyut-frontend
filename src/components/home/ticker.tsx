"use client";

import { Zap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePublicGridStatus } from "@/hooks";

export const Ticker = () => {
  const { t } = useI18n();
  const demoAreaId = process.env.NEXT_PUBLIC_DEMO_AREA_ID || null;
  const { data } = usePublicGridStatus(demoAreaId);

  const area = data?.data?.area?.name ?? "Demo Area";
  const next = data?.data?.nextScheduled;
  const items = [
    `⚡ ${t("grid.zone")}: Dhaka Central`,
    `🔌 ${area} — ${next ? `${t("hero.nextOutage")}: ${new Date(next.startsAt).toLocaleString()}` : t("hero.allClear")}`,
    `📡 ${t("features.f8.title")}`,
    `🚨 ${t("features.f6.title")}`,
    `⏱ ${t("how.s2.body")}`,
    `🔒 ${t("faq.q4")}`,
  ];

  return (
    <div className="overflow-hidden border-y border-line bg-surface/60 py-3.5" title={t("ticker.title")}>
      <div className="marquee-track gap-14">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-muted">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};