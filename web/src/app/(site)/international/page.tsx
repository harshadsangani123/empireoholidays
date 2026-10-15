import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PackageCard from "@/components/PackageCard";
import { apiGet, type PackageSummary } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "International Tour Packages from Ahmedabad",
  description:
    "Explore Empireo Holidays' international tour packages from Ahmedabad — curated trips to top destinations around the world with flights, stays, and itineraries planned for you.",
  path: "/international",
});

export default async function InternationalPage() {
  const packages = await apiGet<PackageSummary[]>("/packages?type=international");

  return (
    <main className="main-content">
      <div className="page-header">
        <div className="container">
          <h1>International Holiday Packages</h1>
          <p>Explore amazing destinations around the world</p>
        </div>
      </div>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "International Tour Packages" }]} />

      <section className="packages-section">
        <div className="container">
          <div className="grid grid-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} type="international" />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p>
              Looking for holidays closer to home? <Link href="/domestic">Explore our domestic tour packages</Link> or{" "}
              <Link href="/contact">contact us</Link> for a personalized itinerary.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
