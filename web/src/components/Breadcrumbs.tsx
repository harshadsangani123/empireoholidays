import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? absoluteUrl(item.href) : undefined,
    })),
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="breadcrumbs-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbs-item">
            {item.href && index < items.length - 1 ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="breadcrumbs-separator">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
