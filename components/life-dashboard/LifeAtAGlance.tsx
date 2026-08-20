"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { GlanceDashboard } from "./GlanceDashboard";
import { useI18n } from "@/components/i18n/I18nProvider";

export function LifeAtAGlance() {
  const { t } = useI18n();

  return (
    <Section id="product">
      <SectionHeading
        eyebrow={t("The idea")}
        title={t("Your life at a glance.")}
        lead={t("LifeOS doesn't just show data. It turns it into a reading of how your life is actually going — and tells you the one thing worth doing next.")}
      />
      <div className="mt-12 sm:mt-16">
        <GlanceDashboard />
      </div>
    </Section>
  );
}
