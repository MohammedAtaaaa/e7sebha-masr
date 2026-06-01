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
    <>
      <Breadcrumbs items={[{ label: "المدن" }]} />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">تكلفة المعيشة في المدن المصرية</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        قارن بين تكلفة المعيشة والإيجارات ومتوسط الرواتب في مختلف المدن المصرية.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link key={city.slug} href={`/cities/${city.slug}`}>
            <Card className="h-full hover:border-emerald-300 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{city.name}</CardTitle>
                <p className="text-sm text-gray-500">{city.nameEn}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">تكلفة المعيشة</span>
                  <span className="font-semibold">{formatCurrency(city.costOfLiving)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">متوسط الإيجار</span>
                  <span className="font-semibold">{formatCurrency(city.avgRent)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">متوسط الراتب</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(city.avgSalary)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
