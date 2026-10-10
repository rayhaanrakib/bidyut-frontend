import type { RouteItem } from "./customer.routes";

export const operatorRoutes: RouteItem[] = [
  { label: "dash.overview", url: "/operator" },
  { label: "dash.profile", url: "/profile" },
  { label: "dash.allOutages", url: "/operator/outages" },
  { label: "dash.schedules", url: "/operator/schedules" },
  { label: "dash.analytics", url: "/operator/analytics" },
  { label: "dash.zones", url: "/operator/zones" },
  { label: "dash.substations", url: "/operator/substations" },
  { label: "dash.feeders", url: "/operator/feeders" },
  { label: "dash.areas", url: "/operator/areas" },
  { label: "dash.users", url: "/operator/users" },
];