import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ShareButtons } from "@/components/seo/share-buttons";
import { Badge } from "@/components/ui/badge";
import { SITE_URL, SITE_NAME } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "المدونة", href: "/blog" },
          { label: post.title },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="max-w-3xl">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{post.category}</Badge>
            <span className="text-sm text-[var(--text-muted)]">{post.readingTime}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <time dateTime={post.date} className="text-sm text-[var(--text-muted)]">{post.date}</time>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{post.description}</p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">بقلم: {post.author}</p>
        </header>

        <div className="space-y-4">
          {post.content.split("\n").map((paragraph, i) => {
            if (!paragraph.trim()) return null;
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-extrabold text-[var(--text-primary)] mt-10 mb-4">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-3">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("- ")) {
              return <li key={i} className="text-[var(--text-secondary)] mr-4 leading-relaxed">{paragraph.replace("- ", "")}</li>;
            }
            return <p key={i} className="text-[var(--text-secondary)] leading-relaxed">{paragraph}</p>;
          })}
        </div>

        <ShareButtons title={post.title} path={`/blog/${slug}`} />

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">#{tag}</Badge>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
