import type { Metadata } from "next";
import Link from "next/link";
import { banks } from "@/data/banks";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "مقارنة البنوك المصرية 2026 - قروض وشهادات وحسابات",
  description:
    "قارن بين البنوك المصرية - القروض الشخصية، تمويل السيارات، شهادات الادخار، وحسابات التوفير. البنك الأهلي، بنك مصر، CIB والمزيد.",
  alternates: { canonical: "/banks" },
};

export default function BanksIndexPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "البنوك" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">مقارنة البنوك المصرية 2026</h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-2xl leading-relaxed">
        قارن بين القروض والشهادات وحسابات التوفير في أكبر البنوك المصرية.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {banks.map((bank) => (
          <Link key={bank.slug} href={`/banks/${bank.slug}`}>
            <Card className="h-full hover:border-brand-500/30 group">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-brand-500 transition-colors">{bank.name}</CardTitle>
                <p className="text-sm text-[var(--text-muted)]">{bank.nameEn}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{bank.description}</p>
                <div className="flex flex-wrap gap-2">
                  {bank.features.slice(0, 3).map((feature) => (
                    <Badge key={feature}>{feature}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
