/**
 * Il fondo del hero: tre aloni larghissimi con le tinte delle aree, sotto
 * l'8% di opacità. Non è un gradiente decorativo — è la stessa tinta
 * ambientale che l'app mette dietro le schermate, portata sul sito.
 */
export function AmbientField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-14rem] size-[46rem] -translate-x-1/2 rounded-full opacity-[0.55] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--area-home) 22%, transparent) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute left-[-10rem] top-[18rem] size-[34rem] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--area-finance) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-[-12rem] top-[10rem] size-[32rem] rounded-full opacity-35 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--area-family) 16%, transparent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
