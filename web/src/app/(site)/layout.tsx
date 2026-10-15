import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { apiGet, type FooterContact } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const footerContact = await apiGet<FooterContact>("/cms-pages/footer-contact");

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-header.jpg`,
    telephone: footerContact.phone || undefined,
    email: footerContact.email || undefined,
    areaServed: "Ahmedabad, Gujarat, India",
    sameAs: [footerContact.social.facebook, footerContact.social.instagram, footerContact.social.linkedin].filter(Boolean),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Header />
      {children}
      <Footer footerContact={footerContact} />
      <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
    </>
  );
}
