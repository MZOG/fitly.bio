import type { Metadata } from "next";

export const SITE_URL = "https://fitly.bio";

export const DEFAULT_OG_IMAGE = {
  url: "/api/og",
  width: 1200,
  height: 630,
  alt: "Fitly",
};

/**
 * Metadata for a marketing page, including og:url / canonical pointing at the page itself.
 * Next replaces (not merges) `openGraph` per page, so every page sets the full object.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle = title,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: "Fitly",
      locale: "pl_PL",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
