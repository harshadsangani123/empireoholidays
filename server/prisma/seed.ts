import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../src/lib/prisma";

const EXPORT_PATH = process.env.EXPORT_JSON_PATH;

if (!EXPORT_PATH) {
  console.error("Set EXPORT_JSON_PATH to the exported Laravel data JSON file.");
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(path.resolve(EXPORT_PATH), "utf-8"));

async function main() {
  for (const u of raw.users) {
    await prisma.adminUser.upsert({
      where: { email: u.email },
      create: {
        name: u.name,
        email: u.email,
        password: u.password,
      },
      update: {
        name: u.name,
        password: u.password,
      },
    });
  }
  console.log(`Seeded ${raw.users.length} admin users.`);

  for (const p of raw.packages) {
    await prisma.package.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        name: p.name,
        type: p.type as "international" | "domestic",
        country: p.country,
        state: p.state,
        description: p.description,
        detailedDescription: p.detailed_description,
        pricePerPerson: p.price_per_person,
        currency: p.currency,
        duration: p.duration,
        inclusions: p.inclusions,
        exclusions: p.exclusions,
        itinerary: p.itinerary,
        mainImage: p.main_image,
        galleryImages: p.gallery_images,
        isFeatured: p.is_featured,
        isPublished: p.is_published,
        sortOrder: p.sort_order,
        metaTitle: p.meta_title,
        metaDescription: p.meta_description,
        createdAt: new Date(p.created_at),
        updatedAt: new Date(p.updated_at),
        deletedAt: p.deleted_at ? new Date(p.deleted_at) : null,
      },
      update: {},
    });
  }
  console.log(`Seeded ${raw.packages.length} packages.`);

  for (const c of raw.cms_pages) {
    await prisma.cmsPage.upsert({
      where: { id: c.id },
      create: {
        id: c.id,
        title: c.title,
        slug: c.slug,
        pageType: c.page_type,
        content: c.content,
        metaData: c.meta_data,
        isPublished: c.is_published,
        createdAt: new Date(c.created_at),
        updatedAt: new Date(c.updated_at),
        deletedAt: c.deleted_at ? new Date(c.deleted_at) : null,
      },
      update: {},
    });
  }
  console.log(`Seeded ${raw.cms_pages.length} CMS pages.`);

  // Keep Postgres's auto-increment sequences ahead of the migrated ids.
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('packages', 'id'), COALESCE((SELECT MAX(id) FROM packages), 1))`
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('cms_pages', 'id'), COALESCE((SELECT MAX(id) FROM cms_pages), 1))`
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('admin_users', 'id'), COALESCE((SELECT MAX(id) FROM admin_users), 1))`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
