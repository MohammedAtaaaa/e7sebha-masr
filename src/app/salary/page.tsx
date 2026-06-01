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
    <>
      <Breadcrumbs items={[{ label: "الرواتب" }]} />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">دليل الرواتب في مصر 2026</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        اكتشف متوسط الرواتب لمختلف المهن في مصر. معلومات محدثة عن الرواتب والضرائب والتأمينات.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {salaries.map((salary) => (
          <Link key={salary.slug} href={`/salary/${salary.slug}`}>
            <Card className="h-full hover:border-emerald-300 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{salary.profession}</CardTitle>
                <p className="text-sm text-gray-500">{salary.professionEn}</p>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(salary.averageSalary)}
                </p>
                <p className="text-sm text-gray-500">متوسط الراتب الشهري</p>
                <div className="mt-2 text-xs text-gray-400">
                  {formatCurrency(salary.minSalary)} - {formatCurrency(salary.maxSalary)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
