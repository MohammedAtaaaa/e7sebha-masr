export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">أنت غير متصل بالإنترنت</h1>
      <p className="text-gray-600 mb-6">
        يبدو أنك غير متصل بالإنترنت حالياً. يرجى التحقق من اتصالك والمحاولة مرة أخرى.
      </p>
    </div>
  );
}
