import type { Metadata } from "next";
import Link from "next/link";
import { salaries } from "@/data/salaries";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "دليل الرواتب في مصر 2026 - متوسط الرواتب لجميع المهن",
  description:
    "اكتشف متوسط الرواتب في مصر لمختلف المهن والتخصصات. تحليل شامل للرواتب والضرائب والتأمينات في السوق المصري.",
  alternates: { canonical: "/salary" },
};

export default function SalaryIndexPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "الرواتب" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">دليل الرواتب في مصر 2026</h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-2xl leading-relaxed">
        اكتشف متوسط الرواتب لمختلف المهن في مصر. معلومات محدثة عن الرواتب والضرائب والتأمينات.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {salaries.map((salary) => (
          <Link key={salary.slug} href={`/salary/${salary.slug}`}>
            <Card className="h-full hover:border-brand-500/30 group">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-brand-500 transition-colors">{salary.profession}</CardTitle>
                <p className="text-sm text-[var(--text-muted)]">{salary.professionEn}</p>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-extrabold text-brand-500">
                  {formatCurrency(salary.averageSalary)}
                </p>
                <p className="text-sm text-[var(--text-muted)]">متوسط الراتب الشهري</p>
                <div className="mt-2 text-xs text-[var(--text-muted)]">
                  {formatCurrency(salary.minSalary)} - {formatCurrency(salary.maxSalary)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
