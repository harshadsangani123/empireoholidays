import type { Prisma } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { packageInputSchema, packageUpdateSchema } from "../../lib/adminValidation";

export const adminPackagesRouter = Router();

adminPackagesRouter.get("/", async (_req, res) => {
  const packages = await prisma.package.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
  });
  res.json(packages);
});

adminPackagesRouter.get("/:id", async (req, res) => {
  const pkg = await prisma.package.findFirst({
    where: { id: Number(req.params.id), deletedAt: null },
  });
  if (!pkg) return res.status(404).json({ message: "Package not found" });
  res.json(pkg);
});

adminPackagesRouter.post("/", async (req, res) => {
  const parsed = packageInputSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
  }
  const pkg = await prisma.package.create({
    data: parsed.data as unknown as Prisma.PackageCreateInput,
  });
  res.status(201).json(pkg);
});

adminPackagesRouter.put("/:id", async (req, res) => {
  const parsed = packageUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const existing = await prisma.package.findFirst({
    where: { id: Number(req.params.id), deletedAt: null },
  });
  if (!existing) return res.status(404).json({ message: "Package not found" });

  const pkg = await prisma.package.update({
    where: { id: existing.id },
    data: parsed.data as unknown as Prisma.PackageUpdateInput,
  });
  res.json(pkg);
});

adminPackagesRouter.delete("/:id", async (req, res) => {
  const existing = await prisma.package.findFirst({
    where: { id: Number(req.params.id), deletedAt: null },
  });
  if (!existing) return res.status(404).json({ message: "Package not found" });

  await prisma.package.update({
    where: { id: existing.id },
    data: { deletedAt: new Date() },
  });
  res.status(204).send();
});
