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
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] mt-16">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-brand-500">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              منصة الحاسبات المالية الأولى في مصر. أدوات مجانية ودقيقة لحساب القروض والرواتب والزكاة والاستثمارات.
            </p>
            {/* Social links placeholder */}
            <div className="flex items-center gap-3">
              {["facebook", "twitter", "instagram"].map((social) => (
                <div
                  key={social}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-brand-500 hover:border-brand-500/30 transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-[var(--text-primary)] mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-muted)] hover:text-brand-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <span>صُنع بـ ❤️ في مصر</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
