import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-8xl font-extrabold text-brand-500/20 mb-4">404</h1>
      <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-3">الصفحة غير موجودة</h2>
      <p className="text-[var(--text-secondary)] mb-8 max-w-md leading-relaxed">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-8 py-3.5 text-base font-bold text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 transition-all btn-press"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
