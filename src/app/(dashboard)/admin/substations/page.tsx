import type { Metadata } from "next";
import SubstationsView from "@/components/dashboard/substations-view";

export const metadata: Metadata = { title: "Substations" };

export default function AdminSubstationsPage() {
  return <SubstationsView />;
}