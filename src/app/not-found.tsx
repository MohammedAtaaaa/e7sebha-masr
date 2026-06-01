import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h2>
      <p className="text-gray-600 mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
