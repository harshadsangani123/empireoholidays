import { escapeHtml } from "./html";

const APP_NAME = process.env.APP_NAME ?? "Empire O Holidays";

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
}

export function contactFormEmail(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Message</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
        .email-container { background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background-color: #2563eb; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; margin: -30px -30px 30px -30px; }
        .header h1 { margin: 0; font-size: 22px; }
        .info-row { margin-bottom: 12px; }
        .info-label { font-weight: bold; color: #555; display: inline-block; width: 120px; }
        .info-value a { color: #2563eb; text-decoration: none; }
        .message-box { background-color: #f9f9f9; border-left: 4px solid #2563eb; padding: 15px; margin-top: 10px; border-radius: 4px; white-space: pre-line; }
        .timestamp { font-size: 12px; color: #999; margin-top: 20px; text-align: right; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header"><h1>New Contact Message</h1></div>

        <div class="info-row">
            <span class="info-label">Name:</span>
            <span class="info-value">${escapeHtml(data.name ?? "N/A")}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value"><a href="mailto:${escapeHtml(data.email ?? "")}">${escapeHtml(data.email ?? "N/A")}</a></span>
        </div>
        <div class="info-row">
            <span class="info-label">Phone:</span>
            <span class="info-value"><a href="tel:${escapeHtml(data.phone ?? "")}">${escapeHtml(data.phone ?? "N/A")}</a></span>
        </div>

        <h3>Message</h3>
        <div class="message-box">${escapeHtml(data.message ?? "No message provided.")}</div>

        <div class="timestamp">Received: ${formatTimestamp(new Date())}</div>

        <div class="footer">
            <p>This is an automated email from ${escapeHtml(APP_NAME)}.</p>
            <p>Please respond directly to the customer's email address above.</p>
        </div>
    </div>
</body>
</html>`;
}

export interface PackageInquiryData {
  name: string;
  email: string;
  phone: string;
  package_name: string;
  package_type: string;
  travel_date?: string | null;
  number_of_travelers?: number | null;
  message_text?: string | null;
}

export function packageInquiryEmail(data: PackageInquiryData): string {
  const hasTravelDetails = Boolean(data.travel_date) || Boolean(data.number_of_travelers);
  const travelType = (data.package_type ?? "N/A").replace(/^./, (c) => c.toUpperCase());

  const travelDetailsSection = hasTravelDetails
    ? `
        <div class="info-section">
            <h2>Travel Details</h2>
            ${
              data.travel_date
                ? `<div class="info-row"><span class="info-label">Travel Date:</span><span class="info-value">${escapeHtml(
                    new Intl.DateTimeFormat("en-US", { month: "long", day: "2-digit", year: "numeric" }).format(
                      new Date(data.travel_date)
                    )
                  )}</span></div>`
                : ""
            }
            ${
              data.number_of_travelers
                ? `<div class="info-row"><span class="info-label">Travelers:</span><span class="info-value">${escapeHtml(
                    data.number_of_travelers
                  )} ${data.number_of_travelers === 1 ? "person" : "people"}</span></div>`
                : ""
            }
        </div>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Package Inquiry</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
        .email-container { background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background-color: #f53003; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; margin: -30px -30px 30px -30px; }
        .header h1 { margin: 0; font-size: 24px; }
        .info-section { margin-bottom: 25px; }
        .info-section h2 { color: #f53003; font-size: 18px; margin-bottom: 10px; border-bottom: 2px solid #f53003; padding-bottom: 5px; }
        .info-row { margin-bottom: 15px; }
        .info-label { font-weight: bold; color: #666; display: inline-block; width: 150px; }
        .info-value { color: #333; }
        .message-box { background-color: #f9f9f9; border-left: 4px solid #f53003; padding: 15px; margin-top: 10px; border-radius: 4px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
        .timestamp { font-size: 12px; color: #999; margin-top: 20px; text-align: right; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header"><h1>New Package Inquiry</h1></div>

        <div class="info-section">
            <h2>Package Information</h2>
            <div class="info-row"><span class="info-label">Package:</span><span class="info-value">${escapeHtml(data.package_name ?? "N/A")}</span></div>
            <div class="info-row"><span class="info-label">Type:</span><span class="info-value">${escapeHtml(travelType)}</span></div>
        </div>

        <div class="info-section">
            <h2>Customer Information</h2>
            <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${escapeHtml(data.name ?? "N/A")}</span></div>
            <div class="info-row"><span class="info-label">Email:</span><span class="info-value"><a href="mailto:${escapeHtml(data.email ?? "")}">${escapeHtml(data.email ?? "N/A")}</a></span></div>
            <div class="info-row"><span class="info-label">Phone:</span><span class="info-value"><a href="tel:${escapeHtml(data.phone ?? "")}">${escapeHtml(data.phone ?? "N/A")}</a></span></div>
        </div>
        ${travelDetailsSection}
        <div class="info-section">
            <h2>Message</h2>
            <div class="message-box">${escapeHtml(data.message_text ?? "No message provided.")}</div>
        </div>

        <div class="timestamp">Received: ${formatTimestamp(new Date())}</div>

        <div class="footer">
            <p>This is an automated email from ${escapeHtml(APP_NAME)}.</p>
            <p>Please respond directly to the customer's email address: <a href="mailto:${escapeHtml(data.email ?? "")}">${escapeHtml(data.email ?? "N/A")}</a></p>
        </div>
    </div>
</body>
</html>`;
}
