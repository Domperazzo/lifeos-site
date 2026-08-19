import { Section, SectionHeading } from "@/components/ui/section";
import { AnimatedIPhone } from "@/components/device/IPhoneMockup";
import { HomeScreen } from "@/components/device/screens/HomeScreen";
import { FinanceScreen } from "@/components/device/screens/FinanceScreen";
import { TasksScreen } from "@/components/device/screens/TasksScreen";
import { AutomationScreen } from "@/components/device/screens/AutomationScreen";
import { FeatureBlock } from "./FeatureBlock";
import { SmartHomeExamples } from "./SmartHomeExamples";
import { StatCallout } from "./StatCallout";

const deviceWidth = "clamp(232px, 62vw, 296px)";

export function AreasSection() {
  return (
    <Section id="features" className="pt-8 sm:pt-10">
      <SectionHeading
        eyebrow="One system"
        title={
          <>
            One system.
            <br />
            Different areas of your life.
          </>
        }
        lead="Home, money, time and routines stop being four apps that ignore each other."
      />

      <div className="mt-14 flex flex-col gap-24 sm:mt-20 sm:gap-32">
        <FeatureBlock
          eyebrow="Home"
          tint="var(--area-home)"
          title="Your home, intelligently managed."
          lead="Rooms, chores, maintenance and inventory in one place. LifeOS tracks how each room is actually doing and only asks for what is behind."
          points={["Rooms", "Chores", "Maintenance", "Inventory", "Smart devices"]}
          media={
            <AnimatedIPhone
              width={deviceWidth}
              time="8:15"
              from={-4}
              label="The Home screen in LifeOS"
            >
              <HomeScreen />
            </AnimatedIPhone>
          }
        >
          <StatCallout
            tint="var(--area-home)"
            value="Home secure"
            detail="Everything under control."
          />
        </FeatureBlock>

        <FeatureBlock
          reverse
          eyebrow="Finance"
          tint="var(--area-finance)"
          title="Know exactly where you stand."
          lead="Accounts, cards, investments and recurring costs add up to a single number — and a plain sentence explaining which way it is moving."
          points={["Net worth", "Accounts", "Cards", "Investments", "Cash flow", "Budget"]}
          media={
            <AnimatedIPhone
              width={deviceWidth}
              from={4}
              label="The Finance screen in LifeOS"
            >
              <FinanceScreen />
            </AnimatedIPhone>
          }
        >
          <StatCallout
            tint="var(--area-finance)"
            value="+2.4% this month"
            detail="You spent 18% less than your average."
          />
        </FeatureBlock>

        <FeatureBlock
          eyebrow="Tasks & routines"
          tint="var(--area-goals)"
          title="LifeOS knows what needs your attention."
          lead="Chores, routines, deadlines and maintenance land in one list, ordered by what actually matters today. If you skip something, the plan reorganises itself around it."
          points={["Priorities", "Routines", "Deadlines", "Shared chores"]}
          media={
            <AnimatedIPhone
              width={deviceWidth}
              from={-4}
              label="Today's priorities in LifeOS"
            >
              <TasksScreen />
            </AnimatedIPhone>
          }
        >
          <StatCallout
            tint="var(--area-goals)"
            value="3 of 14 shown"
            detail="The other eleven are not due yet. You'll see them when they are."
          />
        </FeatureBlock>

        <FeatureBlock
          reverse
          eyebrow="Smart home"
          tint="var(--area-family)"
          title="Your home reacts to your life."
          lead="LifeOS connects what your calendar, your location and your home already know. When you allow it, it doesn't just suggest the next step — it takes it."
          media={
            <AnimatedIPhone
              width={deviceWidth}
              time="8:15"
              from={4}
              label="An automation LifeOS has just completed"
            >
              <AutomationScreen />
            </AnimatedIPhone>
          }
        >
          <SmartHomeExamples />
        </FeatureBlock>
      </div>
    </Section>
  );
}
