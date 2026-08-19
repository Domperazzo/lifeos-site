import { Section, SectionHeading } from "@/components/ui/section";
import { AutomationTimeline } from "./AutomationTimeline";

export function Automations() {
  return (
    <Section className="pt-4 sm:pt-6">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
        <SectionHeading
          eyebrow="Automations"
          title={
            <>
              Less managing.
              <br />
              More living.
            </>
          }
          lead="A day of LifeOS working quietly. You are not meant to watch any of this happen — it is here so you can see what you would otherwise never notice."
        />
        <AutomationTimeline />
      </div>
    </Section>
  );
}
