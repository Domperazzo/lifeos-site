"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { reducedTransition } from "@/components/ui/reveal";
import { StatusBar } from "./ios/StatusBar";
import { HomeIndicator } from "./ios/HomeIndicator";
import { useI18n } from "@/components/i18n/I18nProvider";

/*
  La scocca, una sola per tutto il sito.

  Geometria vettoriale, finitura grafite presa dallo shot Blender: telaio
  scuro, alone da studio, velo freddo sul vetro. Il render resta nella
  pipeline (`docs/RENDER_PIPELINE.md`) per gli scorci obliqui, dove la
  prospettiva CSS non regge; per le inquadrature frontali questa scocca è
  più nitida, non pesa nulla e non si ammorbidisce quando una scena la
  ingrandisce.

  Perché non il raster anche qui: montare una UI React sotto un PNG
  richiede che il rettangolo dello schermo combaci con l'apertura del
  display. Se il contenitore ha un fondo o un raggio propri, spuntano agli
  angoli. Qui il bordo *è* l'elemento, non un'immagine dietro a un
  elemento, e il problema non si pone.

  Proporzioni reali di un iPhone 16/17 Pro (in punti):
  display 402 × 874 · raggio scocca 62 · Dynamic Island 125 × 36,7 a 11 dal
  bordo · safe area 59 in alto e 34 in basso. Tutte le misure qui sotto
  sono frazioni della larghezza del device, così il telefono resta
  credibile a qualunque dimensione.
*/
const RATIO = 874 / 402;

interface IPhoneMockupProps {
  children: React.ReactNode;
  /** Larghezza CSS del device: accetta qualunque lunghezza, anche `clamp()`. */
  width?: string;
  /** Rotazione in gradi (composizioni a più telefoni). */
  rotation?: number;
  scale?: number;
  shadow?: boolean;
  /** Ora mostrata nella status bar. */
  time?: string;
  /** Nasconde la status bar quando la schermata la disegna da sé. */
  bare?: boolean;
  className?: string;
  screenClassName?: string;
  /** Etichetta per chi usa uno screen reader. */
  label?: string;
  /**
   * Il device contiene comandi veri (la demo interattiva).
   *
   * Cambia il ruolo ARIA: `img` riassume tutto in una parola sola — che è
   * giusto per un mockup, ed è esattamente sbagliato quando dentro c'è una
   * tab bar da usare, perché la nasconde a chi legge con la tastiera.
   */
  interactive?: boolean;
  /** Seconda schermata sovrapposta, per le transizioni causa-effetto. */
  alternate?: React.ReactNode;
  /** Toglie l'alone: in una composizione fitta due aloni fanno foschia. */
  glow?: boolean;
}

export function IPhoneMockup({
  children,
  width = "clamp(230px, 76vw, 300px)",
  rotation = 0,
  scale = 1,
  shadow = true,
  time = "9:41",
  bare = false,
  className,
  screenClassName,
  label,
  interactive = false,
  alternate,
  glow = true,
}: IPhoneMockupProps) {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const tilt = reduceMotion ? 0 : rotation;

  return (
    <div
      className={cn("relative select-none", className)}
      style={
        {
          "--dw": width,
          width: "var(--dw)",
          transform: `rotate(${tilt}deg) scale(${scale})`,
        } as React.CSSProperties
      }
      role={interactive ? "group" : "img"}
      aria-label={label ?? t("LifeOS on iPhone")}
    >
      {/* Alone da studio: la stessa luce che nel render veniva dal set. */}
      {glow ? <div aria-hidden className="device-studio-light" /> : null}

      {/* Tasti laterali: piccoli, ma senza di loro il device non regge. */}
      <SideButtons />

      {/* Scocca in titanio grafite. Il gradiente descrive un cilindro
          metallico scuro: spigolo acceso, faccia in ombra, ritorno di luce
          sul bordo opposto. */}
      <div
        className="relative rounded-[calc(var(--dw)*0.154)] p-[calc(var(--dw)*0.0088)]"
        style={{
          background:
            "linear-gradient(150deg, #6d7681 0%, #2c333b 14%, #878f98 30%, #363d45 52%, #1b2026 74%, #5c646d 92%, #232930 100%)",
          boxShadow: shadow
            ? "0 2.5rem 4rem -1rem rgb(4 7 11 / 0.62), 0 0 0 1px rgb(150 165 182 / 0.09)"
            : undefined,
        }}
      >
        {/* Cornice nera fra scocca e display */}
        <div className="relative rounded-[calc(var(--dw)*0.1452)] bg-[#04060a] p-[calc(var(--dw)*0.0162)]">
          <div
            className={cn(
              "ios-screen relative overflow-hidden rounded-[calc(var(--dw)*0.129)] bg-bg",
              screenClassName,
            )}
            style={{ aspectRatio: `402 / ${Math.round(402 * RATIO)}` }}
          >
            <div data-device-primary className={alternate ? "absolute inset-0" : undefined}>
              {!bare && <StatusBar time={time} />}
              {children}
              <HomeIndicator />
            </div>

            {/* Seconda schermata sovrapposta: le scene causa-effetto la
                fanno emergere sotto la prima invece di rimontare il device. */}
            {alternate ? (
              <div data-device-alternate className="absolute inset-0 opacity-0" aria-hidden>
                {!bare && <StatusBar time={time} />}
                {alternate}
                <HomeIndicator />
              </div>
            ) : null}
          </div>

          <DynamicIsland />

          {/* Vetro: velo freddo in alto, diagonale appena percepibile. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-40 rounded-[calc(var(--dw)*0.1452)]"
            style={{
              background:
                "linear-gradient(112deg, rgb(255 255 255 / 0.085) 0%, transparent 18%, transparent 74%, rgb(160 200 255 / 0.05) 100%), linear-gradient(180deg, rgb(108 174 230 / 0.045), transparent 24%)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Riflesso: una diagonale appena accennata, non un effetto 3D. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[calc(var(--dw)*0.154)] mix-blend-overlay"
          style={{
            background:
              "linear-gradient(112deg, rgb(255 255 255 / 0.22) 0%, transparent 26%, transparent 68%, rgb(255 255 255 / 0.1) 100%)",
          }}
        />
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-[calc(var(--dw)*0.0435)] z-30 flex -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[calc(var(--dw)*0.026)]"
      style={{
        width: "calc(var(--dw) * 0.311)",
        height: "calc(var(--dw) * 0.0913)",
      }}
    >
      {/* Fotocamera frontale, appena distinguibile dal nero dell'isola. */}
      <span
        className="rounded-full bg-[#12161c]"
        style={{ width: "calc(var(--dw) * 0.032)", height: "calc(var(--dw) * 0.032)" }}
      >
        <span className="block size-full scale-[0.42] rounded-full bg-[#1d2a3a]" />
      </span>
    </div>
  );
}

function SideButtons() {
  // Grafite, non cromo: dei tasti chiari su fondo scuro leggono come
  // artefatti fuori sagoma invece che come tasti.
  const metal =
    "absolute rounded-[2px] bg-gradient-to-b from-[#8a939d] via-[#454d56] to-[#767f89]";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Tasto Azione */}
      <span
        className={cn(metal, "left-[calc(var(--dw)*-0.006)]")}
        style={{ top: "13.4%", width: "calc(var(--dw) * 0.009)", height: "calc(var(--dw) * 0.072)" }}
      />
      {/* Volume su / giù */}
      <span
        className={cn(metal, "left-[calc(var(--dw)*-0.006)]")}
        style={{ top: "20.6%", width: "calc(var(--dw) * 0.009)", height: "calc(var(--dw) * 0.11)" }}
      />
      <span
        className={cn(metal, "left-[calc(var(--dw)*-0.006)]")}
        style={{ top: "33.4%", width: "calc(var(--dw) * 0.009)", height: "calc(var(--dw) * 0.11)" }}
      />
      {/* Tasto laterale + controllo fotocamera */}
      <span
        className={cn(metal, "right-[calc(var(--dw)*-0.006)]")}
        style={{ top: "25%", width: "calc(var(--dw) * 0.009)", height: "calc(var(--dw) * 0.155)" }}
      />
      <span
        className={cn(metal, "right-[calc(var(--dw)*-0.005)]")}
        style={{ top: "45%", width: "calc(var(--dw) * 0.008)", height: "calc(var(--dw) * 0.075)" }}
      />
    </div>
  );
}

/** Variante animata: entra ruotando appena verso la verticale. */
export function AnimatedIPhone({
  delay = 0,
  from = 0,
  ...props
}: IPhoneMockupProps & { delay?: number; from?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, rotate: from, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, rotate: props.rotation ?? 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={reducedTransition(
        { duration: 0.85, delay, ease: [0.22, 0.61, 0.36, 1] },
        reduceMotion,
      )}
      className="will-change-transform"
    >
      <IPhoneMockup {...props} rotation={0} />
    </motion.div>
  );
}
