import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { banks, getBankBySlug } from "@/data/banks";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAQSection, FAQJsonLd } from "@/components/seo/faq-section";
import { RelatedLinks } from "@/components/seo/related-links";
import { ShareButtons } from "@/components/seo/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ bank: string }>;
}

export function generateStaticParams() {
  return banks.map((b) => ({ bank: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { bank } = await params;
  const bankData = getBankBySlug(bank);
  if (!bankData) return {};

  return {
    title: `${bankData.name} - قروض وشهادات وحسابات 2026`,
    description: `${bankData.description} اعرف تفاصيل القروض والشهادات والحسابات في ${bankData.name}.`,
    alternates: { canonical: `/banks/${bank}` },
  };
}

export default async function BankPage({ params }: PageProps) {
  const { bank } = await params;
  const bankData = getBankBySlug(bank);

  if (!bankData) notFound();

  const relatedBanks = bankData.relatedBanks
    .map((slug) => banks.find((b) => b.slug === slug))
    .filter(Boolean);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: "البنوك", href: "/banks" },
          { label: bankData.name },
        ]}
      />
      <FAQJsonLd faqs={bankData.faqs} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mb-2">{bankData.name}</h1>
      <p className="text-sm text-[var(--text-muted)] mb-2">{bankData.nameEn}</p>
      <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">{bankData.description}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-6">أنواع القروض</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bankData.loanTypes.map((loan) => (
            <Card key={loan.name}>
              <CardHeader>
                <CardTitle className="text-base">{loan.name}</CardTitle>
                <p className="text-lg font-extrabold text-brand-500">{loan.rate}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{loan.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-6">شهادات الادخار</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border-color)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <th className="py-4 px-5 text-right text-sm font-semibold text-[var(--text-primary)]">الشهادة</th>
                <th className="py-4 px-5 text-right text-sm font-semibold text-[var(--text-primary)]">العائد</th>
                <th className="py-4 px-5 text-right text-sm font-semibold text-[var(--text-primary)]">المدة</th>
              </tr>
            </thead>
            <tbody>
              {bankData.certificates.map((cert) => (
                <tr key={cert.name} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="py-4 px-5 text-sm text-[var(--text-secondary)]">{cert.name}</td>
                  <td className="py-4 px-5 text-sm font-bold text-brand-500">{cert.rate}</td>
                  <td className="py-4 px-5 text-sm text-[var(--text-secondary)]">{cert.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-4">المميزات</h2>
        <div className="flex flex-wrap gap-2">
          {bankData.features.map((feature) => (
            <Badge key={feature}>{feature}</Badge>
          ))}
        </div>
      </section>

      <ShareButtons title={bankData.name} path={`/banks/${bank}`} />

      <FAQSection faqs={bankData.faqs} />

      <RelatedLinks
        title="بنوك ذات صلة"
        links={relatedBanks.map((b) => ({
          title: b!.name,
          href: `/banks/${b!.slug}`,
          description: b!.description.substring(0, 100) + "...",
        }))}
      />
    </div>
  );
}
