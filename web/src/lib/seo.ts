import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://empireoholidays.com").replace(/\/$/, "");
export const SITE_NAME = "Empireo Holidays";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getMetaField(metaData: unknown, key: string): string | null {
  if (metaData && typeof metaData === "object" && key in (metaData as Record<string, unknown>)) {
    const value = (metaData as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return null;
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? [{ url: image }] : undefined;
  // If the title already includes the site name (e.g. an admin-authored CMS
  // meta_title like "Contact Us - Empireo Holidays"), use it verbatim instead
  // of letting the root layout's "%s | Empireo Holidays" template double it up.
  const resolvedTitle = title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? { absolute: title } : title;

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: ogImage,
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage,
    },
  };
}
