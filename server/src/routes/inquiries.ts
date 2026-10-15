import { Router } from "express";
import { packageInquiryEmail } from "../lib/emailTemplates";
import { sendMail } from "../lib/mailer";
import { isRecaptchaConfigured, verifyRecaptchaToken } from "../lib/recaptcha";
import { packageInquirySchema } from "../lib/validation";

export const inquiriesRouter = Router();

inquiriesRouter.post("/", async (req, res) => {
  if (isRecaptchaConfigured()) {
    const token = req.body["g-recaptcha-response"];
    if (!token) {
      return res.status(422).json({
        errors: { "g-recaptcha-response": ["Please complete the reCAPTCHA verification."] },
      });
    }
    const ok = await verifyRecaptchaToken(token, req.ip ?? "");
    if (!ok) {
      return res.status(422).json({
        errors: { "g-recaptcha-response": ["reCAPTCHA verification failed. Please try again."] },
      });
    }
  }

  const parsed = await packageInquirySchema.safeParseAsync(req.body);
  if (!parsed.success) {
    return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const data = parsed.data;
  const inquiryEmail = process.env.INQUIRY_EMAIL || process.env.MAIL_FROM_ADDRESS || "hello@example.com";

  try {
    await sendMail({
      to: inquiryEmail,
      subject: `New Inquiry for ${data.package_name} - ${process.env.APP_NAME ?? "Empire O Holidays"}`,
      html: packageInquiryEmail(data),
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Inquiry email failed:", err);
    res.status(500).json({
      errors: { message: ["Sorry, there was an error sending your inquiry. Please try again later or contact us directly."] },
    });
  }
});
