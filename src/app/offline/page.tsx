export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-50 text-gold-500 mb-6 dark:bg-gold-800/20">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M12 12h.01" />
        </svg>
      </div>
      <h1 className="text-2xl font-extrabold text-[var(--text-primary)] mb-3">أنت غير متصل بالإنترنت</h1>
      <p className="text-[var(--text-secondary)] max-w-md leading-relaxed">
        يبدو أنك غير متصل بالإنترنت حالياً. يرجى التحقق من اتصالك والمحاولة مرة أخرى.
      </p>
    </div>
  );
}
