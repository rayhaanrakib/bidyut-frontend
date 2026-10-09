"use client";

import Link from "next/link";
import { ShieldX } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { roleHome } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const AccessDenied = ({ role, needed }: { role?: string; needed?: string[] }) => {
  const { t } = useI18n();
  const { user } = useAuth();
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <ShieldX className="h-16 w-16 text-danger" />
      <h1 className="text-2xl font-extrabold tracking-tight">403 — {t("c.forbidden")}</h1>
      <p className="text-sm text-muted">
        {role ? `You are signed in as ${role}` : "You are not signed in"}
        {needed?.length ? `, but this area needs: ${needed.join(" or ")}.` : "."}
      </p>
      <div className="flex gap-3">
        {user && <Link href={roleHome(user.role)}><Button size="sm">← {t("nav.dashboard")}</Button></Link>}
        <Link href="/"><Button size="sm" variant="outline">{t("nav.status")}</Button></Link>
      </div>
    </main>
  );
};