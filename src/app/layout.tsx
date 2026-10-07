import type { Metadata, Viewport } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
// import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bidyut-frontend.vercel.app"),
  title: {
    default: "BIDYUT — Load-Shedding & Power Outage Tracker for Bangladesh",
    template: "%s · BIDYUT",
  },
  description:
    "Report power outages, track restoration live, view load-shedding schedules, and get priority restoration for your area. Built on Bangladesh's grid: Zone → Substation → Feeder → Area.",
  keywords: [
    "load shedding Bangladesh", "power outage tracker", "bidyut", "electricity schedule",
    "load shedding schedule", "power grid Bangladesh", "outage reporting",
  ],
  openGraph: {
    title: "BIDYUT — Power Outage & Load-Shedding Tracker",
    description: "Live grid status, outage reporting, priority restoration, and SLA subscriptions for Bangladesh.",
    type: "website",
  },
};
  
export const viewport: Viewport = { themeColor: "#071812" };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${hind.variable} font-sans`}>
        {/* <Providers>{children}</Providers> */}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;