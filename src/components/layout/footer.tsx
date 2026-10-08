"use client";

import { GlobeCode, Zap } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { LangToggle } from "./lang-toggle";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            <span className="font-bold">BIDYUT</span>
          </div>
          <p className="text-sm leading-relaxed text-muted">{t("footer.tagline")}</p>
          <p className="mt-2 text-xs text-muted/70">{t("footer.built")}</p>
        </div>
        <div className="flex gap-14">
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-semibold">{t("nav.status")}</span>
            <Link href="/grid-status" className="text-muted hover:text-foreground">{t("nav.status")}</Link>
            <Link href="/schedules" className="text-muted hover:text-foreground">{t("nav.schedules")}</Link>
            <Link href="/#pricing" className="text-muted hover:text-foreground">{t("nav.pricing")}</Link>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="font-semibold">{t("footer.project")}</span>
            <a href="https://github.com/<your-username>/bidyut-backend" target="_blank" className="flex items-center gap-1.5 text-muted hover:text-foreground">
              <GlobeCode className="h-3.5 w-3.5" /> {t("footer.backend")}
            </a>
            <Link href="/login" className="text-muted hover:text-foreground">{t("nav.login")}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-muted/70 sm:flex-row sm:px-6">
        <span>© {new Date().getFullYear()} BIDYUT — {t("footer.rights")}</span>
        <LangToggle />
      </div>
    </div>
    </footer>
  );
};