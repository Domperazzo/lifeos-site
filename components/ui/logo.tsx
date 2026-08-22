import Image from "next/image";
import iconLight from "@/public/lifeos-icon-light.webp";
import iconDark from "@/public/lifeos-icon-dark.webp";
import { cn } from "@/lib/utils";

/**
 * L'icona dell'app, come sta sulla schermata Home.
 *
 * Sono due immagini, non una: l'icona di LifeOS ha una versione chiara e
 * una scura (`ios/AppIcon.icon`, layer «Light» e «Dark»), e il fondo fa
 * parte del disegno — bianco di là, nero di qua. Metterne una sola
 * lascerebbe un rettangolo bianco su fondo nero.
 *
 * Sono `next/image` con import statico e non `<img src="/…">` perché il
 * sito è pubblicato sotto un prefisso (`/lifeos-site`): un percorso
 * assoluto scritto a mano non lo riceve, e l'immagine sparirebbe **solo
 * in produzione**.
 */
export function AppIcon({ size = 26, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden border border-line",
        className,
      )}
      // Il raggio delle icone iOS è una proporzione del lato, non un numero.
      style={{ width: size, height: size, borderRadius: size * 0.225 }}
      aria-hidden
    >
      <picture className="block size-full">
        <source media="(prefers-color-scheme: dark)" srcSet={iconDark.src} />
        <Image
          src={iconLight}
          alt=""
          width={size}
          height={size}
          loading="eager"
          className="size-full object-cover"
        />
      </picture>
    </span>
  );
}

/**
 * Il logotipo: «Life» pieno, «OS» in gradiente.
 *
 * È testo vero, non un'immagine: si ridimensiona senza sfocare, si
 * seleziona, e cambia da sé fra chiaro e scuro. La dimensione la eredita
 * da chi lo contiene.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-semibold tracking-[-0.03em]", className)}>
      <span style={{ color: "var(--wordmark-life)" }}>Life</span>
      <span className="wordmark-os">OS</span>
    </span>
  );
}

/** Icona e logotipo insieme: quello che sta nella navbar e nel footer. */
export function Logo({
  iconSize = 26,
  className,
}: {
  iconSize?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <AppIcon size={iconSize} />
      <Wordmark />
    </span>
  );
}
