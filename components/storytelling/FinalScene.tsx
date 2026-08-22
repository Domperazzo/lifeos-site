"use client";

import { ArrowRight } from "lucide-react";
import { IPhoneStage } from "@/components/device/IPhoneStage";
import { LifeScreen } from "@/components/device/screens/LifeScreen";
import { Reveal } from "@/components/ui/reveal";
import { roadmapAreas } from "@/lib/data";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Scena 13 — In sync.
 *
 * Il film torna alla semplicità iniziale: lo stesso device della scena 01,
 * la stessa schermata, un titolo solo. Poi due code brevi — quello che
 * arriverà, e come si entra.
 *
 * La roadmap sta **prima** della chiamata all'azione e non dopo: dichiarare
 * cosa non c'è ancora subito prima di chiedere un indirizzo email è una
 * scelta, non una svista. Chi si iscrive sa per cosa lo fa.
 */
export function FinalScene() {
  const { locale, t } = useI18n();
  const subject = locale === "it" ? "LifeOS%20accesso%20anticipato" : "LifeOS%20early%20access";

  return (
    <section id="get-lifeos" data-scene="final" className="editorial-scene scene-final">
      <div className="final-inner">
        <div className="final-copy">
          <h2>{t("Your life. In sync.")}</h2>
          <div className="final-actions">
            <a className="cinematic-button" href={`mailto:hello@lifeos.app?subject=${subject}`}>
              {t("Get LifeOS")}
              <ArrowRight aria-hidden />
            </a>
            <a className="cinematic-link" href="#inside">
              {t("See what's inside")}
            </a>
          </div>
        </div>

        <IPhoneStage
          className="final-device"
          width="clamp(238px, 21vw, 314px)"
          label={t("LifeOS daily dashboard on iPhone")}
        >
          <LifeScreen />
        </IPhoneStage>
      </div>

      <div className="final-coda">
        <Reveal className="roadmap-heading">
          <h3>{t("LifeOS is just getting started.")}</h3>
          <p>{t("Planned areas — not available yet.")}</p>
        </Reveal>

        <ul className="roadmap-list">
          {roadmapAreas.map((area, index) => (
            <Reveal key={area.title} as="li" delay={index * 0.05}>
              <span>{t(area.title)}</span>
              <span>{t(area.detail)}</span>
            </Reveal>
          ))}
        </ul>

        <Reveal className="final-invite">
          <h3>{t("Your life deserves a better operating system.")}</h3>
          <p>
            {t(
              "LifeOS is in private testing on iOS. Leave your email and you'll hear from us when the next round opens.",
            )}
          </p>
          <div className="final-actions">
            <a className="cinematic-button" href={`mailto:hello@lifeos.app?subject=${subject}`}>
              {t("Get early access")}
              <ArrowRight aria-hidden />
            </a>
            <a className="cinematic-link" href="#security">
              {t("Read the privacy model")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
