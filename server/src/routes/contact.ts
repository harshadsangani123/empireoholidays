import { Router } from "express";
import { contactFormEmail } from "../lib/emailTemplates";
import { sendMail } from "../lib/mailer";
import { contactFormSchema } from "../lib/validation";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  const parsed = contactFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ errors: parsed.error.flatten().fieldErrors });
  }

  const data = parsed.data;
  const inquiryEmail = process.env.INQUIRY_EMAIL || process.env.MAIL_FROM_ADDRESS || "hello@example.com";

  try {
    await sendMail({
      to: inquiryEmail,
      subject: `New Contact Message - ${process.env.APP_NAME ?? "Empire O Holidays"}`,
      html: contactFormEmail(data),
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    res.status(500).json({
      errors: { message: ["Sorry, there was an error sending your message. Please try again later or contact us directly."] },
    });
  }
});
