import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "المدونة - مقالات مالية وتعليمية",
  description:
    "مقالات مالية وتعليمية عن القروض والادخار والاستثمار والزكاة في مصر. نصائح عملية لتحسين وضعك المالي.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Breadcrumbs items={[{ label: "المدونة" }]} />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">المدونة المالية</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        مقالات ونصائح مالية لمساعدتك في اتخاذ قرارات مالية أفضل.
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500">لا توجد مقالات حالياً.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-emerald-300 hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
                      {post.category}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                  <p className="mt-3 text-xs text-gray-400">{post.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
