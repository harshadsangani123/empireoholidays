import Image from "next/image";
import Link from "next/link";
import type { FooterContact } from "@/lib/api";

export default function Footer({ footerContact }: { footerContact: FooterContact }) {
  const whatsappUrl = `https://wa.me/${footerContact.whatsapp || "1234567890"}?text=${encodeURIComponent(
    "Hi, I'm interested in your travel packages."
  )}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/about" className="footer-link">
                About Us
              </Link>
              <Link href="/international" className="footer-link">
                International
              </Link>
              <Link href="/domestic" className="footer-link">
                Domestic
              </Link>
              <Link href="/contact" className="footer-link">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="footer-section">
            <h3>About Us</h3>
            <div className="footer-links">
              <Link href="/international" className="footer-link">
                International Packages
              </Link>
              <Link href="/domestic" className="footer-link">
                Domestic Packages
              </Link>
            </div>
          </div>

          <div className="footer-section footer-logo-section">
            <Image src="/images/logo-footer.png" alt="Empireo Holidays" className="footer-logo" width={160} height={60} />
          </div>

          <div className="footer-section">
            <h3>Tour Types</h3>
            <div className="footer-links">
              <span className="footer-link">Couple Tour</span>
              <span className="footer-link">Customize Tour</span>
              <span className="footer-link">Family Tour</span>
              <span className="footer-link">Summer Tour</span>
            </div>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            {footerContact.phone && (
              <div className="footer-contact-item">
                <span>📞</span>
                <a href={`tel:${footerContact.phone}`}>{footerContact.phone}</a>
              </div>
            )}
            {footerContact.email && (
              <div className="footer-contact-item">
                <span>✉️</span>
                <a href={`mailto:${footerContact.email}`}>{footerContact.email}</a>
              </div>
            )}
            {footerContact.whatsapp && (
              <div className="footer-contact-item">
                <span>💬</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </div>
            )}

            <div className="footer-social">
              <p className="footer-social-title">Follow Us</p>
              <div className="footer-social-icons">
                {footerContact.social.facebook && (
                  <a
                    href={footerContact.social.facebook}
                    className="footer-social-icon footer-social-icon--facebook"
                    target="_blank"
                    rel="noopener"
                    aria-label="Follow us on Facebook"
                  >
                    <span>f</span>
                  </a>
                )}
                {footerContact.social.instagram && (
                  <a
                    href={footerContact.social.instagram}
                    className="footer-social-icon footer-social-icon--instagram"
                    target="_blank"
                    rel="noopener"
                    aria-label="Follow us on Instagram"
                  >
                    <Image src="/images/icon-instagram.svg" alt="Instagram" className="footer-social-image" width={20} height={20} />
                  </a>
                )}
                {footerContact.social.linkedin && (
                  <a
                    href={footerContact.social.linkedin}
                    className="footer-social-icon footer-social-icon--linkedin"
                    target="_blank"
                    rel="noopener"
                    aria-label="Follow us on LinkedIn"
                  >
                    <span>in</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ margin: 0 }}>© 2026 EmpireoHolidays. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
