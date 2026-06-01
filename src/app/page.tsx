import Link from "next/link";
import { calculators, categories } from "@/data/calculators";
import { CalculatorCard } from "@/components/calculators/calculator-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_NAME } from "@/lib/utils";

export default function HomePage() {
  const popularCalculators = calculators.slice(0, 8);
  const categoryEntries = Object.entries(categories);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-50 via-white to-gold-50 dark:from-brand-900/20 dark:via-[var(--bg-primary)] dark:to-gold-800/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-28 text-center">
          <Badge variant="gold" className="mb-6 text-sm px-4 py-1.5">
            🇪🇬 المنصة المالية #1 في مصر
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
            احسب صح مع{" "}
            <span className="text-brand-500">{SITE_NAME}</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            أدوات مالية احترافية لحساب القروض، الرواتب، الزكاة، الضرائب والاستثمارات.
            نتائج فورية ودقيقة — مجاناً بالكامل.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-8 py-3.5 text-base font-bold text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-200 btn-press"
            >
              ابدأ الحساب
              <svg className="h-5 w-5 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-8 py-3.5 text-base font-bold text-[var(--text-primary)] hover:border-brand-500/30 hover:bg-[var(--bg-elevated)] transition-all duration-200 btn-press"
            >
              تصفح الحاسبات
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-500 dark:bg-brand-900/30">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-medium">مجانية 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-500 dark:bg-brand-900/30">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-medium">نتائج فورية</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-500 dark:bg-brand-900/30">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="font-medium">بدون تسجيل</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-500 dark:bg-brand-900/30">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-medium">دقيقة وموثوقة</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">الحاسبات الأكثر استخداماً</h2>
            <p className="text-[var(--text-muted)] mt-2">أدوات مالية يستخدمها الآلاف يومياً</p>
          </div>
          <Link
            href="/calculators"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
          >
            عرض الكل
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularCalculators.map((calc, i) => (
            <div key={calc.slug} className="animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <CalculatorCard calculator={calc} />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[var(--bg-card)] border-y border-[var(--border-color)] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">تصنيفات الحاسبات</h2>
            <p className="text-[var(--text-muted)] mt-2">اختر التصنيف المناسب لاحتياجاتك</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryEntries.map(([key, label]) => {
              const count = calculators.filter((c) => c.category === key).length;
              return (
                <Link key={key} href={`/calculators?category=${key}`}>
                  <Card className="h-full text-center hover:border-brand-500/30 group">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 mx-auto mb-2 group-hover:bg-brand-100 dark:bg-brand-900/20 dark:group-hover:bg-brand-900/40 transition-colors">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <CardTitle className="text-lg">{label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-extrabold text-brand-500">{count}</p>
                      <p className="text-sm text-[var(--text-muted)]">حاسبة</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">استكشف المزيد</h2>
          <p className="text-[var(--text-muted)] mt-2">أدلة ومقارنات مفصلة</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              href: "/salary",
              title: "دليل الرواتب في مصر",
              desc: "اكتشف متوسط الرواتب لمختلف المهن مع تحليل الضرائب والتأمينات.",
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              href: "/banks",
              title: "مقارنة البنوك المصرية",
              desc: "قارن بين القروض والشهادات وحسابات التوفير في البنوك المصرية.",
              icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
            },
            {
              href: "/cities",
              title: "تكلفة المعيشة في المدن",
              desc: "اعرف تكلفة المعيشة والإيجارات ومتوسط الرواتب في مدن مصر.",
              icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full hover:border-brand-500/30 group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-500 group-hover:bg-gold-100 dark:bg-gold-800/20 dark:group-hover:bg-gold-800/40 transition-colors shrink-0">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
