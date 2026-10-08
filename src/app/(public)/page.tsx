import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { Problem } from "@/components/home/problem";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { GridHierarchy } from "@/components/home/grid-hierarchy";
import { SchedulesPreview } from "@/components/home/schedules-preview";
import { Pricing } from "@/components/home/pricing";
import { AnalyticsPreview } from "@/components/home/analytics-preview";
import { Roles } from "@/components/home/roles";
import { Stats } from "@/components/home/stats";
import { Faq } from "@/components/home/faq";
import { Cta } from "@/components/home/cta";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <Features />
        <HowItWorks />
        <GridHierarchy />
        <SchedulesPreview />
        <AnalyticsPreview />
        <Pricing />
        <Roles />
        <Stats />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;