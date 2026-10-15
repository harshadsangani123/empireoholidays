import { proxyJson } from "@/lib/adminApi";

export async function GET() {
  return proxyJson("/admin/packages");
}

export async function POST(request: Request) {
  const body = await request.json();
  return proxyJson("/admin/packages", { method: "POST", body });
}
