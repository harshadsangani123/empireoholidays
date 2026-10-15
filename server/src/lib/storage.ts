const ASSET_BASE_URL = process.env.PUBLIC_ASSET_BASE_URL ?? `http://localhost:${process.env.PORT ?? 4000}`;

function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function resolveImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (isUrl(value)) return value;
  return `${ASSET_BASE_URL}/uploads/${value.replace(/^\/+/, "")}`;
}

export function resolveImageUrls(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return values.filter((v): v is string => typeof v === "string").map((v) => resolveImageUrl(v)!);
}
