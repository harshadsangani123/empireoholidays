import { proxyJson } from "@/lib/adminApi";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyJson(`/admin/packages/${id}`);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return proxyJson(`/admin/packages/${id}`, { method: "PUT", body });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyJson(`/admin/packages/${id}`, { method: "DELETE" });
}
