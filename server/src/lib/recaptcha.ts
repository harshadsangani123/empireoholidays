export function isRecaptchaConfigured(): boolean {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY);
}

export async function verifyRecaptchaToken(token: string, remoteIp: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true;

  const params = new URLSearchParams({ secret: secretKey, response: token, remoteip: remoteIp });
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}
