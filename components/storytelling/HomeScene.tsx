"use client";

import { IPhoneStage } from "@/components/device/IPhoneStage";
import { AutomationScreen } from "@/components/device/screens/AutomationScreen";
import { HomeScreen } from "@/components/device/screens/HomeScreen";
import { SmartHomeExamples } from "@/components/features/SmartHomeExamples";
import { StatCallout } from "@/components/features/StatCallout";
import { SceneCoda, ScenePoints } from "./SceneCoda";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Scena 04 — Casa.
 *
 * Lo sticky mostra la conseguenza: nessuno in casa, la pulizia parte da
 * sola. La coda dice di cosa è fatta la Casa dentro l'app — stanze,
 * faccende, manutenzione, inventario — e porta i tre esempi contestuali
 * che in `main` stavano nel blocco *Smart home*.
 */
export function HomeScene() {
  const { t } = useI18n();

  return (
    <>
      <section id="home" data-scene="home" className="cinematic-section scene-home">
        <div className="cinematic-sticky scene-stage split-stage split-stage-reverse">
          <div className="scene-copy home-heading">
            <p className="scene-kicker">{t("Home")}</p>
            <h2>{t("Your home. Understood.")}</h2>
          </div>

          <div className="beat-stack home-beats">
            <div data-home-beat>
              <span className="event-time">08:15</span>
              <h3>{t("Nobody's home.")}</h3>
            </div>
            <div data-home-beat>
              <span className="automation-indicator">
                <i data-automation-pulse />
              </span>
              <h3>{t("Cleaning started automatically.")}</h3>
            </div>
          </div>

          <IPhoneStage
            className="scene-device home-device"
            width="clamp(270px, 25vw, 360px)"
            time="8:15"
            label={t("The Home screen in LifeOS")}
            alternateLabel={t("An automation LifeOS has just completed")}
            alternate={<AutomationScreen />}
          >
            <HomeScreen />
          </IPhoneStage>
        </div>
      </section>

      <SceneCoda
        kicker={t("Home")}
        title={t("Your home, intelligently managed.")}
        lead={t(
          "Rooms, chores, maintenance and inventory in one place. LifeOS tracks how each room is actually doing and only asks for what is behind.",
        )}
      >
        <div className="coda-split">
          <div>
            <ScenePoints
              tint="var(--area-home)"
              points={[
                t("Rooms"),
                t("Chores"),
                t("Maintenance"),
                t("Inventory"),
                t("Smart devices"),
              ]}
            />
            <StatCallout
              tint="var(--area-home)"
              value={t("Home secure")}
              detail={t("Everything under control.")}
            />
          </div>

          <div>
            <p className="coda-subhead">{t("Your home reacts to your life.")}</p>
            <p className="coda-note">
              {t(
                "LifeOS connects what your calendar, your location and your home already know. When you allow it, it doesn't just suggest the next step — it takes it.",
              )}
            </p>
            <SmartHomeExamples />
          </div>
        </div>
      </SceneCoda>
    </>
  );
}
