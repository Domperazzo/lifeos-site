"use client";

import { IPhoneStage } from "@/components/device/IPhoneStage";
import { AskScreen } from "@/components/device/screens/AskScreen";
import { getAskExamples } from "@/lib/data";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Scena 07 — Ask LifeOS.
 *
 * In `main` le tre domande erano pulsanti e un timer le faceva ruotare.
 * Qui il comando è lo scroll: ogni domanda occupa una fetta della scena,
 * e la risposta sul device cambia insieme alla domanda a fianco.
 *
 * Le tre schermate sono tutte nel DOM e sovrapposte, non montate a turno.
 * Uno scrub che monta e smonta componenti scatta, perché il browser deve
 * ricalcolare il layout nel mezzo di un'animazione: qui GSAP muove solo
 * `opacity`, che sta sul compositor.
 *
 * Le domande restano leggibili anche senza motore: sono testo nel flusso,
 * e con «riduci movimento» la scena non si pinna affatto.
 */
export function AskScene() {
  const { locale, t } = useI18n();
  const examples = getAskExamples(t, locale);

  return (
    <section id="ask" data-scene="ask" className="cinematic-section scene-ask">
      <div className="cinematic-sticky scene-stage split-stage split-stage-reverse">
        <div className="ask-copy">
          <p className="scene-kicker">{t("Ask LifeOS")}</p>
          <h2>{t("Ask your life anything.")}</h2>
          <p className="ask-lead">
            {t(
              "Not a chatbot with opinions. A system that already holds your accounts, your rooms and your week, answering from what it actually knows.",
            )}
          </p>

          <ol className="ask-questions">
            {examples.map((example) => (
              <li key={example.question} data-ask-question>
                <span aria-hidden>&gt;</span>
                <div>
                  <p className="ask-question">{example.question}</p>
                  <p className="ask-answer">
                    <strong>{example.answer}</strong> {example.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <IPhoneStage
          className="scene-device ask-device"
          width="clamp(252px, 23vw, 330px)"
          label={t("Asking LifeOS a question about your own data")}
        >
          <div className="ask-screens">
            {examples.map((example) => (
              <div key={example.question} data-ask-screen className="absolute inset-0">
                <AskScreen {...example} />
              </div>
            ))}
          </div>
        </IPhoneStage>
      </div>
    </section>
  );
}
