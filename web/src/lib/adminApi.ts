import { cookies } from "next/headers";

const API_URL = process.env.NODE_API_URL ?? "http://localhost:4000";

export async function getAdminToken(): Promise<string | null> {
  const store = await cookies();
  return store.get("admin_token")?.value ?? null;
}

export async function proxyJson(
  nodePath: string,
  init: { method?: string; body?: unknown } = {}
): Promise<Response> {
  const token = await getAdminToken();
  if (!token) {
    return Response.json({ message: "Unauthenticated." }, { status: 401 });
  }

  const res = await fetch(`${API_URL}${nodePath}`, {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });

  if (res.status === 204) return new Response(null, { status: 204 });
  const data = await res.json().catch(() => null);
  return Response.json(data, { status: res.status });
}

export async function adminFetchJson<T>(nodePath: string): Promise<T | null> {
  const token = await getAdminToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}${nodePath}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
