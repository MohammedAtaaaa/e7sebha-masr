import Link from "next/link";
import { SITE_NAME } from "@/lib/utils";

const navLinks = [
  { label: "الحاسبات", href: "/calculators" },
  { label: "المدونة", href: "/blog" },
  { label: "البنوك", href: "/banks" },
  { label: "الرواتب", href: "/salary" },
  { label: "المدن", href: "/cities" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-emerald-600">{SITE_NAME}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
