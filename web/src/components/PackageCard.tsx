import Link from "next/link";
import type { PackageSummary } from "@/lib/api";

export default function PackageCard({ pkg, type }: { pkg: PackageSummary; type: "international" | "domestic" }) {
  const detailUrl = `/package/${type}/${pkg.id}`;
  const inquiryUrl = `/package/${type}/${pkg.id}/inquiry`;

  return (
    <div className="package-card">
      <Link href={detailUrl} className="package-card-link">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pkg.image ?? undefined} alt={pkg.name} className="package-card-image" />
        <div className="package-card-content">
          <h3 className="package-card-title">{pkg.name}</h3>
          <p className="package-card-description">{pkg.description}</p>
        </div>
      </Link>
      <Link href={inquiryUrl} className="package-card-button">
        Inquiry Now
      </Link>
    </div>
  );
}
