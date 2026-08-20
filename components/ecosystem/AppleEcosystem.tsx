"use client";

import { ArrowRight, Mic } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedIPhone } from "@/components/device/IPhoneMockup";
import { TransactionScreen } from "@/components/device/screens/TransactionScreen";
import { WidgetMockup } from "./WidgetMockup";
import { useI18n } from "@/components/i18n/I18nProvider";

export function AppleEcosystem() {
  const { t } = useI18n();
  const integrations = [
    {
      name: t("App Intents & Shortcuts"),
      detail: t("Complete a task or log an expense without opening the app, and put those same actions inside your own automations."),
    },
    { name: t("Siri"), detail: t("Say it, and it is filed.") },
    {
      name: t("iCloud"),
      detail: t("Your data syncs through your own Apple account — between your own devices."),
    },
    {
      name: t("HomeKit"),
      detail: t("Reads the accessories you have already set up. Nothing to configure twice."),
    },
  ];

  return (
    <Section>
      <SectionHeading
        eyebrow={t("Ecosystem")}
        title={t("Built for the Apple ecosystem.")}
        lead={t("Not a web app in a wrapper. LifeOS is a native iOS app that uses the parts of the system you already rely on.")}
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <Reveal className="card flex flex-col gap-6 p-6">
          <p className="text-[13px] font-medium text-ink-tertiary">{t("Home Screen widget")}</p>
          <WidgetMockup />
          <p className="text-[14px] leading-relaxed text-ink-secondary">
            {t("The answer before the app. Glance, and you already know whether anything needs you.")}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="card flex flex-col gap-5 p-6">
          <p className="text-[13px] font-medium text-ink-tertiary">{t("Deeper in the system")}</p>
          <ul className="flex flex-col gap-5">
            {integrations.map((integration) => (
              <li key={integration.name}>
                <p className="text-[14.5px] font-medium">{integration.name}</p>
                <p className="mt-0.5 text-[13px] text-ink-secondary">{integration.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Siri → App Intent → transazione registrata */}
      <Reveal className="mt-4 grid items-center gap-10 rounded-[24px] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="text-[13px] font-medium text-ink-tertiary">{t("Siri")}</p>
          <div className="mt-5 flex items-start gap-3.5">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full"
              style={{
                background: "color-mix(in srgb, var(--area-goals) 15%, transparent)",
                color: "var(--area-goals)",
              }}
            >
              <Mic className="size-4" />
            </span>
            <p className="text-[clamp(1.25rem,2.4vw,1.7rem)] font-semibold leading-snug tracking-[-0.02em]">
              {t("“Log 25 euros for dinner.”")}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 text-[14.5px] text-ink-secondary">
            <ArrowRight className="size-4 shrink-0 text-ink-tertiary" />
            {t("LifeOS files it under Restaurants, on your main account, today.")}
          </div>

          <p className="mt-6 max-w-md text-[14px] leading-relaxed text-ink-tertiary">
            {t("The same App Intent works from Shortcuts, from the Lock Screen and from a widget button — because it is the app's own action, not a copy of it.")}
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <AnimatedIPhone
            width="clamp(214px, 56vw, 262px)"
            from={3}
            label={t("The transaction Siri just created in LifeOS")}
          >
            <TransactionScreen />
          </AnimatedIPhone>
        </div>
      </Reveal>
    </Section>
  );
}
