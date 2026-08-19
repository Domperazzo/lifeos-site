/** Status bar iOS: ora a sinistra, indicatori a destra, isola in mezzo. */
export function StatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[calc(var(--pt)*24)] text-ink"
      style={{ height: "calc(var(--pt) * 59)", paddingTop: "calc(var(--pt) * 14)" }}
    >
      <span
        className="font-semibold tabular"
        style={{ fontSize: "calc(var(--pt) * 15)", letterSpacing: "-0.01em" }}
      >
        {time}
      </span>
      <span className="flex items-center" style={{ gap: "calc(var(--pt) * 5)" }}>
        <CellularBars />
        <WifiGlyph />
        <BatteryGlyph />
      </span>
    </div>
  );
}

function CellularBars() {
  return (
    <svg
      viewBox="0 0 18 12"
      fill="currentColor"
      aria-hidden
      style={{ width: "calc(var(--pt) * 17)" }}
    >
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0.5" width="3" height="11.5" rx="1" opacity="0.35" />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg
      viewBox="0 0 16 12"
      fill="currentColor"
      aria-hidden
      style={{ width: "calc(var(--pt) * 16)" }}
    >
      <path d="M8 10.9 6.1 8.7a2.9 2.9 0 0 1 3.8 0L8 10.9Z" />
      <path
        d="M3.6 6.1a6.6 6.6 0 0 1 8.8 0l-1.3 1.5a4.7 4.7 0 0 0-6.2 0L3.6 6.1Z"
        opacity="0.9"
      />
      <path
        d="M1 3.4a10.3 10.3 0 0 1 14 0l-1.3 1.5a8.4 8.4 0 0 0-11.4 0L1 3.4Z"
        opacity="0.75"
      />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg
      viewBox="0 0 27 13"
      aria-hidden
      style={{ width: "calc(var(--pt) * 25)" }}
      fill="none"
    >
      <rect
        x="0.6"
        y="0.6"
        width="23"
        height="11.8"
        rx="3.6"
        stroke="currentColor"
        strokeOpacity="0.38"
        strokeWidth="1.1"
      />
      <rect x="2.2" y="2.2" width="16.5" height="8.6" rx="2.3" fill="currentColor" />
      <path
        d="M25.2 4.6c1 .4 1 3.4 0 3.8V4.6Z"
        fill="currentColor"
        fillOpacity="0.38"
      />
    </svg>
  );
}
