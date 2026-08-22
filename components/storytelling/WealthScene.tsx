"use client";

import { IPhoneStage } from "@/components/device/IPhoneStage";
import { FinanceScreen } from "@/components/device/screens/FinanceScreen";
import { StatCallout } from "@/components/features/StatCallout";
import { SceneCoda, ScenePoints } from "./SceneCoda";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Scena 05 — Patrimonio.
 *
 * Lo sticky mostra il grafico che si disegna mentre i tre numeri
 * arrivano. La coda dice di cosa è fatto quel numero unico: conti, carte,
 * investimenti, costi ricorrenti.
 */
export function WealthScene() {
  const { t } = useI18n();

  return (
    <>
      <section id="wealth" data-scene="wealth" className="cinematic-section scene-wealth">
        <div className="cinematic-sticky scene-stage split-stage">
          <div className="wealth-copy">
            <p className="scene-kicker">{t("Finance")}</p>
            <h2>{t("Know where you stand. Always.")}</h2>

            <div className="wealth-metrics" aria-label={t("Financial overview")}>
              <div data-wealth-metric>
                <span>{t("Net worth")}</span>
                <strong>€184,320</strong>
              </div>
              <div data-wealth-metric>
                <span>{t("this month")}</span>
                <strong className="positive">+2.4%</strong>
              </div>
              <div data-wealth-metric>
                <span>{t("Spending")}</span>
                <strong>{t("18% below your average")}</strong>
              </div>
            </div>
          </div>

          <IPhoneStage
            className="scene-device wealth-device"
            width="clamp(270px, 26vw, 372px)"
            label={t("LifeOS Finance screen on iPhone")}
          >
            <FinanceScreen scrollDrivenChart />
          </IPhoneStage>
        </div>
      </section>

      <SceneCoda
        kicker={t("Finance")}
        title={t("Know exactly where you stand.")}
        lead={t(
          "Accounts, cards, investments and recurring costs add up to a single number — and a plain sentence explaining which way it is moving.",
        )}
      >
        <div className="coda-split">
          <ScenePoints
            tint="var(--area-finance)"
            points={[
              t("Net worth"),
              t("Accounts"),
              t("Cards"),
              t("Investments"),
              t("Cash flow"),
              t("Budget"),
            ]}
          />
          <StatCallout
            tint="var(--area-finance)"
            value={t("+2.4% this month")}
            detail={t("You spent 18% less than your average.")}
          />
        </div>
      </SceneCoda>
    </>
  );
}
