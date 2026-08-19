import { ArrowRight, Mic } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedIPhone } from "@/components/device/IPhoneMockup";
import { TransactionScreen } from "@/components/device/screens/TransactionScreen";
import { WidgetMockup } from "./WidgetMockup";
import { WatchMockup } from "./WatchMockup";

const integrations = [
  {
    name: "App Intents & Shortcuts",
    detail: "Complete a task or log an expense without opening the app, and put those same actions inside your own automations.",
  },
  {
    name: "Siri",
    detail: "Say it, and it is filed.",
  },
  {
    name: "iCloud",
    detail: "Your data syncs through your own Apple account — between your own devices.",
  },
  {
    name: "HomeKit",
    detail: "Reads the accessories you have already set up. Nothing to configure twice.",
  },
];

export function AppleEcosystem() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Ecosystem"
        title="Built for the Apple ecosystem."
        lead="Not a web app in a wrapper. LifeOS is a native iOS app that uses the parts of the system you already rely on."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <Reveal className="card flex flex-col justify-between gap-6 p-6">
          <p className="text-[13px] font-medium text-ink-tertiary">Home Screen widget</p>
          <WidgetMockup />
          <p className="text-[14px] leading-relaxed text-ink-secondary">
            The answer before the app. Glance, and you already know whether
            anything needs you.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="card flex flex-col justify-between gap-6 p-6">
          <p className="text-[13px] font-medium text-ink-tertiary">Apple Watch</p>
          <WatchMockup />
          <p className="text-[14px] leading-relaxed text-ink-secondary">
            Three actions you take standing up: log an expense, tick a task,
            check the house.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="card flex flex-col gap-5 p-6">
          <p className="text-[13px] font-medium text-ink-tertiary">Deeper in the system</p>
          <ul className="flex flex-col gap-5">
            {integrations.map((integration) => (
              <li key={integration.name}>
                <p className="text-[14.5px] font-medium">{integration.name}</p>
                <p className="mt-0.5 text-[13px] text-ink-secondary">{integration.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Siri → App Intent → transazione registrata */}
      <Reveal className="mt-4 grid items-center gap-10 rounded-[24px] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="text-[13px] font-medium text-ink-tertiary">Siri</p>
          <div className="mt-5 flex items-start gap-3.5">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full"
              style={{
                background: "color-mix(in srgb, var(--area-goals) 15%, transparent)",
                color: "var(--area-goals)",
              }}
            >
              <Mic className="size-4" />
            </span>
            <p className="text-[clamp(1.25rem,2.4vw,1.7rem)] font-semibold leading-snug tracking-[-0.02em]">
              “Log 25 euros for dinner.”
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 text-[14.5px] text-ink-secondary">
            <ArrowRight className="size-4 shrink-0 text-ink-tertiary" />
            LifeOS files it under Restaurants, on your main account, today.
          </div>

          <p className="mt-6 max-w-md text-[14px] leading-relaxed text-ink-tertiary">
            The same App Intent works from Shortcuts, from the Lock Screen and
            from a widget button — because it is the app&apos;s own action, not a
            copy of it.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <AnimatedIPhone
            width="clamp(214px, 56vw, 262px)"
            from={3}
            label="The transaction Siri just created in LifeOS"
          >
            <TransactionScreen />
          </AnimatedIPhone>
        </div>
      </Reveal>
    </Section>
  );
}
