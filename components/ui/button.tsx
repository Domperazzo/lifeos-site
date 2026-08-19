import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[opacity,background-color,transform] duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-bg shadow-[var(--shadow-sm)] hover:opacity-90",
  secondary: "border border-line-strong text-ink hover:bg-surface-muted",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[14px]",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-[15px]",
};

/**
 * L'unico pulsante del sito.
 *
 * Esisteva già, e intanto tre sezioni si erano riscritte le stesse classi
 * a mano — con tre raggi d'ombra e due opacità leggermente diverse.
 */
export function CTA({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}
