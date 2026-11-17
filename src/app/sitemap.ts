import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.siteUrl;
  const now = new Date();

  const routes = [
    "",
    "/plans",
    "/services",
    "/coverage",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/plans" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/plans" ? 0.9 : 0.8,
  }));
}
