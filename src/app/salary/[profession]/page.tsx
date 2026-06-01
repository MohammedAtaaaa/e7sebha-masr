import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { salaries, getSalaryBySlug } from "@/data/salaries";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAQSection, FAQJsonLd } from "@/components/seo/faq-section";
import { RelatedLinks } from "@/components/seo/related-links";
import { ShareButtons } from "@/components/seo/share-buttons";
import { Badge } from "@/components/ui/badge";
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
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "الرواتب", href: "/salary" },
          { label: salary.profession },
        ]}
      />
      <FAQJsonLd faqs={salary.faqs} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
        راتب {salary.profession} في مصر 2026
      </h1>
      <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">{salary.description}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card className="border-brand-500/20 bg-gradient-to-bl from-brand-50/50 to-transparent dark:from-brand-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">متوسط الراتب</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold text-brand-500">{formatCurrency(salary.averageSalary)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">الحد الأدنى</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{formatCurrency(salary.minSalary)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">الحد الأقصى</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold text-[var(--text-primary)]">{formatCurrency(salary.maxSalary)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--text-muted)]">صافي الراتب (تقديري)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-extrabold text-gold-500">{formatCurrency(Math.round(netSalary))}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mb-10">
        <section>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-4">المهارات المطلوبة</h2>
          <div className="flex flex-wrap gap-2">
            {salary.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)] mb-4">نصائح للتطور المهني</h2>
          <ul className="space-y-3">
            {salary.growthTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-500 shrink-0 mt-0.5 text-xs dark:bg-brand-900/30">✓</span>
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
    </div>
  );
}
