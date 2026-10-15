import bcrypt from "bcryptjs";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { requireAuth, type AuthedRequest } from "../middleware/auth";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ message: "Invalid email or password." });
  }

  const { email, password } = parsed.data;
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: "12h" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.adminUser.findUnique({ where: { id: req.adminUserId! } });
  if (!user) return res.status(401).json({ message: "Unauthenticated." });
  res.json({ id: user.id, name: user.name, email: user.email });
});
