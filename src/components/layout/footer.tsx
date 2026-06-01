import Link from "next/link";
import { SITE_NAME } from "@/lib/utils";

const footerLinks = {
  calculators: {
    title: "الحاسبات",
    links: [
      { label: "حاسبة القروض", href: "/calculators/loan-calculator" },
      { label: "حاسبة الراتب", href: "/calculators/salary-calculator" },
      { label: "حاسبة الزكاة", href: "/calculators/zakat-calculator" },
      { label: "حاسبة الاستثمار", href: "/calculators/investment-calculator" },
      { label: "جميع الحاسبات", href: "/calculators" },
    ],
  },
  banks: {
    title: "البنوك",
    links: [
      { label: "البنك الأهلي المصري", href: "/banks/national-bank-of-egypt" },
      { label: "بنك مصر", href: "/banks/banque-misr" },
      { label: "البنك التجاري الدولي", href: "/banks/cib" },
    ],
  },
  resources: {
    title: "المصادر",
    links: [
      { label: "المدونة", href: "/blog" },
      { label: "الرواتب", href: "/salary" },
      { label: "المدن", href: "/cities" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold text-emerald-600">
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              منصة الحاسبات المالية الأولى في مصر. أدوات مجانية لحساب القروض والرواتب والزكاة والاستثمارات.
            </p>
          </div>
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-800 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
