"use client";

import { cn } from "@/lib/utils";
import { IPhoneMockup } from "./IPhoneMockup";

interface IPhoneStageProps {
  children: React.ReactNode;
  alternate?: React.ReactNode;
  width?: string;
  label: string;
  alternateLabel?: string;
  className?: string;
  screenClassName?: string;
  time?: string;
  interactive?: boolean;
  glow?: boolean;
}

/**
 * Contratto stabile del device per la homepage cinematica.
 *
 * Le timeline GSAP puntano a `[data-device-stage]` e non sanno com'è fatta
 * la scocca dentro: è il motivo per cui cambiarla è costato un file solo.
 * Il wrapper esiste anche per un secondo motivo — `IPhoneMockup` applica
 * `transform` per rotazione e scala, e una scena che ne aggiunge un'altra
 * sullo stesso nodo la sovrascriverebbe.
 */
export function IPhoneStage({
  children,
  alternate,
  width = "clamp(260px, 25vw, 356px)",
  label,
  alternateLabel,
  className,
  screenClassName,
  time = "9:41",
  interactive = false,
  glow = true,
}: IPhoneStageProps) {
  return (
    <div
      className={cn("device-stage relative isolate", className)}
      style={{ width, "--dw": width } as React.CSSProperties}
      data-device-stage
    >
      <IPhoneMockup
        width={width}
        time={time}
        label={alternate ? `${label}. ${alternateLabel ?? ""}`.trim() : label}
        screenClassName={screenClassName}
        alternate={alternate}
        interactive={interactive}
        glow={glow}
      >
        {children}
      </IPhoneMockup>
    </div>
  );
}
