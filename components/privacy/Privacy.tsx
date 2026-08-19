import { Check, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/*
  Ogni affermazione qui è verificabile nel codice dell'app.
  Riferimenti: docs/LifeCloud_Privacy_Model.md §1-§3, §9, §11.
*/
const principles = [
  {
    title: "There is no LifeOS server",
    detail:
      "The app makes no network calls of its own. Anything that syncs goes through your own iCloud account, between your own devices.",
  },
  {
    title: "What it learns stays on your iPhone",
    detail:
      "The habits LifeOS observes — when you actually open the app, what you tend to skip — live in a store that is never synced, and are deleted after 120 days.",
  },
  {
    title: "The default is the closed one",
    detail:
      "Belonging to a household does not make what you create shared. Sharing is a deliberate act, never a side effect.",
  },
  {
    title: "Data minimisation, by architecture",
    detail:
      "Shared records carry a subset of fields, not whole entities. What the other person does not need is not sent.",
  },
  {
    title: "No behavioural telemetry",
    detail:
      "Diagnostics record how many operations ran and which category of error occurred. Never amounts, never names, never contents.",
  },
  {
    title: "Protected on the device too",
    detail:
      "Files on disk use iOS data protection, so they stay encrypted until you first unlock your iPhone after a restart.",
  },
];

const shared = [
  "The home and its rooms",
  "Chores and who did them",
  "The cleaning schedule",
  "How much time each person has",
];

const neverShared = [
  "Accounts and balances",
  "Net worth and investments",
  "Income and personal goals",
  "Wellbeing, notes, private routines",
  "Work shifts and observed habits",
];

export function Privacy() {
  return (
    <Section id="security">
      <SectionHeading
        eyebrow="Privacy"
        title="Your life belongs to you."
        lead="LifeOS holds some of the most personal data a person has. That makes privacy an architectural decision, not a settings screen — so it is enforced in the code, and covered by tests."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, index) => (
          <Reveal
            key={principle.title}
            delay={index * 0.06}
            className="card flex flex-col gap-2.5 p-6"
          >
            <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{principle.title}</h3>
            <p className="text-[14px] leading-relaxed text-ink-secondary">{principle.detail}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 grid gap-8 rounded-[24px] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[13px] font-medium text-ink-tertiary">
            What the people you share a home with see
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {shared.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px]">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-finance text-white">
                  <Check className="size-3" strokeWidth={3.2} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-medium text-ink-tertiary">What they never see</p>
          <ul className="mt-5 flex flex-col gap-3">
            {neverShared.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15px]">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/10 text-ink-tertiary">
                  <X className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] leading-relaxed text-ink-tertiary">
            This boundary is verified end to end by an automated test across two
            devices — not by a promise on a marketing page.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
