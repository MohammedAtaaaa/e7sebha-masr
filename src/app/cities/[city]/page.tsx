import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAQSection, FAQJsonLd } from "@/components/seo/faq-section";
import { RelatedLinks } from "@/components/seo/related-links";
import { ShareButtons } from "@/components/seo/share-buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) return {};

  return {
    title: `تكلفة المعيشة في ${cityData.name} 2026 - إيجارات ورواتب`,
    description: `تكلفة المعيشة في ${cityData.name} ${formatCurrency(cityData.costOfLiving)} شهرياً. اعرف متوسط الإيجارات والرواتب ونصائح المعيشة.`,
    alternates: { canonical: `/cities/${city}` },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) notFound();

  const savingsEstimate = cityData.avgSalary - cityData.costOfLiving;
  const relatedCities = cityData.relatedCities
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "المدن", href: "/cities" },
          { label: cityData.name },
        ]}
      />
      <FAQJsonLd faqs={cityData.faqs} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
        تكلفة المعيشة في {cityData.name} 2026
      </h1>
      <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">{cityData.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card className="border-brand-500/20 bg-gradient-to-bl from-brand-50/50 to-transparent dark:from-brand-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">تكلفة المعيشة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold text-brand-500">{formatCurrency(cityData.costOfLiving)}</p>
            <p className="text-xs text-[var(--text-muted)]">شهرياً</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">متوسط الإيجار</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{formatCurrency(cityData.avgRent)}</p>
            <p className="text-xs text-[var(--text-muted)]">شهرياً</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">متوسط الراتب</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{formatCurrency(cityData.avgSalary)}</p>
            <p className="text-xs text-[var(--text-muted)]">شهرياً</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">التوفير المتوقع</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-extrabold ${savingsEstimate >= 0 ? "text-brand-500" : "text-red-500"}`}>
              {formatCurrency(savingsEstimate)}
            </p>
            <p className="text-xs text-[var(--text-muted)]">شهرياً</p>
          </CardContent>
        </Card>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-4">أبرز المعلومات</h2>
        <ul className="space-y-3">
          {cityData.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-500 shrink-0 mt-0.5 text-xs dark:bg-brand-900/30">✓</span>
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <ShareButtons title={`تكلفة المعيشة في ${cityData.name}`} path={`/cities/${city}`} />

      <FAQSection faqs={cityData.faqs} />

      <RelatedLinks
        title="مدن ذات صلة"
        links={relatedCities.map((c) => ({
          title: c!.name,
          href: `/cities/${c!.slug}`,
          description: `تكلفة المعيشة: ${formatCurrency(c!.costOfLiving)}`,
        }))}
      />
    </div>
  );
}
