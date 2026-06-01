import Link from "next/link";
import { calculators, categories } from "@/data/calculators";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/utils";

export default function HomePage() {
  const popularCalculators = calculators.slice(0, 8);
  const categoryEntries = Object.entries(categories);

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          {SITE_NAME}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          منصة الحاسبات المالية الأولى في مصر - حاسبات القروض، الرواتب، الزكاة،
          الضرائب، الاستثمارات والمزيد. مجانية 100%.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/calculators"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            تصفح الحاسبات
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            اقرأ المقالات
          </Link>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">الحاسبات الأكثر استخداماً</h2>
          <Link
            href="/calculators"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            عرض الكل ←
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularCalculators.map((calc) => (
            <CalculatorCard key={calc.slug} calculator={calc} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">تصنيفات الحاسبات</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoryEntries.map(([key, label]) => {
            const count = calculators.filter((c) => c.category === key).length;
            return (
              <Link key={key} href={`/calculators?category=${key}`}>
                <Card className="h-full hover:border-emerald-300 hover:shadow-md transition-all text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-emerald-600">{count}</p>
                    <p className="text-sm text-gray-500">حاسبة</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">روابط سريعة</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/salary">
            <Card className="hover:border-emerald-300 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>دليل الرواتب في مصر</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  اكتشف متوسط الرواتب لمختلف المهن في مصر مع تحليل الضرائب والتأمينات.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/banks">
            <Card className="hover:border-emerald-300 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>مقارنة البنوك المصرية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  قارن بين القروض والشهادات وحسابات التوفير في البنوك المصرية.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/cities">
            <Card className="hover:border-emerald-300 hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle>تكلفة المعيشة في المدن المصرية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  اعرف تكلفة المعيشة والإيجارات ومتوسط الرواتب في مدن مصر.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </>
  );
}
