import type { Package as PackageModel } from "@prisma/client";
import { resolveImageUrl, resolveImageUrls } from "./storage";

function getImage(pkg: PackageModel): string | null {
  if (pkg.mainImage) return resolveImageUrl(pkg.mainImage);
  const gallery = resolveImageUrls(pkg.galleryImages);
  return gallery[0] ?? null;
}

function getPhotos(pkg: PackageModel): string[] {
  const photos: string[] = [];
  const mainImageUrl = resolveImageUrl(pkg.mainImage);
  if (mainImageUrl) photos.push(mainImageUrl);
  photos.push(...resolveImageUrls(pkg.galleryImages));
  return photos;
}

export function formatPackageForList(pkg: PackageModel) {
  return {
    id: pkg.id,
    name: pkg.name,
    country: pkg.country,
    state: pkg.state,
    description: pkg.description,
    image: getImage(pkg),
    price_per_person: pkg.pricePerPerson ? pkg.pricePerPerson.toFixed(2) : null,
    currency: pkg.currency,
    duration: pkg.duration,
    type: pkg.type,
  };
}

export function formatPackageForDetail(pkg: PackageModel) {
  return {
    id: pkg.id,
    name: pkg.name,
    country: pkg.country,
    state: pkg.state,
    description: pkg.description,
    detailedDescription: pkg.detailedDescription ?? pkg.description,
    image: getImage(pkg),
    photos: getPhotos(pkg),
    price_per_person: pkg.pricePerPerson ? pkg.pricePerPerson.toFixed(2) : null,
    currency: pkg.currency,
    duration: pkg.duration,
    inclusions: pkg.inclusions ?? [],
    exclusions: pkg.exclusions ?? [],
    itinerary: pkg.itinerary ?? [],
    type: pkg.type,
    metaTitle: pkg.metaTitle,
    metaDescription: pkg.metaDescription,
  };
}
