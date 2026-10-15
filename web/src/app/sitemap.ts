import type { MetadataRoute } from "next";
import { apiGet, type PackageSummary } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/international"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/domestic"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.5 },
  ];

  const packages = await apiGet<PackageSummary[]>("/packages").catch(() => []);
  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: absoluteUrl(`/package/${pkg.type}/${pkg.id}`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...packageRoutes];
}
