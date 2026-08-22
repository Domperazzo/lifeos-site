"use client";

import { Activity, HeartPulse, MoonStar } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

const healthMetrics = [
  { key: "Activity", value: "7,842", unit: "steps", icon: Activity },
  { key: "Sleep", value: "7h 42m", unit: "last night", icon: MoonStar },
  { key: "Heart rate", value: "62", unit: "bpm resting", icon: HeartPulse },
] as const;

export function HealthScene() {
  const { t } = useI18n();

  return (
    <section id="health" data-scene="health" className="editorial-scene scene-health">
      <div className="editorial-inner health-layout">
        <div className="scene-copy">
          <span className="planned-pill">{t("Planned area")}</span>
          <p className="scene-kicker">{t("Health")}</p>
          <h2>{t("Health, in the context of your life.")}</h2>
          <p>{t("Planned for HealthKit. Context, not diagnosis.")}</p>
        </div>

        <div className="health-preview" aria-label={t("Planned health overview")}> 
          {healthMetrics.map(({ key, value, unit, icon: Icon }, index) => (
            <div key={key} className="health-metric" style={{ "--health-delay": index } as React.CSSProperties}>
              <Icon aria-hidden />
              <span>{t(key)}</span>
              <strong>{value}</strong>
              <small>{t(unit)}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
