import { z } from "zod";
import { prisma } from "./prisma";

export const contactFormSchema = z.object({
  name: z.string({ message: "Please enter your name." }).min(1, "Please enter your name.").max(255),
  email: z
    .string({ message: "Please enter your email address." })
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address.")
    .max(255),
  phone: z.string({ message: "Please enter your phone number." }).min(1, "Please enter your phone number.").max(20),
  message: z.string().max(2000).nullable().optional(),
});

const todayAtMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const packageInquirySchema = z
  .object({
    name: z.string({ message: "Please enter your name." }).min(1, "Please enter your name.").max(255),
    email: z
      .string({ message: "Please enter your email address." })
      .min(1, "Please enter your email address.")
      .email("Please enter a valid email address.")
      .max(255),
    phone: z
      .string({ message: "Please enter your phone number." })
      .min(1, "Please enter your phone number.")
      .max(20),
    travel_date: z
      .string()
      .nullable()
      .optional()
      .refine((v) => !v || !Number.isNaN(new Date(v).getTime()), "Please enter a valid travel date.")
      .refine((v) => !v || new Date(v) >= todayAtMidnight(), "Travel date must be today or in the future."),
    number_of_travelers: z.coerce
      .number({ message: "Number of travelers must be a valid number." })
      .int("Number of travelers must be a valid number.")
      .min(1, "Number of travelers must be at least 1.")
      .max(50)
      .nullable()
      .optional(),
    message_text: z.string().max(2000).nullable().optional(),
    package_id: z.coerce.number({ message: "Invalid package selected." }),
    package_name: z.string().min(1),
    package_type: z.enum(["international", "domestic"]),
  })
  .superRefine(async (data, ctx) => {
    const exists = await prisma.package.findUnique({ where: { id: data.package_id } });
    if (!exists) {
      ctx.addIssue({ code: "custom", path: ["package_id"], message: "Invalid package selected." });
    }
  });
