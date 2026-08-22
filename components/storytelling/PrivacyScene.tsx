"use client";

import { Check, Cloud, LockKeyhole, ServerOff, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SceneCoda } from "./SceneCoda";
import { useI18n } from "@/components/i18n/I18nProvider";

/*
  Ogni affermazione qui è verificabile nel codice dell'app.
  Riferimenti: docs/LifeCloud_Privacy_Model.md §1-§3, §9, §11.
*/
const privacyFacts = [
  {
    icon: ServerOff,
    title: "No LifeOS server.",
    detail: "The app makes no network calls of its own.",
  },
  {
    icon: Cloud,
    title: "Your iCloud account.",
    detail: "Sync runs through the Apple account you already control.",
  },
  {
    icon: LockKeyhole,
    title: "Sharing is explicit.",
    detail: "Household members never see accounts, balances or investments.",
  },
] as const;

const principleKeys = [
  {
    title: "What it learns stays on your iPhone",
    detail:
      "The habits LifeOS observes — when you actually open the app, what you tend to skip — live in a store that is never synced, and are deleted after 120 days.",
  },
  {
    title: "The default is the closed one",
    detail:
      "Belonging to a household does not make what you create shared. Sharing is a deliberate act, never a side effect.",
  },
  {
    title: "Data minimisation, by architecture",
    detail:
      "Shared records carry a subset of fields, not whole entities. What the other person does not need is not sent.",
  },
  {
    title: "No behavioural telemetry",
    detail:
      "Diagnostics record how many operations ran and which category of error occurred. Never amounts, never names, never contents.",
  },
  {
    title: "Protected on the device too",
    detail:
      "Files on disk use iOS data protection, so they stay encrypted until you first unlock your iPhone after a restart.",
  },
] as const;

const sharedKeys = [
  "The home and its rooms",
  "Chores and who did them",
  "The cleaning schedule",
  "How much time each person has",
] as const;

const neverSharedKeys = [
  "Accounts and balances",
  "Net worth and investments",
  "Income and personal goals",
  "Wellbeing, notes, private routines",
  "Work shifts and observed habits",
] as const;

/**
 * Scena 12 — Privacy, e il perché del prodotto.
 *
 * Le due sezioni stanno insieme per un motivo preciso: *Philosophy*
 * sosteneva che il software deve adattarsi alla vita, e la privacy è il
 * punto in cui quella frase o è vera nel codice o è marketing. Messa
 * subito dopo la tabella di ciò che gli altri non vedranno mai, si legge
 * come la conseguenza di una scelta architetturale, non come una
 * dichiarazione d'intenti.
 */
export function PrivacyScene() {
  const { t } = useI18n();

  return (
    <>
      <section id="security" data-scene="privacy" className="editorial-scene scene-privacy">
        <div className="editorial-inner privacy-layout">
          <div className="privacy-heading">
            <p className="scene-kicker">{t("Privacy")}</p>
            <h2>
              {t("Your life is personal.")}
              <br />
              <span>{t("It should stay that way.")}</span>
            </h2>
          </div>

          <div className="privacy-facts">
            {privacyFacts.map(({ icon: Icon, title, detail }) => (
              <article key={title}>
                <Icon aria-hidden />
                <h3>{t(title)}</h3>
                <p>{t(detail)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SceneCoda
        tight
        kicker={t("Enforced in the code")}
        title={t("Your life belongs to you.")}
        lead={t(
          "LifeOS holds some of the most personal data a person has. That makes privacy an architectural decision, not a settings screen — so it is enforced in the code, and covered by tests.",
        )}
      >
        <div className="privacy-principles">
          {principleKeys.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.06} className="privacy-principle">
              <h4>{t(principle.title)}</h4>
              <p>{t(principle.detail)}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="privacy-boundary">
          <div>
            <p className="ecosystem-label">
              {t("What the people you share a home with see")}
            </p>
            <ul>
              {sharedKeys.map((item) => (
                <li key={item}>
                  <span className="boundary-yes">
                    <Check strokeWidth={3.2} />
                  </span>
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="ecosystem-label">{t("What they never see")}</p>
            <ul>
              {neverSharedKeys.map((item) => (
                <li key={item}>
                  <span className="boundary-no">
                    <X strokeWidth={3} />
                  </span>
                  {t(item)}
                </li>
              ))}
            </ul>
            <p className="coda-note">
              {t(
                "This boundary is verified end to end by an automated test across two devices — not by a promise on a marketing page.",
              )}
            </p>
          </div>
        </Reveal>

        {/* La filosofia chiude la scena: è la frase che la privacy dimostra.
            Porta `#about`, che in `main` era la sua sezione dedicata. */}
        <Reveal id="about" className="philosophy-statement">
          <h3>
            {t("Software should adapt to your life.")}
            <span>{t("Not the other way around.")}</span>
          </h3>
          <div>
            <p>
              {t(
                "Most software asks you to keep it updated, organised and tidy. You end up maintaining the tool instead of the life it was supposed to help with.",
              )}
            </p>
            <p>
              {t(
                "LifeOS is built the other way round. It learns how your life actually works — your rooms, your money, your week — and keeps everything aligned, so the system does the remembering.",
              )}
            </p>
          </div>
        </Reveal>
      </SceneCoda>
    </>
  );
}
