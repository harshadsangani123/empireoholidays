import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PhotoGallery from "@/components/PhotoGallery";
import { type PackageDetail } from "@/lib/api";
import { absoluteUrl, pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const getPackage = cache(async (type: string, id: string): Promise<PackageDetail | null> => {
  const API_URL = process.env.NODE_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${API_URL}/packages/${type}/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load package: ${res.status}`);
  return res.json();
});

export async function generateMetadata({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await params;
  const pkg = await getPackage(type, id);
  if (!pkg) return {};

  return pageMetadata({
    title: pkg.metaTitle || `${pkg.name} Tour Packages from Ahmedabad | Empireo Holidays`,
    description:
      pkg.metaDescription ||
      pkg.description ||
      `Explore ${pkg.name} tour packages from Ahmedabad with Empireo Holidays — flights, hotels and complete travel assistance.`,
    path: `/package/${pkg.type}/${pkg.id}`,
    image: pkg.image,
  });
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  const pkg = await getPackage(type, id);

  if (!pkg) notFound();

  const inquiryUrl = `/package/${pkg.type}/${pkg.id}/inquiry`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.detailedDescription || pkg.description || undefined,
    image: pkg.photos,
    url: absoluteUrl(`/package/${pkg.type}/${pkg.id}`),
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <main className="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="package-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pkg.photos[0]} alt={pkg.name} className="hero-image" />
        <div className="hero-overlay">
          <div className="container">
            <h1 className="package-title">{pkg.name}</h1>
            {pkg.country && <p className="package-location">{pkg.country}</p>}
            {pkg.state && <p className="package-location">{pkg.state}, India</p>}
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: pkg.type === "international" ? "International" : "Domestic",
            href: `/${pkg.type}`,
          },
          { label: pkg.name },
        ]}
      />

      <section className="package-details-section">
        <div className="container">
          <div className="package-details-content">
            <PhotoGallery photos={pkg.photos} name={pkg.name} />

            <div className="package-description">
              <h2>About {pkg.name}</h2>
              <p className="description-text">{pkg.detailedDescription || pkg.description}</p>

              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <div className="package-section">
                  <h3>Inclusions</h3>
                  <ul className="package-list">
                    {pkg.inclusions.map((inclusion, index) => (
                      <li key={index}>{inclusion.item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div className="package-section">
                  <h3>Exclusions</h3>
                  <ul className="package-list">
                    {pkg.exclusions.map((exclusion, index) => (
                      <li key={index}>{exclusion.item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div className="package-section">
                  <h3>Itinerary</h3>
                  <div className="itinerary-list">
                    {pkg.itinerary.map((day, index) => (
                      <div key={index} className="itinerary-item">
                        <div className="itinerary-day">
                          <strong>{day.day || `Day ${index + 1}`}</strong>
                          {day.title && <span> - {day.title}</span>}
                        </div>
                        {day.description && <p className="itinerary-description">{day.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="inquiry-section">
                <Link href={inquiryUrl} className="btn btn-primary btn-large">
                  Inquiry Now
                </Link>
                <p className="inquiry-note">Fill out the inquiry form and we&apos;ll get back to you soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-packages-section" style={{ backgroundColor: "#F7F7F7", padding: "60px 0" }}>
        <div className="container">
          <div className="section-title">
            <h2>Explore More Packages</h2>
            <p>Discover other amazing destinations</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            {pkg.type === "international" ? (
              <Link href="/international" className="btn btn-primary">
                View All International Packages
              </Link>
            ) : (
              <Link href="/domestic" className="btn btn-primary">
                View All Domestic Packages
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
