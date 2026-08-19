import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * Il blocco editoriale di un'area: testo da un lato, prodotto dall'altro,
 * a lati alternati. Non è una card in una griglia di card — ogni area ha
 * spazio, e l'alternanza dà il ritmo alla pagina.
 */
export function FeatureBlock({
  eyebrow,
  tint,
  title,
  lead,
  points,
  media,
  reverse = false,
  children,
}: {
  eyebrow: string;
  tint: string;
  title: string;
  lead: string;
  points?: string[];
  media: React.ReactNode;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
        reverse && "lg:[&>*:first-child]:order-2",
      )}
    >
      <Reveal className="flex flex-col gap-5">
        <Eyebrow tint={tint}>{eyebrow}</Eyebrow>
        <h3 className="max-w-md text-[clamp(1.75rem,4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {title}
        </h3>
        <p className="max-w-md text-[16.5px] leading-relaxed text-ink-secondary">{lead}</p>

        {points ? (
          <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2 text-[14px] text-ink-secondary">
                <span className="size-1 rounded-full" style={{ background: tint }} />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        {children}
      </Reveal>

      <div className="flex justify-center lg:justify-end">{media}</div>
    </div>
  );
}
