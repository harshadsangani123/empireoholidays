import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import { type PackageDetail } from "@/lib/api";

async function getPackage(type: string, id: string): Promise<PackageDetail | null> {
  const API_URL = process.env.NODE_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${API_URL}/packages/${type}/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load package: ${res.status}`);
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await params;
  const pkg = await getPackage(type, id);
  return {
    title: pkg ? `Inquiry for ${pkg.name}` : "Package Inquiry",
    description: pkg
      ? `Send an inquiry for the ${pkg.name} holiday package and Empireo Holidays will get back to you shortly.`
      : undefined,
    // Inquiry forms are per-package duplicates of the same form — keep them out of search results.
    robots: { index: false, follow: true },
  };
}

export default async function PackageInquiryPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  const pkg = await getPackage(type, id);

  if (!pkg) notFound();

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || null;

  return (
    <main className="main-content">
      <section className="package-details-section">
        <div className="container">
          <div className="package-details-content">
            <InquiryForm pkg={{ id: pkg.id, name: pkg.name, type: pkg.type }} recaptchaSiteKey={recaptchaSiteKey} />
          </div>
        </div>
      </section>

      {pkg.image && (
        <section className="package-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pkg.image} alt={pkg.name} className="hero-image" />
          <div className="hero-overlay">
            <div className="container">
              <h1 className="package-title">Inquiry for {pkg.name}</h1>
              {pkg.country && <p className="package-location">{pkg.country}</p>}
              {pkg.state && <p className="package-location">{pkg.state}, India</p>}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
