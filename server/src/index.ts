import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "node:path";
import { requireAuth } from "./middleware/auth";
import { adminCmsPagesRouter } from "./routes/admin/cmsPages";
import { adminPackagesRouter } from "./routes/admin/packages";
import { adminUploadsRouter } from "./routes/admin/uploads";
import { authRouter } from "./routes/auth";
import { cmsPagesRouter } from "./routes/cmsPages";
import { contactRouter } from "./routes/contact";
import { inquiriesRouter } from "./routes/inquiries";
import { packagesRouter } from "./routes/packages";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/packages", packagesRouter);
app.use("/cms-pages", cmsPagesRouter);
app.use("/contact", contactRouter);
app.use("/inquiries", inquiriesRouter);

app.use("/auth", authRouter);
app.use("/admin/packages", requireAuth, adminPackagesRouter);
app.use("/admin/cms-pages", requireAuth, adminCmsPagesRouter);
app.use("/admin/uploads", requireAuth, adminUploadsRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
