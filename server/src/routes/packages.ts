import { Router } from "express";
import { prisma } from "../lib/prisma";
import { formatPackageForDetail, formatPackageForList } from "../lib/packageFormatter";

export const packagesRouter = Router();

packagesRouter.get("/", async (req, res) => {
  const { type, featured, published } = req.query;

  const where: Record<string, unknown> = { deletedAt: null };
  if (type === "international" || type === "domestic") {
    where.type = type;
  }
  if (featured !== undefined) {
    where.isFeatured = featured === "1" || featured === "true";
  }
  if (published === undefined || published === "1" || published === "true") {
    where.isPublished = true;
  }

  const limit = req.query.limit ? Number(req.query.limit) : undefined;

  const packages = await prisma.package.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    take: limit,
  });

  res.json(packages.map(formatPackageForList));
});

packagesRouter.get("/:type/:id", async (req, res) => {
  const { type, id } = req.params;

  if (type !== "international" && type !== "domestic") {
    return res.status(404).json({ message: "Package not found" });
  }

  const pkg = await prisma.package.findFirst({
    where: { id: Number(id), type, isPublished: true, deletedAt: null },
  });

  if (!pkg) {
    return res.status(404).json({ message: "Package not found" });
  }

  res.json(formatPackageForDetail(pkg));
});
