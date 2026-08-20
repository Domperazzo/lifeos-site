"use client";

import { Check, House, Plus } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";

/**
 * Apple Watch: le tre cose che si fanno da fermi, senza tirare fuori il
 * telefono. Il quadrante non ripete la dashboard — sarebbe illeggibile.
 */
export function WatchMockup() {
  const { t } = useI18n();
  const actions = [
    { label: t("Add expense"), icon: Plus, tint: "var(--area-finance)" },
    { label: t("Complete task"), icon: Check, tint: "var(--area-goals)" },
    { label: t("Home status"), icon: House, tint: "var(--area-home)" },
  ];

  return (
    <div className="relative mx-auto" style={{ width: "clamp(126px, 30vw, 152px)" }}>
      {/* Cassa */}
      <div
        className="relative rounded-[30%] p-[6px] shadow-[var(--shadow-md)]"
        style={{
          aspectRatio: "44 / 53",
          background:
            "linear-gradient(150deg, #cdd2d8 0%, #7e868e 30%, #e6e9ec 55%, #8b939b 78%, #c4c9cf 100%)",
        }}
      >
        <div className="flex size-full flex-col gap-[5px] overflow-hidden rounded-[27%] bg-[#05070a] p-[9%]">
          <p className="text-[8.5px] font-medium text-white/45">LifeOS</p>
          {actions.map((action) => (
            <div
              key={action.label}
              className="flex flex-1 items-center gap-1.5 rounded-[10px] px-2"
              style={{ background: `color-mix(in srgb, ${action.tint} 18%, #10151c)` }}
            >
              <action.icon className="size-2.5 shrink-0" style={{ color: action.tint }} />
              <span className="text-[8px] font-medium leading-tight text-white/90">
                {action.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Crown */}
      <span
        aria-hidden
        className="absolute right-[-4px] top-[27%] h-[13%] w-[5px] rounded-full bg-gradient-to-b from-[#c8cdd3] via-[#868e96] to-[#b9bfc5]"
      />
      <span
        aria-hidden
        className="absolute right-[-3px] top-[45%] h-[11%] w-[4px] rounded-full bg-gradient-to-b from-[#b8bec4] to-[#7f878f]"
      />
    </div>
  );
}
