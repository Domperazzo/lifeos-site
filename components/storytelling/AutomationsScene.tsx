"use client";

import { IPhoneStage } from "@/components/device/IPhoneStage";
import { AutomationScreen } from "@/components/device/screens/AutomationScreen";
import { AutomationTimeline } from "@/components/automations/AutomationTimeline";
import { ContextChain } from "@/components/intelligence/ContextChain";
import { ScenarioCard } from "@/components/intelligence/ScenarioCard";
import { SceneCoda } from "./SceneCoda";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Scena 06 — Automazioni.
 *
 * Fonde due sezioni che in `main` erano separate e dicevano la stessa cosa
 * da due lati: *Automations* mostrava una giornata di lavoro silenzioso,
 * *Contextual intelligence* spiegava da dove venivano quelle decisioni.
 * Separate, la prima sembrava una lista di eventi e la seconda un
 * diagramma senza conseguenze. Insieme sono causa ed effetto.
 *
 * Il momento sticky tiene il device fermo mentre la giornata scorre
 * accanto; la coda mostra le cinque fonti che LifeOS legge e lo scenario
 * completo delle 08:15.
 */
export function AutomationsScene() {
  const { t } = useI18n();

  return (
    <>
      <section
        id="automations"
        data-scene="automations"
        className="cinematic-section scene-automations"
      >
        <div className="cinematic-sticky scene-stage split-stage">
          <div className="scene-copy automations-copy">
            <p className="scene-kicker">{t("Automations")}</p>
            <h2>
              {t("Less managing.")}
              <br />
              {t("More living.")}
            </h2>
            <p>
              {t(
                "A day of LifeOS working quietly. You are not meant to watch any of this happen — it is here so you can see what you would otherwise never notice.",
              )}
            </p>
          </div>

          <IPhoneStage
            className="scene-device automations-device"
            width="clamp(258px, 24vw, 344px)"
            time="8:15"
            label={t("An automation LifeOS has just completed")}
          >
            <AutomationScreen />
          </IPhoneStage>
        </div>
      </section>

      <SceneCoda
        kicker={t("A day, from the inside")}
        title={t("LifeOS understands context.")}
        lead={t(
          "A calendar knows your day. A thermostat knows your home. Neither knows both. LifeOS reads across every area at once — which is the only place a useful decision can come from.",
        )}
      >
        {/* La giornata intera a sinistra, le cinque fonti che la
            producono a destra: sono la stessa cosa vista da due lati. */}
        <div className="automations-reasoning">
          <AutomationTimeline />
          <ContextChain />
        </div>

        {/* Poi un momento solo di quella giornata, per esteso. */}
        <div className="automations-scenario">
          <ScenarioCard />
        </div>
      </SceneCoda>
    </>
  );
}
