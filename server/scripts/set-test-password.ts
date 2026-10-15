import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const email = "admin@empireo.com";
  const password = "test-password-123";
  const hash = await bcrypt.hash(password, 12);
  await prisma.adminUser.update({ where: { email }, data: { password: hash } });
  console.log(`Set local dev-only password for ${email}`);
  await prisma.$disconnect();
}

main();
