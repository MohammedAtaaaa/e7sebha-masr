import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RelatedLink {
  title: string;
  href: string;
  description?: string;
}

interface RelatedLinksProps {
  title: string;
  links: RelatedLink[];
}

export function RelatedLinks({ title, links }: RelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-8">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full hover:border-brand-500/30 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-base group-hover:text-brand-500 transition-colors">{link.title}</CardTitle>
              </CardHeader>
              {link.description && (
                <CardContent>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">{link.description}</p>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
