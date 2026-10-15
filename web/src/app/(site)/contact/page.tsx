import ContactForm from "@/components/ContactForm";
import { apiGet, type ContactInfo } from "@/lib/api";
import { getMetaField, pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const contactInfo = await apiGet<ContactInfo>("/cms-pages/contact");
  return pageMetadata({
    title: getMetaField(contactInfo.metaData, "meta_title") ?? "Contact Us",
    description:
      getMetaField(contactInfo.metaData, "meta_description") ??
      "Get in touch with Empireo Holidays for your travel inquiries — call, email, or WhatsApp us for personalized holiday planning.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const contactInfo = await apiGet<ContactInfo>("/cms-pages/contact");

  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp || "1234567890"}?text=${encodeURIComponent(
    "Hi, I have a travel inquiry."
  )}`;

  return (
    <main className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for your travel inquiries</p>
        </div>
      </div>

      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-form">
              <h2 style={{ marginBottom: 24 }}>Send us a Message</h2>
              <ContactForm />
            </div>

            <div className="contact-info">
              <h2 style={{ marginBottom: 24 }}>Get in Touch</h2>

              {contactInfo.phone && (
                <div className="contact-info-item">
                  <div className="contact-info-icon">📞</div>
                  <div className="contact-info-content">
                    <h3>Phone</h3>
                    <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                  </div>
                </div>
              )}

              {contactInfo.email && (
                <div className="contact-info-item">
                  <div className="contact-info-icon">✉️</div>
                  <div className="contact-info-content">
                    <h3>Email</h3>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </div>
                </div>
              )}

              {contactInfo.whatsapp && (
                <div className="contact-info-item">
                  <div className="contact-info-icon">💬</div>
                  <div className="contact-info-content">
                    <h3>WhatsApp</h3>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.business_hours && (
                <div className="contact-info-item">
                  <div className="contact-info-icon">🕒</div>
                  <div className="contact-info-content">
                    <h3>Business Hours</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: contactInfo.business_hours.replace(/\n/g, "<br>"),
                      }}
                    ></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
