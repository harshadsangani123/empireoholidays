import { proxyJson } from "@/lib/adminApi";

export async function GET() {
  return proxyJson("/admin/cms-pages");
}

export async function POST(request: Request) {
  const body = await request.json();
  return proxyJson("/admin/cms-pages", { method: "POST", body });
}
