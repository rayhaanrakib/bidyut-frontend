import type { RouteItem } from "./customer.routes";

export const adminRoutes: RouteItem[] = [
  { label: "dash.overview", url: "/admin" },
  { label: "dash.profile", url: "/profile" },
  { label: "dash.users", url: "/admin/users" },
  { label: "dash.applications", url: "/admin/applications" },
  { label: "dash.activity", url: "/admin/activity-logs" },
  { label: "dash.payments", url: "/admin/payments" },
  { label: "dash.analytics", url: "/admin/analytics" },
  { label: "dash.allOutages", url: "/admin/outages" },
  { label: "dash.schedules", url: "/admin/schedules" },
  { label: "dash.zones", url: "/admin/zones" },
  { label: "dash.substations", url: "/admin/substations" },
  { label: "dash.feeders", url: "/admin/feeders" },
  { label: "dash.areas", url: "/admin/areas" },
];