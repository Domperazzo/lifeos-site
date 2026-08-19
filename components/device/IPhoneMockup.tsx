"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { reducedTransition } from "@/components/ui/reveal";
import { StatusBar } from "./ios/StatusBar";
import { HomeIndicator } from "./ios/HomeIndicator";

/*
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
}: IPhoneMockupProps) {
  const reduceMotion = useReducedMotion();
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
      aria-label={label ?? "LifeOS on iPhone"}
    >
      {/* Tasti laterali: piccoli, ma senza di loro il device non regge. */}
      <SideButtons />

      {/* Scocca in titanio */}
      <div
        className="relative rounded-[calc(var(--dw)*0.154)] p-[calc(var(--dw)*0.0085)]"
        style={{
          background:
            "linear-gradient(145deg, #d9dde2 0%, #8f979f 18%, #f2f4f6 38%, #a9b1b8 62%, #6f777e 82%, #c9ced3 100%)",
          boxShadow: shadow ? "var(--shadow-device)" : undefined,
        }}
      >
        {/* Cornice nera fra scocca e display */}
        <div className="relative rounded-[calc(var(--dw)*0.1455)] bg-[#05070a] p-[calc(var(--dw)*0.0165)]">
          <div
            className={cn(
              "ios-screen relative overflow-hidden rounded-[calc(var(--dw)*0.129)] bg-bg",
              screenClassName,
            )}
            style={{ aspectRatio: `402 / ${Math.round(402 * RATIO)}` }}
          >
            {!bare && <StatusBar time={time} />}
            {children}
            <HomeIndicator />
          </div>

          <DynamicIsland />
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
  const metal =
    "absolute rounded-[2px] bg-gradient-to-b from-[#c3c9cf] via-[#8b9299] to-[#b6bcc2]";
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
