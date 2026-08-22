"use client";

import { ArrowRight, Mic } from "lucide-react";
import { IPhoneStage } from "@/components/device/IPhoneStage";
import { TransactionScreen } from "@/components/device/screens/TransactionScreen";
import { WidgetMockup } from "@/components/ecosystem/WidgetMockup";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Scena 11 — L'ecosistema.
 *
 * Il posto giusto è subito dopo iPhone e iPad: la scena precedente ha
 * appena mostrato che è *un'app sola su due device*, e questa mostra dove
 * quell'app arriva quando non la si apre affatto — widget, Siri,
 * Shortcuts, iCloud, HomeKit.
 *
 * La catena Siri → App Intent → transazione registrata è l'unico momento
 * del film in cui il device mostra qualcosa che l'utente non ha chiesto
 * all'app: l'ha chiesto al telefono.
 */
export function EcosystemScene() {
  const { t } = useI18n();
  const integrations = [
    {
      name: t("App Intents & Shortcuts"),
      detail: t(
        "Complete a task or log an expense without opening the app, and put those same actions inside your own automations.",
      ),
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
    <section id="ecosystem" data-scene="ecosystem" className="editorial-scene scene-ecosystem">
      <div className="editorial-inner ecosystem-layout">
        <Reveal className="ecosystem-heading">
          <p className="scene-kicker">{t("Ecosystem")}</p>
          <h2>{t("Built for the Apple ecosystem.")}</h2>
          <p>
            {t(
              "Not a web app in a wrapper. LifeOS is a native iOS app that uses the parts of the system you already rely on.",
            )}
          </p>
        </Reveal>

        <div className="ecosystem-grid">
          <Reveal className="ecosystem-card">
            <p className="ecosystem-label">{t("Home Screen widget")}</p>
            <WidgetMockup />
            <p className="ecosystem-note">
              {t(
                "The answer before the app. Glance, and you already know whether anything needs you.",
              )}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="ecosystem-card">
            <p className="ecosystem-label">{t("Deeper in the system")}</p>
            <ul className="ecosystem-integrations">
              {integrations.map((integration) => (
                <li key={integration.name}>
                  <p>{integration.name}</p>
                  <p>{integration.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Siri → App Intent → transazione registrata */}
        <Reveal className="ecosystem-siri">
          <div>
            <p className="ecosystem-label">{t("Siri")}</p>
            <div className="siri-utterance">
              <span aria-hidden>
                <Mic />
              </span>
              <p>{t("“Log 25 euros for dinner.”")}</p>
            </div>

            <p className="siri-result">
              <ArrowRight aria-hidden />
              {t("LifeOS files it under Restaurants, on your main account, today.")}
            </p>

            <p className="siri-note">
              {t(
                "The same App Intent works from Shortcuts, from the Lock Screen and from a widget button — because it is the app's own action, not a copy of it.",
              )}
            </p>
          </div>

          <IPhoneStage
            className="siri-device"
            width="clamp(214px, 20vw, 268px)"
            label={t("The transaction Siri just created in LifeOS")}
          >
            <TransactionScreen />
          </IPhoneStage>
        </Reveal>
      </div>
    </section>
  );
}
