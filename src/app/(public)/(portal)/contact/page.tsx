import type { Metadata } from "next";
import { ContactContent } from "@/components/portal/contact-content";;

export const metadata: Metadata = {
  title: "Contact BIDYUT",
  description: "Questions, feedback or a partnership — we read everything.",
};

export default function ContactPage() {
  return <ContactContent />;
}