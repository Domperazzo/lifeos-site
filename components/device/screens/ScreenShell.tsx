import { cn } from "@/lib/utils";

/**
 * Il contenitore comune a tutte le schermate mostrate nei device: safe
 * area in alto, tinta ambientale dell'area (come `View.lifeCanvas(tint:)`
 * nell'app) e spazio in fondo per la tab bar.
 */
export function ScreenShell({
  children,
  tint = "var(--accent)",
  className,
  bottomPadding = 100,
}: {
  children: React.ReactNode;
  tint?: string;
  className?: string;
  bottomPadding?: number;
}) {
  return (
    <div
      className={cn("life-canvas absolute inset-0 flex flex-col overflow-hidden bg-bg", className)}
      style={
        {
          "--tint": tint,
          paddingTop: "calc(var(--pt) * 59)",
          paddingBottom: `calc(var(--pt) * ${bottomPadding})`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** Barra degli strumenti: le azioni circolari in cima alle schermate. */
export function ScreenToolbar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="ios-gutter flex items-center justify-between"
      style={{ height: "calc(var(--pt) * 42)" }}
    >
      {children}
    </div>
  );
}

export function ToolbarButton({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="glass grid place-items-center rounded-full text-ink-secondary hairline"
      style={{ width: "calc(var(--pt) * 32)", height: "calc(var(--pt) * 32)" }}
    >
      {children}
    </span>
  );
}

/** Titolo grande di una schermata, con eventuale sottotitolo. */
export function ScreenTitle({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="ios-gutter" style={{ paddingTop: "calc(var(--pt) * 6)" }}>
      {/* Non è un `h2`: la struttura dei titoli della pagina descrive la
          pagina, non la schermata fotografata dentro il telefono. */}
      <p className="ios-largetitle">{title}</p>
      {subtitle ? (
        <p className="ios-subhead text-ink-tertiary" style={{ marginTop: "calc(var(--pt) * 4)" }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** L'area che scorre: nei mockup non scorre davvero, ma ne ha il ritmo. */
export function ScreenContent({
  children,
  gap = 14,
  className,
}: {
  children: React.ReactNode;
  gap?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("ios-gutter flex flex-1 flex-col overflow-hidden", className)}
      style={{ gap: `calc(var(--pt) * ${gap})`, paddingTop: `calc(var(--pt) * ${gap + 4})` }}
    >
      {children}
    </div>
  );
}
