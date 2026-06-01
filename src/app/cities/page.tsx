import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/data/cities";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "تكلفة المعيشة في المدن المصرية 2026",
  description:
    "قارن تكلفة المعيشة والإيجارات ومتوسط الرواتب في المدن المصرية. القاهرة، الإسكندرية، الجيزة والمزيد.",
  alternates: { canonical: "/cities" },
};

export default function CitiesIndexPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "المدن" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">تكلفة المعيشة في المدن المصرية</h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-2xl leading-relaxed">
        قارن بين تكلفة المعيشة والإيجارات ومتوسط الرواتب في مختلف المدن المصرية.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link key={city.slug} href={`/cities/${city.slug}`}>
            <Card className="h-full hover:border-brand-500/30 group">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-brand-500 transition-colors">{city.name}</CardTitle>
                <p className="text-sm text-[var(--text-muted)]">{city.nameEn}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">تكلفة المعيشة</span>
                  <span className="font-semibold text-[var(--text-primary)]">{formatCurrency(city.costOfLiving)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">متوسط الإيجار</span>
                  <span className="font-semibold text-[var(--text-primary)]">{formatCurrency(city.avgRent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">متوسط الراتب</span>
                  <span className="font-semibold text-brand-500">{formatCurrency(city.avgSalary)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
