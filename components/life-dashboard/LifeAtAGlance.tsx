import { Section, SectionHeading } from "@/components/ui/section";
import { GlanceDashboard } from "./GlanceDashboard";

export function LifeAtAGlance() {
  return (
    <Section id="product">
      <SectionHeading
        eyebrow="The idea"
        title="Your life at a glance."
        lead="LifeOS doesn't just show data. It turns it into a reading of how your life is actually going — and tells you the one thing worth doing next."
      />
      <div className="mt-12 sm:mt-16">
        <GlanceDashboard />
      </div>
    </Section>
  );
}
