"use client";

import { LiveStatusCard } from "@/components/dashboard/status-card";
import { Select } from "@/components/ui/input";
import { useAreas } from "@/hooks";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

const GridStatusPage = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { data: areas } = useAreas();
  const demo = process.env.NEXT_PUBLIC_DEMO_AREA_ID || "";
  const [selected, setSelected] = useState<string>("");

  const areaId = user && selected ? selected : user ? areas?.data?.[0]?.id ?? "" : demo;

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t("nav.status")}</h1>
        <p className="mt-2 text-sm text-muted">{t("grid.sub")}</p>

        {user && (
          <div className="mt-6 max-w-xs">
            <Select value={selected} onChange={(e) => setSelected(e.target.value)} aria-label={t("report.area")}>
              <option value="">{areas?.data?.[0]?.name ?? t("report.area")}</option>
              {areas?.data?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} {a.feeder ? `· ${a.feeder.name}` : ""}
                </option>
              ))}
            </Select>
          </div>
        )}

        <div className="mt-6">
          {areaId ? (
            <LiveStatusCard areaId={areaId} />
          ) : (
            <p className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-muted">
              {t("c.loading")}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default GridStatusPage;