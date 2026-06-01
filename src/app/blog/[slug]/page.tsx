import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ShareButtons } from "@/components/seo/share-buttons";
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
    <>
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
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
              {post.category}
            </span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
          <p className="text-lg text-gray-600">{post.description}</p>
          <p className="mt-2 text-sm text-gray-500">بقلم: {post.author}</p>
        </header>

        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-strong:text-gray-900">
          {post.content.split("\n").map((paragraph, i) => {
            if (!paragraph.trim()) return null;
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("- ")) {
              return <li key={i} className="text-gray-700 mr-4">{paragraph.replace("- ", "")}</li>;
            }
            return <p key={i} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
          })}
        </div>

        <ShareButtons title={post.title} path={`/blog/${slug}`} />

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
