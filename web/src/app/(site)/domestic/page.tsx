import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PackageCard from "@/components/PackageCard";
import { apiGet, type PackageSummary } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Domestic Tour Packages from Ahmedabad",
  description:
    "Discover Empireo Holidays' domestic tour packages from Ahmedabad — explore the best of India with curated trips, comfortable stays, and hassle-free itineraries.",
  path: "/domestic",
});

export default async function DomesticPage() {
  const packages = await apiGet<PackageSummary[]>("/packages?type=domestic");

  return (
    <main className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>Domestic Holiday Packages</h1>
          <p>Discover the beauty of India</p>
        </div>
      </div>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Domestic Tour Packages" }]} />

      <section className="packages-section">
        <div className="container">
          <div className="grid grid-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} type="domestic" />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p>
              Dreaming of an international getaway?{" "}
              <Link href="/international">Explore our international tour packages</Link> or{" "}
              <Link href="/contact">contact us</Link> for a personalized itinerary.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
