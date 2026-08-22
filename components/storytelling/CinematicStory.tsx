"use client";

import { useRef } from "react";
import { AreasScene } from "./AreasScene";
import { AskScene } from "./AskScene";
import { AutomationsScene } from "./AutomationsScene";
import { ConnectedScene } from "./ConnectedScene";
import { DevicesScene } from "./DevicesScene";
import { EcosystemScene } from "./EcosystemScene";
import { FinalScene } from "./FinalScene";
import { HealthScene } from "./HealthScene";
import { HeroScene } from "./HeroScene";
import { HomeScene } from "./HomeScene";
import { PrivacyScene } from "./PrivacyScene";
import { TodayScene } from "./TodayScene";
import { WealthScene } from "./WealthScene";
import { useCinematicMotion } from "./use-cinematic-motion";

/*
  La homepage, in tredici scene.

  Non è un elenco di funzioni con sopra delle animazioni: è una sequenza,
  e l'ordine porta un argomento. Desiderio (01), modello mentale (02),
  prova (03-05), conseguenza (06-07), onestà su cosa manca (08), sintesi
  (09), su cosa gira (10-11), a quali condizioni (12), come si entra (13).

  Ogni scena sticky afferma una cosa sola in caratteri enormi; la coda
  editoriale subito sotto porta i fatti che la reggono — è lì che sono
  rientrati i contenuti che il sito aveva prima della riscrittura
  cinematica, invece di restare appesi in fondo come sezioni separate.

  Vedi `docs/APPLE_STYLE_STORYBOARD.md` per la regia scena per scena.
*/
export function CinematicStory() {
  const root = useRef<HTMLElement>(null);
  useCinematicMotion(root);

  return (
    <main id="main" ref={root} className="cinematic-page" data-cinematic-root>
      <HeroScene />
      <AreasScene />
      <TodayScene />
      <HomeScene />
      <WealthScene />
      <AutomationsScene />
      <AskScene />
      <HealthScene />
      <ConnectedScene />
      <DevicesScene />
      <EcosystemScene />
      <PrivacyScene />
      <FinalScene />
      {process.env.NODE_ENV !== "production" ? (
        <div className="motion-debug-panel" aria-hidden>
          motion debug · ScrollTrigger markers enabled
        </div>
      ) : null}
    </main>
  );
}
