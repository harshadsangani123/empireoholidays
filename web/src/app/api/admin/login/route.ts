import { cookies } from "next/headers";

const API_URL = process.env.NODE_API_URL ?? "http://localhost:4000";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return Response.json(data, { status: res.status });
  }

  const store = await cookies();
  store.set("admin_token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return Response.json({ user: data.user });
}
