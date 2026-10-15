import { Router } from "express";
import { prisma } from "../lib/prisma";
import { resolveImageUrl, resolveImageUrls } from "../lib/storage";

export const cmsPagesRouter = Router();

function getContentField(content: unknown, key: string, fallback: string | null = null) {
  if (content && typeof content === "object" && key in (content as Record<string, unknown>)) {
    const value = (content as Record<string, unknown>)[key];
    if (value !== null && value !== undefined && value !== "") return value;
  }
  return fallback;
}

const FOOTER_CONTACT_DEFAULTS = {
  phone: "+1 234 567 890",
  email: "info@empireoholidays.com",
  whatsapp: "1234567890",
  business_hours: "Monday - Sunday: 9:00 AM - 8:00 PM",
  address: "",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
  },
};

// Mirrors HandleInertiaRequests::share() — the globally shared footer contact
// data, preferring a "contact" CMS page but falling back to a "footer" one.
cmsPagesRouter.get("/footer-contact", async (_req, res) => {
  let page = await prisma.cmsPage.findFirst({
    where: { pageType: "contact", isPublished: true, deletedAt: null },
  });
  if (!page) {
    page = await prisma.cmsPage.findFirst({
      where: { pageType: "footer", isPublished: true, deletedAt: null },
    });
  }

  if (!page) {
    return res.json(FOOTER_CONTACT_DEFAULTS);
  }

  const content = page.content as Record<string, unknown> | null;
  res.json({
    phone: getContentField(content, "phone", FOOTER_CONTACT_DEFAULTS.phone),
    email: getContentField(content, "email", FOOTER_CONTACT_DEFAULTS.email),
    whatsapp: getContentField(content, "whatsapp", FOOTER_CONTACT_DEFAULTS.whatsapp),
    business_hours: getContentField(content, "business_hours", FOOTER_CONTACT_DEFAULTS.business_hours),
    address: getContentField(content, "address", FOOTER_CONTACT_DEFAULTS.address),
    social: {
      facebook: getContentField(content, "facebook", FOOTER_CONTACT_DEFAULTS.social.facebook),
      instagram: getContentField(content, "instagram", FOOTER_CONTACT_DEFAULTS.social.instagram),
      linkedin: getContentField(content, "linkedin", FOOTER_CONTACT_DEFAULTS.social.linkedin),
    },
  });
});

cmsPagesRouter.get("/:pageType", async (req, res) => {
  const { pageType } = req.params;

  const page = await prisma.cmsPage.findFirst({
    where: { pageType, isPublished: true, deletedAt: null },
  });

  if (!page) {
    return res.json(null);
  }

  const content = page.content as Record<string, unknown> | null;

  if (pageType === "home") {
    const bg = content?.hero_background;
    const heroBackgrounds = Array.isArray(bg)
      ? resolveImageUrls(bg)
      : typeof bg === "string" && bg
        ? [resolveImageUrl(bg)!]
        : [];
    return res.json({ heroBackgrounds, metaData: page.metaData });
  }

  if (pageType === "contact") {
    return res.json({
      phone: getContentField(content, "phone", "+1 234 567 890"),
      email: getContentField(content, "email", "info@empireoholidays.com"),
      whatsapp: getContentField(content, "whatsapp", "1234567890"),
      business_hours: getContentField(content, "business_hours", "Monday - Sunday: 9:00 AM - 8:00 PM"),
      address: getContentField(content, "address", ""),
      facebook: getContentField(content, "facebook", null),
      instagram: getContentField(content, "instagram", null),
      linkedin: getContentField(content, "linkedin", null),
      metaData: page.metaData,
    });
  }

  res.json({
    id: page.id,
    title: page.title,
    slug: page.slug,
    pageType: page.pageType,
    content: page.content,
    metaData: page.metaData,
  });
});
