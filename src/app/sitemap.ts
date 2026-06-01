import type { MetadataRoute } from "next";
import { calculators } from "@/data/calculators";
import { salaries } from "@/data/salaries";
import { cities } from "@/data/cities";
import { banks } from "@/data/banks";
import { getAllPostSlugs } from "@/lib/blog";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllPostSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/calculators`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/banks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/salary`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/cities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculators.map((c) => ({
    url: `${SITE_URL}/calculators/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const salaryPages: MetadataRoute.Sitemap = salaries.map((s) => ({
    url: `${SITE_URL}/salary/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/cities/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const bankPages: MetadataRoute.Sitemap = banks.map((b) => ({
    url: `${SITE_URL}/banks/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...calculatorPages,
    ...salaryPages,
    ...cityPages,
    ...bankPages,
    ...blogPages,
  ];
}
