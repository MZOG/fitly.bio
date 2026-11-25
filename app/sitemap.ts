import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/metadata";

// Regenerate at most once an hour so new trainer profiles show up.
export const revalidate = 3600;

const MARKETING_PAGES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/jak-to-dziala", priority: 0.8, changeFrequency: "monthly" },
  { path: "/funkcje", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cennik", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pomoc", priority: 0.6, changeFrequency: "monthly" },
  { path: "/o-nas", priority: 0.5, changeFrequency: "yearly" },
  { path: "/kontakt", priority: 0.5, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.5, changeFrequency: "weekly" },
];

async function getProfileSlugs(): Promise<string[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];

  try {
    // Public, cookie-less client: profiles are readable by anonymous visitors.
    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });
    const { data, error } = await supabase
      .from("profiles")
      .select("slug")
      .not("slug", "is", null);

    if (error || !data) return [];
    return data.map((p) => p.slug as string).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const slugs = await getProfileSlugs();

  return [
    ...MARKETING_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/${encodeURIComponent(slug)}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
