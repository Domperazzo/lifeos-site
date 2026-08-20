import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/lib/theme-store";
import { localeInitScript } from "@/lib/i18n/config";
import {
  canonicalPath,
  italianCanonicalPath,
  siteDescription,
  siteOrigin,
  siteTitle,
} from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: siteTitle,
    template: "%s — LifeOS",
  },
  description: siteDescription,
  applicationName: "LifeOS",
  keywords: [
    "LifeOS",
    "personal operating system",
    "home management",
    "personal finance",
    "routines",
    "iOS app",
  ],
  authors: [{ name: "LifeOS" }],
  alternates: {
    canonical: canonicalPath,
    languages: { en: canonicalPath, it: italianCanonicalPath },
  },
  openGraph: {
    type: "website",
    url: canonicalPath,
    siteName: "LifeOS",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: ["it_IT"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#06080b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Tema deciso prima del primo paint: nessun lampo chiaro. */}
        <Script
          id="lifeos-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Script
          id="lifeos-locale"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: localeInitScript }}
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
