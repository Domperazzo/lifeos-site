"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { ContextChain } from "./ContextChain";
import { ScenarioCard } from "./ScenarioCard";
import { useI18n } from "@/components/i18n/I18nProvider";

export function ContextualIntelligence() {
  const { t } = useI18n();

  return (
    <Section id="how-it-works" className="relative">
      <SectionHeading
        eyebrow={t("Contextual intelligence")}
        title={t("LifeOS understands context.")}
        lead={t("A calendar knows your day. A thermostat knows your home. Neither knows both. LifeOS reads across every area at once — which is the only place a useful decision can come from.")}
      />

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
        <ContextChain />
        <ScenarioCard />
      </div>
    </Section>
  );
}
