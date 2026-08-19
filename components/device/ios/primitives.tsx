import { cn } from "@/lib/utils";

/**
 * Riquadro dietro un'icona.
 *
 * Il raggio è una proporzione della misura, non un numero fisso: è la
 * regola di `DS.Radius.iconBadge(_:)` — 0,28 × lato — nata perché lo stesso
 * riquadro aveva quattro raggi diversi a seconda del componente.
 */
export function IconBadge({
  children,
  tint,
  size = 30,
  className,
}: {
  children: React.ReactNode;
  tint: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center", className)}
      style={{
        width: `calc(var(--pt) * ${size})`,
        height: `calc(var(--pt) * ${size})`,
        borderRadius: `calc(var(--pt) * ${size * 0.28})`,
        background: `color-mix(in srgb, ${tint} 16%, transparent)`,
        color: tint,
      }}
    >
      {children}
    </span>
  );
}

/** Card di sistema con il padding standard. */
export function IOSCard({
  children,
  className,
  padding = 14,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("ios-card", className)}
      style={{ padding: `calc(var(--pt) * ${padding})`, ...style }}
    >
      {children}
    </div>
  );
}

/**
 * Titolo di sezione dentro una schermata che scorre.
 *
 * Volutamente un `p`: vedi `ScreenTitle`. Dentro il device i titoli sono
 * disegno, non struttura del documento.
 */
export function IOSSectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: string;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <p className="ios-title3">{children}</p>
      {action ? (
        <span className="ios-subhead" style={{ color: "var(--accent)" }}>
          {action}
        </span>
      ) : null}
    </div>
  );
}

/** Barra di avanzamento sottile, tinta per contesto. */
export function IOSProgress({
  value,
  tint,
  height = 5,
}: {
  value: number;
  tint: string;
  height?: number;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-full bg-ink/8"
      style={{ height: `calc(var(--pt) * ${height})` }}
      role="presentation"
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: tint }}
      />
    </div>
  );
}

/** Chevron di navigazione. */
export function Chevron({ size = 12 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 8 14"
      fill="none"
      aria-hidden
      style={{ width: `calc(var(--pt) * ${size * 0.58})` }}
      className="shrink-0 text-ink-tertiary/70"
    >
      <path
        d="M1 1l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
