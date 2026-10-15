import type { Prisma } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { cmsPageInputSchema, cmsPageUpdateSchema } from "../../lib/adminValidation";

export const adminCmsPagesRouter = Router();

adminCmsPagesRouter.get("/", async (_req, res) => {
  const pages = await prisma.cmsPage.findMany({
    where: { deletedAt: null },
    orderBy: { id: "asc" },
  });
  res.json(pages);
});

adminCmsPagesRouter.get("/:id", async (req, res) => {
  const page = await prisma.cmsPage.findFirst({
    where: { id: Number(req.params.id), deletedAt: null },
  });
  if (!page) return res.status(404).json({ message: "CMS page not found" });
  res.json(page);
});

adminCmsPagesRouter.post("/", async (req, res) => {
  const parsed = cmsPageInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const slugTaken = await prisma.cmsPage.findUnique({ where: { slug: parsed.data.slug } });
  if (slugTaken) {
    return res.status(422).json({ errors: { slug: ["This slug is already in use."] } });
  }

  const page = await prisma.cmsPage.create({
    data: parsed.data as unknown as Prisma.CmsPageCreateInput,
  });
  res.status(201).json(page);
});

adminCmsPagesRouter.put("/:id", async (req, res) => {
  const parsed = cmsPageUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const existing = await prisma.cmsPage.findFirst({
    where: { id: Number(req.params.id), deletedAt: null },
  });
  if (!existing) return res.status(404).json({ message: "CMS page not found" });

  if (parsed.data.slug && parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.cmsPage.findUnique({ where: { slug: parsed.data.slug } });
    if (slugTaken) {
      return res.status(422).json({ errors: { slug: ["This slug is already in use."] } });
    }
  }

  const page = await prisma.cmsPage.update({
    where: { id: existing.id },
    data: parsed.data as unknown as Prisma.CmsPageUpdateInput,
  });
  res.json(page);
});

adminCmsPagesRouter.delete("/:id", async (req, res) => {
  const existing = await prisma.cmsPage.findFirst({
    where: { id: Number(req.params.id), deletedAt: null },
  });
  if (!existing) return res.status(404).json({ message: "CMS page not found" });

  await prisma.cmsPage.update({
    where: { id: existing.id },
    data: { deletedAt: new Date() },
  });
  res.status(204).send();
});
