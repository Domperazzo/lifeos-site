import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/*
 * `force-static`: con `output: "export"` non c'è un server che possa
 * rigenerare questa risposta, quindi Next pretende che sia dichiarata
 * statica invece di dedurlo.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
