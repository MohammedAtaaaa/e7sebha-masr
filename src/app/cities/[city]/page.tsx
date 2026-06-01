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
    <>
      <Breadcrumbs
        items={[
          { label: "المدن", href: "/cities" },
          { label: cityData.name },
        ]}
      />
      <FAQJsonLd faqs={cityData.faqs} />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        تكلفة المعيشة في {cityData.name} 2026
      </h1>
      <p className="text-gray-600 mb-8">{cityData.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">تكلفة المعيشة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(cityData.costOfLiving)}</p>
            <p className="text-xs text-gray-500">شهرياً</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">متوسط الإيجار</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(cityData.avgRent)}</p>
            <p className="text-xs text-gray-500">شهرياً</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">متوسط الراتب</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(cityData.avgSalary)}</p>
            <p className="text-xs text-gray-500">شهرياً</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">التوفير المتوقع</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${savingsEstimate >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(savingsEstimate)}
            </p>
            <p className="text-xs text-gray-500">شهرياً</p>
          </CardContent>
        </Card>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">أبرز المعلومات</h2>
        <ul className="space-y-2">
          {cityData.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-600">
              <span className="text-emerald-500 mt-0.5">•</span>
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
    </>
  );
}
