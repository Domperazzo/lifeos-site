"use client";

import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroDevices } from "./HeroDevices";
import { AmbientField } from "./AmbientField";
import { useI18n } from "@/components/i18n/I18nProvider";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
      <AmbientField />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <Reveal delay={0.05}>
          <p className="text-[13px] font-medium tracking-[0.02em] text-ink-tertiary">
            {t("A personal operating system for iPhone")}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.05rem,7.4vw,5.25rem)] font-semibold leading-[1] tracking-[-0.04em]">
            <span className="text-gradient">{t("Your life.")}</span>
            <br />
            <span className="text-gradient">{t("One operating system.")}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-secondary sm:text-lg">
            {t("LifeOS brings your home, finances, routines and priorities into one intelligent system that understands your life and helps you stay in control.")}
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <CTA href="#get-lifeos">
              {t("Explore LifeOS")}
              <ArrowRight className="size-4" />
            </CTA>
            <CTA href="#how-it-works" variant="secondary">
              {t("See how it works")}
            </CTA>
          </div>
        </Reveal>
      </div>

      <HeroDevices />
    </section>
  );
}
