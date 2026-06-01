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
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full hover:border-emerald-300 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{link.title}</CardTitle>
              </CardHeader>
              {link.description && (
                <CardContent>
                  <p className="text-sm text-gray-500 line-clamp-2">{link.description}</p>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
