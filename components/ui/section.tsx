import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  className,
  children,
  ...rest
}: React.ComponentProps<"section">) {
  return (
    <section
      id={id}
      className={cn("relative px-5 py-20 sm:px-8 sm:py-28 lg:py-36", className)}
      {...rest}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tint }: { children: React.ReactNode; tint?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.02em] text-ink-tertiary"
      style={tint ? { color: tint } : undefined}
    >
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ background: tint ?? "currentColor" }}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tint,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tint?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tint={tint}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "max-w-3xl text-[clamp(2rem,5.2vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-xl text-[17px] leading-relaxed text-ink-secondary sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
