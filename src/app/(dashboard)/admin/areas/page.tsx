import type { Metadata } from "next";
import AreasView from "@/components/dashboard/areas-view";

export const metadata: Metadata = { title: "Areas" };

export default function AdminAreasPage() {
  return <AreasView />;
}