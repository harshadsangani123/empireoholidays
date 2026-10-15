export function flattenErrors(errors: Record<string, string[]> | undefined | null): Record<string, string> {
  if (!errors) return {};
  const flat: Record<string, string> = {};
  for (const [key, messages] of Object.entries(errors)) {
    if (Array.isArray(messages) && messages.length > 0) flat[key] = messages[0];
  }
  return flat;
}
