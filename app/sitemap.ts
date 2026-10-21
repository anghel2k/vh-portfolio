import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://portfolio.vellumhaus.studio";
  return [
    { url: base + "/", lastModified: "2026-10-21", priority: 1 },
    ...["/terms", "/termeni"].map(path => ({ url: base + path, lastModified: "2026-10-21", priority: .2, alternates: { languages: { en: base + "/terms", ro: base + "/termeni" } } })),
  ];
}
