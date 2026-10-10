import type { Metadata } from "next";
import CoverageContent from "@/components/portal/coverage-content";

export const metadata: Metadata = { title: "Coverage" };

export default function CoveragePage() {
  return <CoverageContent />;
}