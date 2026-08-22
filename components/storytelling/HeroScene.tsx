"use client";

import { ChevronDown } from "lucide-react";
import { IPhoneStage } from "@/components/device/IPhoneStage";
import { LifeScreen } from "@/components/device/screens/LifeScreen";
import { useI18n } from "@/components/i18n/I18nProvider";

export function HeroScene() {
  const { t } = useI18n();

  return (
    <section id="top" data-scene="hero" className="cinematic-section cinematic-hero">
      <div className="cinematic-sticky hero-composition">
        <div aria-hidden data-hero-aura className="hero-aura" />

        <div data-hero-copy className="hero-copy">
          <p className="hero-brand">LifeOS</p>
          <h1>{t("Your life. One place.")}</h1>
        </div>

        <div className="hero-device">
          <IPhoneStage
            width="clamp(270px, 25vw, 358px)"
            label={t("LifeOS daily dashboard on iPhone")}
          >
            <LifeScreen />
          </IPhoneStage>
        </div>

        <div className="scroll-cue" aria-hidden>
          <span>{t("Scroll to explore")}</span>
          <ChevronDown />
        </div>
      </div>
    </section>
  );
}
