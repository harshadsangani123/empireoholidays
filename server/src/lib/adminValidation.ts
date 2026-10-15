import { z } from "zod";

export const packageInputSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["international", "domestic"]),
  country: z.string().max(255).nullable().optional(),
  state: z.string().max(255).nullable().optional(),
  description: z.string().nullable().optional(),
  detailedDescription: z.string().nullable().optional(),
  pricePerPerson: z.coerce.number().nonnegative(),
  currency: z.enum(["INR", "USD", "EUR"]).default("INR"),
  duration: z.string().max(255).nullable().optional(),
  inclusions: z.array(z.object({ item: z.string() })).nullable().optional(),
  exclusions: z.array(z.object({ item: z.string() })).nullable().optional(),
  itinerary: z
    .array(z.object({ day: z.string(), title: z.string(), description: z.string().optional() }))
    .nullable()
    .optional(),
  mainImage: z.string().nullable().optional(),
  galleryImages: z.array(z.string()).nullable().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
  metaTitle: z.string().max(255).nullable().optional(),
  metaDescription: z.string().nullable().optional(),
});

export const packageUpdateSchema = packageInputSchema.partial();

const PAGE_TYPES = [
  "privacy_policy",
  "terms_condition",
  "partner_with_us",
  "corporate",
  "about",
  "home",
  "membership",
  "gift_vouchers",
  "contact",
  "footer",
] as const;

export const cmsPageInputSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
  pageType: z.enum(PAGE_TYPES),
  content: z.record(z.string(), z.unknown()),
  metaData: z.record(z.string(), z.unknown()).nullable().optional(),
  isPublished: z.boolean().default(true),
});

export const cmsPageUpdateSchema = cmsPageInputSchema.partial();
