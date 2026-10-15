import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "@/styles/base.css";
import "@/styles/layout.css";
import "@/styles/header.css";
import "@/styles/footer.css";
import "@/styles/components.css";
import "@/styles/pages.css";
import "@/styles/package-detail.css";
import "@/styles/responsive.css";
import "@/styles/inquiry-form.css";
import "@/styles/admin.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Domestic & International Tour Packages`,
  },
  description:
    "Explore domestic and international tour packages with Empireo Holidays. Book honeymoon, family, group and corporate holidays with flight, hotel, visa and travel assistance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
