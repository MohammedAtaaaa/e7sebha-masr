import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/lib/types";

const contentDir = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = `${Math.ceil(words / wordsPerMinute)} دقائق`;

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "فريق احسبها مصر",
      category: data.category || "عام",
      tags: data.tags || [],
      readingTime,
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
