import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#product" },
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Security", href: "#security" },
      { label: "Contact", href: "mailto:hello@lifeos.app" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-14 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="#top" className="flex items-center gap-2.5 text-[16px] font-semibold">
              <Wordmark size={20} />
              LifeOS
            </Link>
            <p className="max-w-xs text-[13.5px] leading-relaxed text-ink-tertiary">
              The personal operating system for your life, home and money.
            </p>
          </div>

          <div className="flex gap-14">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
                <p className="text-[13px] font-medium text-ink">{column.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-ink-tertiary transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Social" className="flex flex-col gap-3">
              <p className="text-[13px] font-medium text-ink">Elsewhere</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[13.5px] text-ink-tertiary transition-colors hover:text-ink"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[13.5px] text-ink-tertiary transition-colors hover:text-ink"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-8 text-[12.5px] text-ink-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LifeOS. All rights reserved.</p>
          <p>Designed and built for iOS.</p>
        </div>
      </div>
    </footer>
  );
}
