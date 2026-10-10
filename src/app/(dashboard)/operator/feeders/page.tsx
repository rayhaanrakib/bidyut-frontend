import type { Metadata } from "next";
import FeedersView from "@/components/dashboard/feeders-view";

export const metadata: Metadata = { title: "Feeders" };

export default function OperatorFeedersPage() {
  return <FeedersView />;
}