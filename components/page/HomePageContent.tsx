"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { LifeAtAGlance } from "@/components/life-dashboard/LifeAtAGlance";
import { AreasSection } from "@/components/features/AreasSection";
import { ContextualIntelligence } from "@/components/intelligence/ContextualIntelligence";
import { Automations } from "@/components/automations/Automations";
import { AskLifeOS } from "@/components/ask-lifeos/AskLifeOS";
import { Devices } from "@/components/devices/Devices";
import { AppleEcosystem } from "@/components/ecosystem/AppleEcosystem";
import { Privacy } from "@/components/privacy/Privacy";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { ProductDemo } from "@/components/product-demo/ProductDemo";
import { Roadmap } from "@/components/roadmap/Roadmap";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { useI18n } from "@/components/i18n/I18nProvider";

export function HomePageContent() {
  const { t } = useI18n();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:text-bg"
      >
        {t("Skip to content")}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <LifeAtAGlance />
        <AreasSection />
        <ContextualIntelligence />
        <Automations />
        <AskLifeOS />
        <Devices />
        <AppleEcosystem />
        <Privacy />
        <Philosophy />
        <ProductDemo />
        <Roadmap />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
