import Link from "next/link";
import { SITE_URL } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: "الرئيسية", href: "/" }, ...items];

  return (
    <>
      <nav aria-label="breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-[var(--text-muted)]">/</span>}
              {item.href ? (
                <Link href={item.href} className="text-[var(--text-muted)] hover:text-brand-500 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[var(--text-primary)] font-semibold">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <BreadcrumbJsonLd items={allItems} />
    </>
  );
}

function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
