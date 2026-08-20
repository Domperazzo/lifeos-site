"use client";

import { Search } from "lucide-react";
import { lifeOverview } from "@/lib/data";
import { tabs, type TabKey } from "../ios/TabBar";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { MessageKey } from "@/lib/i18n/messages";
import {
  IPadCalendar,
  IPadFinance,
  IPadHome,
  IPadProfile,
  IPadToday,
} from "./ipad-content";

const contents: Record<TabKey, React.ReactNode> = {
  today: <IPadToday />,
  home: <IPadHome />,
  finance: <IPadFinance />,
  calendar: <IPadCalendar />,
  profile: <IPadProfile />,
};

/** Il titolo grande di ogni sezione, come nell'app. */
const titles: Record<TabKey, MessageKey> = {
  today: "Good morning, {name}",
  home: "Home",
  finance: "Finance",
  calendar: "August",
  profile: "Profile",
};

/**
 * Il sottotitolo esiste solo dove aggiunge qualcosa.
 *
 * Sotto "August" la data di oggi è la stessa informazione detta due
 * volte; sotto "Finance" non c'entra niente.
 */
const subtitles: Record<TabKey, MessageKey | null> = {
  today: "Tuesday 18 August",
  home: null,
  finance: null,
  calendar: "4 things today",
  profile: null,
};

const tints: Record<TabKey, string> = {
  today: "var(--area-home)",
  home: "var(--area-home)",
  finance: "var(--area-finance)",
  calendar: "var(--area-goals)",
  profile: "var(--area-family)",
};

/**
 * LifeOS su iPad.
 *
 * Non è la schermata dell'iPhone allargata: su schermo largo le cinque
 * sezioni diventano una **barra laterale** (`.tabViewStyle(.sidebarAdaptable)`),
 * e il contenuto non corre da bordo a bordo — ha un tetto di 700 punti,
 * la larghezza oltre la quale una riga di testo perde il capo di quella
 * dopo. Sono le due decisioni dell'app, riprodotte qui.
 */
export function IPadScreen({ active = "today" }: { active?: TabKey }) {
  const { t } = useI18n();

  return (
    <div
      className="life-canvas absolute inset-0 flex bg-bg"
      style={
        { "--tint": tints[active], paddingTop: "calc(var(--pt) * 24)" } as React.CSSProperties
      }
    >
      <Sidebar active={active} />

      {/* Il contenuto: tetto a 700pt e centrato nello spazio che resta. */}
      <div className="flex flex-1 justify-center overflow-hidden">
        <div
          className="flex w-full flex-col"
          style={{
            maxWidth: "calc(var(--pt) * 700)",
            paddingInline: "calc(var(--pt) * 24)",
            paddingTop: "calc(var(--pt) * 18)",
            gap: "calc(var(--pt) * 16)",
          }}
        >
          <header className="flex items-end justify-between">
            <div>
              <p className="ios-largetitle">
                {t(titles[active], { name: lifeOverview.user })}
              </p>
              {subtitles[active] ? (
                <p
                  className="ios-subhead text-ink-tertiary"
                  style={{ marginTop: "calc(var(--pt) * 4)" }}
                >
                  {t(subtitles[active])}
                </p>
              ) : null}
            </div>
            <span
              className="glass grid place-items-center rounded-full text-ink-secondary hairline"
              style={{ width: "calc(var(--pt) * 34)", height: "calc(var(--pt) * 34)" }}
            >
              <Search style={{ width: "calc(var(--pt) * 16)" }} />
            </span>
          </header>

          {contents[active]}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active }: { active: TabKey }) {
  const { t } = useI18n();

  return (
    <aside
      className="flex shrink-0 flex-col border-r border-line bg-surface-muted"
      style={{
        width: "calc(var(--pt) * 260)",
        paddingInline: "calc(var(--pt) * 12)",
        paddingTop: "calc(var(--pt) * 16)",
        gap: "calc(var(--pt) * 4)",
      }}
    >
      <p
        className="font-bold"
        style={{
          fontSize: "calc(var(--pt) * 26)",
          letterSpacing: "-0.03em",
          paddingInline: "calc(var(--pt) * 10)",
          paddingBottom: "calc(var(--pt) * 12)",
        }}
      >
        LifeOS
      </p>

      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = key === active;
        return (
          <div
            key={key}
            className="flex items-center"
            style={{
              gap: "calc(var(--pt) * 11)",
              padding: "calc(var(--pt) * 9) calc(var(--pt) * 10)",
              borderRadius: "calc(var(--pt) * 9)",
              background: isActive
                ? `color-mix(in srgb, ${tints[key]} 15%, transparent)`
                : undefined,
              color: isActive ? tints[key] : "var(--text-secondary)",
            }}
          >
            <Icon
              style={{ width: "calc(var(--pt) * 18)", height: "calc(var(--pt) * 18)" }}
              strokeWidth={isActive ? 2.3 : 1.9}
            />
            <span className="ios-subhead" style={{ color: "inherit" }}>
              {t(label)}
            </span>
          </div>
        );
      })}

      <div className="mt-auto" style={{ paddingBottom: "calc(var(--pt) * 20)" }}>
        <div
          className="flex items-center"
          style={{ gap: "calc(var(--pt) * 9)", paddingInline: "calc(var(--pt) * 10)" }}
        >
          <span
            className="grid place-items-center rounded-full font-semibold text-white"
            style={{
              width: "calc(var(--pt) * 26)",
              height: "calc(var(--pt) * 26)",
              background: "#3476d9",
              fontSize: "calc(var(--pt) * 12)",
            }}
          >
            {lifeOverview.user.charAt(0)}
          </span>
          <span className="ios-footnote text-ink-secondary">{lifeOverview.user}</span>
        </div>
      </div>
    </aside>
  );
}
