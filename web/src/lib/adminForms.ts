export interface ItineraryDay {
  day: string;
  title: string;
  description?: string;
}

export interface PackageFormValues {
  name: string;
  type: "international" | "domestic";
  country: string;
  state: string;
  description: string;
  detailedDescription: string;
  pricePerPerson: string;
  currency: string;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  mainImage: string;
  mainImageUrl: string;
  galleryImages: string[];
  galleryImageUrls: string[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: string;
  metaTitle: string;
  metaDescription: string;
}

export function packageToFormValues(pkg: any): PackageFormValues {
  return {
    name: pkg.name ?? "",
    type: pkg.type ?? "international",
    country: pkg.country ?? "",
    state: pkg.state ?? "",
    description: pkg.description ?? "",
    detailedDescription: pkg.detailedDescription ?? "",
    pricePerPerson: pkg.pricePerPerson?.toString() ?? "",
    currency: pkg.currency ?? "INR",
    duration: pkg.duration ?? "",
    inclusions: (pkg.inclusions ?? []).map((i: any) => i.item ?? i),
    exclusions: (pkg.exclusions ?? []).map((i: any) => i.item ?? i),
    itinerary: pkg.itinerary ?? [],
    mainImage: pkg.mainImage ?? "",
    mainImageUrl: pkg.mainImage ?? "",
    galleryImages: pkg.galleryImages ?? [],
    galleryImageUrls: pkg.galleryImages ?? [],
    isFeatured: Boolean(pkg.isFeatured),
    isPublished: Boolean(pkg.isPublished),
    sortOrder: pkg.sortOrder?.toString() ?? "0",
    metaTitle: pkg.metaTitle ?? "",
    metaDescription: pkg.metaDescription ?? "",
  };
}

export interface CmsPageFormValues {
  title: string;
  slug: string;
  pageType: string;
  isPublished: boolean;
  content: Record<string, any>;
  metaDataJson: string;
}

export function cmsPageToFormValues(page: any): CmsPageFormValues {
  return {
    title: page.title ?? "",
    slug: page.slug ?? "",
    pageType: page.pageType ?? "about",
    isPublished: Boolean(page.isPublished),
    content: page.content ?? {},
    metaDataJson: JSON.stringify(page.metaData ?? {}, null, 2),
  };
}
