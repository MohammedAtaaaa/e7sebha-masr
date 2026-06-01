import type { Metadata } from "next";
import Link from "next/link";
import { banks } from "@/data/banks";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "مقارنة البنوك المصرية 2026 - قروض وشهادات وحسابات",
  description:
    "قارن بين البنوك المصرية - القروض الشخصية، تمويل السيارات، شهادات الادخار، وحسابات التوفير. البنك الأهلي، بنك مصر، CIB والمزيد.",
  alternates: { canonical: "/banks" },
};

export default function BanksIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "البنوك" }]} />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">مقارنة البنوك المصرية 2026</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        قارن بين القروض والشهادات وحسابات التوفير في أكبر البنوك المصرية.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {banks.map((bank) => (
          <Link key={bank.slug} href={`/banks/${bank.slug}`}>
            <Card className="h-full hover:border-emerald-300 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{bank.name}</CardTitle>
                <p className="text-sm text-gray-500">{bank.nameEn}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{bank.description}</p>
                <div className="flex flex-wrap gap-2">
                  {bank.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
