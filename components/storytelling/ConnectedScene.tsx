"use client";

import { IPhoneStage } from "@/components/device/IPhoneStage";
import { CinematicTodayScreen } from "@/components/device/screens/CinematicTodayScreen";
import { useI18n } from "@/components/i18n/I18nProvider";

const signals = [
  { label: "Home", detail: "Nobody home", className: "signal-home", tint: "var(--area-home)" },
  { label: "Calendar", detail: "Nothing until 16:30", className: "signal-calendar", tint: "var(--area-family)" },
  { label: "Finance", detail: "Bill due in 2 days", className: "signal-finance", tint: "var(--area-finance)" },
  { label: "Tasks", detail: "Vacuum is due", className: "signal-tasks", tint: "var(--area-goals)" },
  { label: "Health", detail: "Planned", className: "signal-health", tint: "var(--area-wellbeing)" },
] as const;

export function ConnectedScene() {
  const { t } = useI18n();

  return (
    <section id="connected" data-scene="connected" className="cinematic-section scene-connected">
      <div className="cinematic-sticky scene-stage connected-stage">
        <div className="connected-heading">
          <p className="scene-kicker">LifeOS</p>
          <h2>{t("One system. Your life.")}</h2>
        </div>

        <div className="signal-field" aria-label={t("Life signals becoming Today")}> 
          {signals.map((signal) => (
            <div
              key={signal.label}
              data-signal
              className={`life-signal ${signal.className}`}
              style={{ "--signal-tint": signal.tint } as React.CSSProperties}
            >
              <span aria-hidden />
              <div>
                <strong>{t(signal.label)}</strong>
                <small>{t(signal.detail)}</small>
              </div>
            </div>
          ))}
        </div>

        <IPhoneStage
          className="scene-device connected-device"
          width="clamp(250px, 23vw, 336px)"
          label={t("LifeOS Today screen assembled from connected areas")}
        >
          <CinematicTodayScreen />
        </IPhoneStage>

        <p data-connected-answer className="connected-answer">
          {t("What matters now.")}
        </p>
      </div>
    </section>
  );
}
