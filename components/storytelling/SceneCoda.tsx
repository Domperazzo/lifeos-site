"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/*
  La coda di una scena.

  Le scene sticky affermano una cosa sola, in caratteri enormi. Ma
  un'affermazione senza prova è uno slogan, ed è esattamente il difetto
  che le sezioni di `main` non avevano: lì ogni titolo era seguito dai
  fatti che lo reggono.

  La coda è il posto dove quei fatti rientrano nel film. Sta nel flusso
  normale — nessun pin — subito dopo il momento cinematico, con una scala
  tipografica di un gradino più bassa: si legge come la didascalia di
  quello che si è appena visto, non come una nuova sezione che ricomincia
  da capo.
*/

interface SceneCodaProps {
  kicker?: string;
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
  /** Riduce lo spazio sopra quando la scena precedente si chiude già bassa. */
  tight?: boolean;
}

export function SceneCoda({ kicker, title, lead, children, className, tight }: SceneCodaProps) {
  return (
    <div className={cn("scene-coda", tight && "scene-coda-tight", className)}>
      <div className="scene-coda-inner">
        <Reveal className="scene-coda-heading">
          {kicker ? <p className="scene-kicker">{kicker}</p> : null}
          <h3>{title}</h3>
          {lead ? <p className="scene-coda-lead">{lead}</p> : null}
        </Reveal>

        {children ? <div className="scene-coda-body">{children}</div> : null}
      </div>
    </div>
  );
}

/**
 * Le voci di un'area, come parole e non come card.
 *
 * `AreasSection` le mostrava dentro un blocco a due colonne con il proprio
 * device accanto. Qui il device l'ha già mostrato la scena sticky sopra:
 * ripeterlo raddoppierebbe la stessa immagine a due schermate di distanza.
 */
export function ScenePoints({ points, tint }: { points: string[]; tint: string }) {
  return (
    <ul className="scene-points" style={{ "--point-tint": tint } as React.CSSProperties}>
      {points.map((point, index) => (
        <Reveal as="li" key={point} delay={index * 0.05}>
          {point}
        </Reveal>
      ))}
    </ul>
  );
}
