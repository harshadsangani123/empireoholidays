import { cookies } from "next/headers";

export async function POST() {
  const store = await cookies();
  store.delete("admin_token");
  return Response.json({ success: true });
}
