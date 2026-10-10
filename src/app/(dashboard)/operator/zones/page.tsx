import type { Metadata } from "next";
import ZonesView from "@/components/dashboard/zones-view";

export const metadata: Metadata = { title: "Zones" };

export default function OperatorZonesPage() {
  return <ZonesView />;
}