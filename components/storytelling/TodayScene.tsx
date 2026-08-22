"use client";

import { IPhoneStage } from "@/components/device/IPhoneStage";
import { CinematicTodayScreen } from "@/components/device/screens/CinematicTodayScreen";
import { GlanceDashboard } from "@/components/life-dashboard/GlanceDashboard";
import { SceneCoda } from "./SceneCoda";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Scena 03 — Oggi.
 *
 * Il momento sticky dice una cosa sola: LifeOS porta davanti ciò che
 * conta. La coda porta la prova, che in `main` era la sezione *Your life
 * at a glance* — la stessa lettura della giornata, ma vista da fuori dal
 * telefono, dove si legge tutta insieme invece che a schermate.
 *
 * La coda sta **fuori** dalla sezione, non dentro: `[data-scene]` è il
 * trigger dello ScrollTrigger, che va da `top top` a `bottom bottom`.
 * Allungare la sezione con del contenuto in coda allungherebbe il pin
 * fino a comprenderlo, e la dashboard scorrerebbe sotto il device.
 */
export function TodayScene() {
  const { t } = useI18n();

  return (
    <>
      <section id="inside" data-scene="today" className="cinematic-section scene-today">
        <div className="cinematic-sticky scene-stage split-stage">
          <IPhoneStage
            className="scene-device today-device"
            width="clamp(280px, 27vw, 382px)"
            label={t("LifeOS Today screen on iPhone")}
          >
            <CinematicTodayScreen />
          </IPhoneStage>

          <div className="beat-stack today-beats" aria-live="off">
            <div data-today-beat>
              <p className="scene-kicker">{t("Today")}</p>
              <h2>{t("Today, without the noise.")}</h2>
            </div>
            <div data-today-beat>
              <p className="scene-kicker">{t("Priorities")}</p>
              <h2>{t("What needs you.")}</h2>
            </div>
            <div data-today-beat>
              <p className="scene-kicker">16:30</p>
              <h2>{t("What can wait.")}</h2>
            </div>
          </div>

          <p className="scene-side-note">{t("The day, read across every area at once.")}</p>
        </div>
      </section>

      <SceneCoda
        kicker={t("The idea")}
        title={t("Your life at a glance.")}
        lead={t(
          "LifeOS doesn't just show data. It turns it into a reading of how your life is actually going — and tells you the one thing worth doing next.",
        )}
      >
        <GlanceDashboard />
      </SceneCoda>
    </>
  );
}
