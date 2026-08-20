import type { MetadataRoute } from "next";
import { italianSiteUrl, siteUrl } from "@/lib/site";

/*
 * `force-static`: con `output: "export"` non c'è un server che possa
 * rigenerare questa risposta, quindi Next pretende che sia dichiarata
 * statica invece di dedurlo.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: siteUrl, it: italianSiteUrl };

  return [siteUrl, italianSiteUrl].map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: url === siteUrl ? 1 : 0.9,
    alternates: { languages },
  }));
}
