import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { salaries, getSalaryBySlug } from "@/data/salaries";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAQSection, FAQJsonLd } from "@/components/seo/faq-section";
import { RelatedLinks } from "@/components/seo/related-links";
import { ShareButtons } from "@/components/seo/share-buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: Promise<{ profession: string }>;
}

export function generateStaticParams() {
  return salaries.map((s) => ({ profession: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession } = await params;
  const salary = getSalaryBySlug(profession);
  if (!salary) return {};

  return {
    title: `راتب ${salary.profession} في مصر 2026 - ${salary.professionEn}`,
    description: `متوسط راتب ${salary.profession} في مصر ${formatCurrency(salary.averageSalary)} شهرياً. تعرف على تفاصيل الراتب والضرائب والتأمينات ونصائح التطور المهني.`,
    alternates: { canonical: `/salary/${profession}` },
  };
}

export default async function SalaryPage({ params }: PageProps) {
  const { profession } = await params;
  const salary = getSalaryBySlug(profession);

  if (!salary) notFound();

  const netSalary = salary.averageSalary * (1 - salary.insurance / 100 - salary.taxRate / 100);
  const relatedSalaries = salary.relatedProfessions
    .map((slug) => salaries.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "الرواتب", href: "/salary" },
          { label: salary.profession },
        ]}
      />
      <FAQJsonLd faqs={salary.faqs} />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        راتب {salary.profession} في مصر 2026
      </h1>
      <p className="text-gray-600 mb-8">{salary.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">متوسط الراتب</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">{formatCurrency(salary.averageSalary)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">الحد الأدنى</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(salary.minSalary)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">الحد الأقصى</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(salary.maxSalary)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600">صافي الراتب (تقديري)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(Math.round(netSalary))}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mb-8">
        <section>
          <h2 className="text-xl font-bold mb-4">المهارات المطلوبة</h2>
          <div className="flex flex-wrap gap-2">
            {salary.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4">نصائح للتطور المهني</h2>
          <ul className="space-y-2">
            {salary.growthTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600">
                <span className="text-emerald-500 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ShareButtons title={`راتب ${salary.profession} في مصر`} path={`/salary/${profession}`} />

      <FAQSection faqs={salary.faqs} />

      <RelatedLinks
        title="مهن ذات صلة"
        links={relatedSalaries.map((s) => ({
          title: s!.profession,
          href: `/salary/${s!.slug}`,
          description: `متوسط الراتب: ${formatCurrency(s!.averageSalary)}`,
        }))}
      />
    </>
  );
}
