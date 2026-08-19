/** Barra di sistema in fondo: 140 × 5 punti, come su iPhone. */
export function HomeIndicator() {
  return (
    <div
      aria-hidden
      className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 rounded-full bg-ink/85"
      style={{
        width: "calc(var(--pt) * 140)",
        height: "calc(var(--pt) * 5)",
        marginBottom: "calc(var(--pt) * 9)",
      }}
    />
  );
}
