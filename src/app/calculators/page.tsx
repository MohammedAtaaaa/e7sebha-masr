import type { Metadata } from "next";
import { calculators, categories } from "@/data/calculators";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { AdSlot } from "@/components/layout/ad-slot";

export const metadata: Metadata = {
  title: "جميع الحاسبات المالية - حاسبات مجانية",
  description:
    "تصفح جميع الحاسبات المالية المجانية - حاسبات القروض، الرواتب، الزكاة، الضرائب، الاستثمارات، BMI والمزيد.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsPage() {
  const categoryEntries = Object.entries(categories);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "الحاسبات" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">جميع الحاسبات المالية</h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-2xl leading-relaxed">
        اكتشف مجموعتنا الكاملة من الحاسبات المالية المجانية. أدوات دقيقة وسهلة الاستخدام لمساعدتك في اتخاذ قراراتك المالية.
      </p>

      <AdSlot slot="calculators-top" format="horizontal" className="mb-10" />

      {categoryEntries.map(([key, label]) => {
        const categoryCalcs = calculators.filter((c) => c.category === key);
        if (categoryCalcs.length === 0) return null;
        return (
          <section key={key} className="mb-14">
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-6">{label}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryCalcs.map((calc) => (
                <CalculatorCard key={calc.slug} calculator={calc} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
