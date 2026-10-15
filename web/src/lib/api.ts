const API_URL = process.env.NODE_API_URL ?? "http://localhost:4000";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API GET ${path} failed with ${res.status}`);
  }
  return res.json();
}

export async function apiPost(path: string, body: unknown): Promise<{ status: number; data: any }> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  return { status: res.status, data };
}

export interface PackageSummary {
  id: number;
  name: string;
  country: string | null;
  state: string | null;
  description: string | null;
  image: string | null;
  price_per_person: string | null;
  currency: string;
  duration: string | null;
  type: "international" | "domestic";
}

export interface PackageDetail extends PackageSummary {
  detailedDescription: string | null;
  photos: string[];
  inclusions: { item: string }[];
  exclusions: { item: string }[];
  itinerary: { day: string; title: string; description?: string }[];
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface ContactInfo {
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  business_hours: string | null;
  address: string | null;
  metaData: unknown;
  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
}

export interface FooterContact {
  phone: string;
  email: string;
  whatsapp: string;
  business_hours: string;
  address: string;
  social: { facebook: string; instagram: string; linkedin: string };
}
