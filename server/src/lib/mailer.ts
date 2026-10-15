import nodemailer from "nodemailer";

function createTransport() {
  const { BREVO_SMTP_HOST, BREVO_SMTP_PORT, BREVO_SMTP_USERNAME, BREVO_SMTP_PASSWORD } = process.env;

  if (BREVO_SMTP_USERNAME && BREVO_SMTP_PASSWORD) {
    return nodemailer.createTransport({
      host: BREVO_SMTP_HOST || "smtp-relay.brevo.com",
      port: Number(BREVO_SMTP_PORT) || 587,
      secure: false,
      auth: { user: BREVO_SMTP_USERNAME, pass: BREVO_SMTP_PASSWORD },
    });
  }

  // No SMTP credentials configured: log the message instead of sending, mirroring
  // Laravel's `log` mailer fallback so forms still "succeed" in local dev.
  return nodemailer.createTransport({ jsonTransport: true });
}

const transport = createTransport();
const usingRealTransport = Boolean(process.env.BREVO_SMTP_USERNAME && process.env.BREVO_SMTP_PASSWORD);

export async function sendMail(options: { to: string; subject: string; html: string }) {
  const from = process.env.MAIL_FROM_ADDRESS ?? "hello@example.com";
  const fromName = process.env.MAIL_FROM_NAME ?? process.env.APP_NAME ?? "Empire O Holidays";

  const info = await transport.sendMail({
    from: `"${fromName}" <${from}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  if (!usingRealTransport) {
    console.log(`[mail:log] to=${options.to} subject="${options.subject}"`);
  }

  return info;
}
