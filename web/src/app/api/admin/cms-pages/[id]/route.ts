import { proxyJson } from "@/lib/adminApi";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyJson(`/admin/cms-pages/${id}`);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return proxyJson(`/admin/cms-pages/${id}`, { method: "PUT", body });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyJson(`/admin/cms-pages/${id}`, { method: "DELETE" });
}
