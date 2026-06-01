import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug, getRelatedCalculators } from "@/data/calculators";
import { CalculatorForm } from "@/components/calculators/calculator-form";
import { FAQSection, FAQJsonLd } from "@/components/seo/faq-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RelatedLinks } from "@/components/seo/related-links";
import { ShareButtons } from "@/components/seo/share-buttons";
import { AdSlot } from "@/components/layout/ad-slot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};

  return {
    title: calc.seo.title,
    description: calc.seo.description,
    keywords: calc.seo.keywords,
    alternates: { canonical: `/calculators/${slug}` },
    openGraph: {
      title: calc.seo.title,
      description: calc.seo.description,
      type: "website",
    },
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) notFound();

  const related = getRelatedCalculators(calc.relatedCalculators);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "الحاسبات", href: "/calculators" },
          { label: calc.title },
        ]}
      />
      <FAQJsonLd faqs={calc.faqs} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">{calc.seo.title}</h1>
      <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">{calc.seo.description}</p>

      <CalculatorForm config={calc} />

      <ShareButtons title={calc.title} path={`/calculators/${slug}`} />

      <AdSlot slot={`calc-${slug}`} format="horizontal" className="mt-10" />

      <FAQSection faqs={calc.faqs} />

      <RelatedLinks
        title="حاسبات ذات صلة"
        links={related.map((r) => ({
          title: r.title,
          href: `/calculators/${r.slug}`,
          description: r.description,
        }))}
      />
    </div>
  );
}
