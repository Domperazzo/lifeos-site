import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { HomePageContent } from "@/components/page/HomePageContent";
import {
  canonicalPath,
  italianCanonicalPath,
  italianSiteDescription,
  italianSiteTitle,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: italianSiteTitle },
  description: italianSiteDescription,
  alternates: {
    canonical: italianCanonicalPath,
    languages: { en: canonicalPath, it: italianCanonicalPath },
  },
  openGraph: {
    type: "website",
    url: italianCanonicalPath,
    siteName: "LifeOS",
    title: italianSiteTitle,
    description: italianSiteDescription,
    locale: "it_IT",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: italianSiteTitle,
    description: italianSiteDescription,
  },
};

export default function ItalianHomePage() {
  return (
    <I18nProvider locale="it">
      <HomePageContent />
    </I18nProvider>
  );
}
