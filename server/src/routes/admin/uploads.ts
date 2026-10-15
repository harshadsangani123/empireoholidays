import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { Router } from "express";
import multer from "multer";
import { resolveImageUrl } from "../../lib/storage";

export const adminUploadsRouter = Router();

const UPLOADS_ROOT = path.join(__dirname, "..", "..", "..", "uploads");

function sanitizeDir(input: unknown): string {
  const dir = typeof input === "string" ? input : "misc";
  // Strip anything that could escape the uploads root.
  return dir.replace(/\.\./g, "").replace(/^\/+/, "");
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const dir = path.join(UPLOADS_ROOT, sanitizeDir(req.query.dir));
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

function relativePath(dir: string, filename: string): string {
  return path.posix.join(sanitizeDir(dir), filename);
}

adminUploadsRouter.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(422).json({ message: "No file uploaded." });
  const relPath = relativePath(req.query.dir as string, req.file.filename);
  res.status(201).json({ path: relPath, url: resolveImageUrl(relPath) });
});

adminUploadsRouter.post("/multiple", upload.array("files", 20), (req, res) => {
  const files = (req.files as Express.Multer.File[]) ?? [];
  if (files.length === 0) return res.status(422).json({ message: "No files uploaded." });
  const results = files.map((f) => {
    const relPath = relativePath(req.query.dir as string, f.filename);
    return { path: relPath, url: resolveImageUrl(relPath) };
  });
  res.status(201).json(results);
});
