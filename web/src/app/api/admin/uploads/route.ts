import { getAdminToken } from "@/lib/adminApi";

const API_URL = process.env.NODE_API_URL ?? "http://localhost:4000";

export async function POST(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return Response.json({ message: "Unauthenticated." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dir = searchParams.get("dir") ?? "misc";
  const multiple = searchParams.get("multiple") === "1";

  const incomingForm = await request.formData();
  const forwardForm = new FormData();
  const field = multiple ? "files" : "file";
  for (const value of incomingForm.getAll(field)) {
    forwardForm.append(field, value);
  }

  const res = await fetch(`${API_URL}/admin/uploads${multiple ? "/multiple" : ""}?dir=${encodeURIComponent(dir)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: forwardForm,
  });

  const data = await res.json().catch(() => null);
  return Response.json(data, { status: res.status });
}
