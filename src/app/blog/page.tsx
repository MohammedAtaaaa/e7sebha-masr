import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "المدونة - مقالات مالية وتعليمية",
  description:
    "مقالات مالية وتعليمية عن القروض والادخار والاستثمار والزكاة في مصر. نصائح عملية لتحسين وضعك المالي.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "المدونة" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-3">المدونة المالية</h1>
      <p className="text-[var(--text-secondary)] mb-10 max-w-2xl leading-relaxed">
        مقالات ونصائح مالية لمساعدتك في اتخاذ قرارات مالية أفضل.
      </p>

      {posts.length === 0 ? (
        <p className="text-[var(--text-muted)]">لا توجد مقالات حالياً.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-brand-500/30 group">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{post.category}</Badge>
                    <span className="text-xs text-[var(--text-muted)]">{post.readingTime}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-brand-500 transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                  <p className="mt-3 text-xs text-[var(--text-muted)]">{post.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
