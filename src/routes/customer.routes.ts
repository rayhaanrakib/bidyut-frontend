import type { DictKey } from "@/lib/dictionaries";

export type RouteItem = { label: DictKey; url: string };

export const customerRoutes: RouteItem[] = [
  { label: "dash.overview", url: "/customer" },
  { label: "dash.profile", url: "/profile" },
  { label: "dash.reports", url: "/customer/reports" },
  { label: "dash.newReport", url: "/customer/report" },
  { label: "dash.payments", url: "/customer/payments" },
  { label: "dash.applyTechnician", url: "/apply-technician" },
];