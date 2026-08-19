import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { roadmapAreas } from "@/lib/data";

/**
 * Le aree future. Dichiarate come tali: nessuna di queste è nell'app oggi,
 * e scriverlo chiaramente costa meno di farlo scoprire.
 */
export function Roadmap() {
  return (
    <Section className="py-20 sm:py-24">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-[clamp(1.6rem,3.4vw,2.25rem)] font-semibold tracking-[-0.03em]">
          LifeOS is just getting started.
        </h2>
        <p className="text-[14px] text-ink-tertiary">
          Planned areas — not available yet.
        </p>
      </Reveal>

      <ul className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2 lg:grid-cols-3">
        {roadmapAreas.map((area, index) => (
          <Reveal
            key={area.title}
            as="li"
            delay={index * 0.05}
            className="flex items-baseline justify-between gap-6 border-t border-line py-5"
          >
            <span className="text-[16px] font-medium">{area.title}</span>
            <span className="max-w-[16rem] text-right text-[13.5px] text-ink-tertiary">
              {area.detail}
            </span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
