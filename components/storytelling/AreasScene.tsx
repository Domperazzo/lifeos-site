"use client";

import { IPhoneStage } from "@/components/device/IPhoneStage";
import { LifeScreen } from "@/components/device/screens/LifeScreen";
import { useI18n } from "@/components/i18n/I18nProvider";

const areaKeys = [
  { label: "Home", className: "area-label-home", tint: "var(--area-home)", planned: false },
  { label: "Finance", className: "area-label-finance", tint: "var(--area-finance)", planned: false },
  { label: "Calendar", className: "area-label-calendar", tint: "var(--area-family)", planned: false },
  { label: "Health", className: "area-label-health", tint: "var(--area-wellbeing)", planned: true },
] as const;

export function AreasScene() {
  const { t } = useI18n();

  return (
    <section id="overview" data-scene="areas" className="cinematic-section scene-areas">
      <div className="cinematic-sticky scene-stage">
        <div className="area-orbit" aria-label={t("Life areas connected by LifeOS")}>
          {areaKeys.map((area) => (
            <div
              key={area.label}
              data-area-label
              className={`area-label ${area.className}`}
              style={{ "--area-label-tint": area.tint } as React.CSSProperties}
            >
              <span aria-hidden />
              <strong>{t(area.label)}</strong>
              {area.planned ? <small>{t("Planned")}</small> : null}
            </div>
          ))}
        </div>

        <IPhoneStage
          className="scene-device"
          width="clamp(250px, 23vw, 332px)"
          label={t("LifeOS areas overview on iPhone")}
        >
          <LifeScreen />
        </IPhoneStage>

        <div data-scene-copy className="scene-copy scene-copy-left">
          <p className="scene-kicker">{t("One system")}</p>
          <h2>{t("Everything that matters. Connected.")}</h2>
          <p>{t("Home, money, time and routines stop being four apps that ignore each other.")}</p>
        </div>
      </div>
    </section>
  );
}
