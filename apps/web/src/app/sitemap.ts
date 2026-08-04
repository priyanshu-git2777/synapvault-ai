import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

const routes = [
  "",
  "/features",
  "/use-cases",
  "/pricing",
  "/security",
  "/docs",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
