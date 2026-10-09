import type { Metadata } from "next";
import { AboutContent } from "@/components/portal/about-content";

export const metadata: Metadata = {
  title: "About BIDYUT",
  description: "Why BIDYUT exists — load-shedding information should be as reliable as electricity.",
};

export default function AboutPage() {
  return <AboutContent />;
}