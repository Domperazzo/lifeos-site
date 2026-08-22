"use client";

import { cn } from "@/lib/utils";
import { StatusBar } from "./ios/StatusBar";
import { HomeIndicator } from "./ios/HomeIndicator";

/*
  Montaggio di un render con la UI React sovrapposta.

  **Non è montato da nessuna scena, ed è deliberato.** Tutte le
  inquadrature frontali usano la scocca vettoriale `IPhoneMockup`. Questo
  file è la metà d'integrazione della pipeline Blender, tenuta pronta per
  gli scorci obliqui — l'unico caso in cui la prospettiva CSS non regge.
  Insieme allo script e alla scena in `render-source/` è ciò che permette
  di aggiungere uno shot obliquo senza rifare il ragionamento da capo.

  I corner point arrivano dal manifest, che lo script rigenera a ogni
  render in `web/public/assets/renders/iphone/manifest.json`. La cartella
  oggi non esiste: nessuno shot obliquo è in pagina, e degli asset che
  nessuno referenzia non hanno motivo di stare nell'export.

  Regola che il montaggio precedente violava: **niente sfondo né
  border-radius sul contenitore**. Il PNG ha l'alpha e disegna già la sua
  sagoma; un rettangolo arrotondato dietro non può che spuntare agli
  angoli, perché il suo raggio non è il raggio del device renderizzato. Era
  l'alone chiaro che si vedeva attorno al telefono in home.

  Serve per gli scorci obliqui, dove la scocca CSS non regge la
  prospettiva. Le scene frontali usano `IPhoneShell`.

  I quattro valori dei corner arrivano dal manifest generato da Blender.
*/

export interface RenderCorners {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface RenderShellProps {
  src: string;
  corners: RenderCorners;
  /** Larghezza in px del contenitore: serve a scalare il raggio del display. */
  width: number;
  label: string;
  children: React.ReactNode;
  time?: string;
  screenClassName?: string;
  studioLight?: boolean;
}

export function RenderShell({
  src,
  corners,
  width,
  label,
  children,
  time = "9:41",
  screenClassName,
  studioLight = false,
}: RenderShellProps) {
  // Il raggio del display è una frazione della larghezza *dello schermo*,
  // non del PNG: altrimenti cambia ogni volta che cambia l'inquadratura.
  const screenWidth = width * (corners.right - corners.left);

  return (
    <div
      className="relative isolate select-none"
      style={{ width, aspectRatio: "1000 / 2100" }}
      role="img"
      aria-label={label}
    >
      {studioLight ? <div aria-hidden className="device-studio-light" /> : null}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 z-0 size-full object-fill"
        style={{ filter: "drop-shadow(0 2.2rem 3.2rem rgb(4 7 12 / 0.55))" }}
      />

      <div
        className={cn("ios-screen absolute z-10 overflow-hidden bg-bg", screenClassName)}
        style={{
          left: `${corners.left * 100}%`,
          top: `${corners.top * 100}%`,
          width: `${(corners.right - corners.left) * 100}%`,
          height: `${(corners.bottom - corners.top) * 100}%`,
          borderRadius: screenWidth * 0.129,
        }}
      >
        <StatusBar time={time} />
        {children}
        <HomeIndicator />

        <DynamicIsland screenWidth={screenWidth} />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40"
          style={{
            background:
              "linear-gradient(112deg, rgb(255 255 255 / 0.09), transparent 17%, transparent 72%), linear-gradient(180deg, rgb(108 174 230 / 0.035), transparent 26%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}

function DynamicIsland({ screenWidth }: { screenWidth: number }) {
  // 125 × 36,7 punti su un display largo 402: le stesse frazioni della
  // scocca CSS, così i due device restano confrontabili.
  return (
    <div
      aria-hidden
      className="absolute left-1/2 z-30 flex -translate-x-1/2 items-center justify-end rounded-full bg-black"
      style={{
        top: screenWidth * 0.0274,
        width: screenWidth * 0.311,
        height: screenWidth * 0.0913,
        paddingRight: screenWidth * 0.0249,
      }}
    >
      <span
        className="rounded-full bg-[#12161c]"
        style={{ width: screenWidth * 0.032, height: screenWidth * 0.032 }}
      >
        <span className="block size-full scale-[0.42] rounded-full bg-[#1d2a3a]" />
      </span>
    </div>
  );
}
