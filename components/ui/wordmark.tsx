import { cn } from "@/lib/utils";

/**
 * Il segno di LifeOS: sei quadrati, uno per area della vita, che
 * convergono. Sono le sei tinte di `DS.Palette.area(_:)`, nello stesso
 * ordine in cui l'app le usa.
 */
export function Wordmark({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("relative inline-grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="2" y="2" width="9" height="9" rx="3" fill="var(--area-home)" />
        <rect x="13" y="2" width="9" height="9" rx="3" fill="var(--area-finance)" opacity="0.9" />
        <rect x="2" y="13" width="9" height="9" rx="3" fill="var(--area-family)" opacity="0.85" />
        <rect x="13" y="13" width="9" height="9" rx="3" fill="var(--area-goals)" opacity="0.8" />
      </svg>
    </span>
  );
}
