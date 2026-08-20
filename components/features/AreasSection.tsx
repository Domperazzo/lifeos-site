"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { AnimatedIPhone } from "@/components/device/IPhoneMockup";
import { HomeScreen } from "@/components/device/screens/HomeScreen";
import { FinanceScreen } from "@/components/device/screens/FinanceScreen";
import { TasksScreen } from "@/components/device/screens/TasksScreen";
import { AutomationScreen } from "@/components/device/screens/AutomationScreen";
import { FeatureBlock } from "./FeatureBlock";
import { SmartHomeExamples } from "./SmartHomeExamples";
import { StatCallout } from "./StatCallout";
import { useI18n } from "@/components/i18n/I18nProvider";

const deviceWidth = "clamp(232px, 62vw, 296px)";

export function AreasSection() {
  const { t } = useI18n();

  return (
    <Section id="features" className="pt-8 sm:pt-10">
      <SectionHeading
        eyebrow={t("One system")}
        title={
          <>
            {t("One operating system.")}
            <br />
            {t("Different areas of your life.")}
          </>
        }
        lead={t("Home, money, time and routines stop being four apps that ignore each other.")}
      />

      <div className="mt-14 flex flex-col gap-24 sm:mt-20 sm:gap-32">
        <FeatureBlock
          eyebrow={t("Home")}
          tint="var(--area-home)"
          title={t("Your home, intelligently managed.")}
          lead={t("Rooms, chores, maintenance and inventory in one place. LifeOS tracks how each room is actually doing and only asks for what is behind.")}
          points={[t("Rooms"), t("Chores"), t("Maintenance"), t("Inventory"), t("Smart devices")]}
          media={
            <AnimatedIPhone
              width={deviceWidth}
              time="8:15"
              from={-4}
              label={t("The Home screen in LifeOS")}
            >
              <HomeScreen />
            </AnimatedIPhone>
          }
        >
          <StatCallout
            tint="var(--area-home)"
            value={t("Home secure")}
            detail={t("Everything under control.")}
          />
        </FeatureBlock>

        <FeatureBlock
          reverse
          eyebrow={t("Finance")}
          tint="var(--area-finance)"
          title={t("Know exactly where you stand.")}
          lead={t("Accounts, cards, investments and recurring costs add up to a single number — and a plain sentence explaining which way it is moving.")}
          points={[t("Net worth"), t("Accounts"), t("Cards"), t("Investments"), t("Cash flow"), t("Budget")]}
          media={
            <AnimatedIPhone
              width={deviceWidth}
              from={4}
              label={t("The Finance screen in LifeOS")}
            >
              <FinanceScreen />
            </AnimatedIPhone>
          }
        >
          <StatCallout
            tint="var(--area-finance)"
            value={t("+2.4% this month")}
            detail={t("You spent 18% less than your average.")}
          />
        </FeatureBlock>

        <FeatureBlock
          eyebrow={t("Tasks & routines")}
          tint="var(--area-goals)"
          title={t("LifeOS knows what needs your attention.")}
          lead={t("Chores, routines, deadlines and maintenance land in one list, ordered by what actually matters today. If you skip something, the plan reorganises itself around it.")}
          points={[t("Priorities"), t("Routines"), t("Deadlines"), t("Shared chores")]}
          media={
            <AnimatedIPhone
              width={deviceWidth}
              from={-4}
              label={t("Today's priorities in LifeOS")}
            >
              <TasksScreen />
            </AnimatedIPhone>
          }
        >
          <StatCallout
            tint="var(--area-goals)"
            value={t("3 of 14 shown")}
            detail={t("The other eleven are not due yet. You'll see them when they are.")}
          />
        </FeatureBlock>

        <FeatureBlock
          reverse
          eyebrow={t("Smart home")}
          tint="var(--area-family)"
          title={t("Your home reacts to your life.")}
          lead={t("LifeOS connects what your calendar, your location and your home already know. When you allow it, it doesn't just suggest the next step — it takes it.")}
          media={
            <AnimatedIPhone
              width={deviceWidth}
              time="8:15"
              from={4}
              label={t("An automation LifeOS has just completed")}
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
