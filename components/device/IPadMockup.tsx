"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HomeIndicator } from "./ios/HomeIndicator";
import { StatusBar } from "./ios/StatusBar";

/*
  Proporzioni di un iPad Pro 11" in orizzontale: display 1210 × 834 punti.
  La fotocamera frontale sta al centro del lato lungo — dal modello M4 è
  lì che Apple l'ha spostata, ed è il dettaglio che distingue un iPad
  recente da uno disegnato a memoria.
*/
const RATIO = 834 / 1210;

interface IPadMockupProps {
  children: React.ReactNode;
  /** Larghezza CSS del device: accetta qualunque lunghezza, anche `clamp()`. */
  width?: string;
  rotation?: number;
  shadow?: boolean;
  time?: string;
  className?: string;
  label?: string;
}

export function IPadMockup({
  children,
  width = "clamp(320px, 92vw, 780px)",
  rotation = 0,
  shadow = true,
  time = "9:41",
  className,
  label,
}: IPadMockupProps) {
  const reduceMotion = useReducedMotion();
  const tilt = reduceMotion ? 0 : rotation;

  return (
    <div
      className={cn("relative select-none", className)}
      style={
        {
          "--dw": width,
          width: "var(--dw)",
          transform: `rotate(${tilt}deg)`,
        } as React.CSSProperties
      }
      role="img"
      aria-label={label ?? "LifeOS on iPad"}
    >
      <SideButtons />

      {/* Scocca in alluminio */}
      <div
        className="relative rounded-[calc(var(--dw)*0.032)] p-[calc(var(--dw)*0.0045)]"
        style={{
          background:
            "linear-gradient(145deg, #d5d9de 0%, #9aa1a8 20%, #eef0f2 42%, #a8b0b7 66%, #7d848b 84%, #c8ccd1 100%)",
          boxShadow: shadow ? "var(--shadow-device)" : undefined,
        }}
      >
        {/* Cornice nera */}
        <div className="relative rounded-[calc(var(--dw)*0.0285)] bg-[#05070a] p-[calc(var(--dw)*0.0165)]">
          <div
            className={cn(
              "ios-screen ipad-screen relative overflow-hidden rounded-[calc(var(--dw)*0.0148)] bg-bg",
            )}
            style={{ aspectRatio: `1210 / ${Math.round(1210 * RATIO)}` }}
          >
            <StatusBar time={time} variant="ipad" />
            {children}
            <HomeIndicator />
          </div>

          {/* Fotocamera frontale, al centro del lato lungo. */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[calc(var(--dw)*0.0068)] -translate-x-1/2 rounded-full bg-[#12161c]"
            style={{ width: "calc(var(--dw) * 0.0052)", height: "calc(var(--dw) * 0.0052)" }}
          >
            <span className="block size-full scale-[0.5] rounded-full bg-[#1d2a3a]" />
          </span>
        </div>

        {/* Riflesso: una diagonale appena accennata. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[calc(var(--dw)*0.032)] mix-blend-overlay"
          style={{
            background:
              "linear-gradient(112deg, rgb(255 255 255 / 0.18) 0%, transparent 24%, transparent 70%, rgb(255 255 255 / 0.09) 100%)",
          }}
        />
      </div>
    </div>
  );
}

function SideButtons() {
  const metal =
    "absolute rounded-[2px] bg-gradient-to-r from-[#c3c9cf] via-[#8b9299] to-[#b6bcc2]";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Tasto di accensione, sul bordo superiore accanto alla fotocamera. */}
      <span
        className={cn(metal, "top-[calc(var(--dw)*-0.0035)]")}
        style={{ right: "12%", width: "calc(var(--dw) * 0.055)", height: "calc(var(--dw) * 0.0045)" }}
      />
      {/* Volume, sul bordo superiore verso destra. */}
      <span
        className={cn(metal, "top-[calc(var(--dw)*-0.0035)]")}
        style={{ right: "4.5%", width: "calc(var(--dw) * 0.03)", height: "calc(var(--dw) * 0.0045)" }}
      />
      <span
        className={cn(metal, "top-[calc(var(--dw)*-0.0035)]")}
        style={{ right: "8.2%", width: "calc(var(--dw) * 0.03)", height: "calc(var(--dw) * 0.0045)" }}
      />
    </div>
  );
}
