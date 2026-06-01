import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { banks, getBankBySlug } from "@/data/banks";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAQSection, FAQJsonLd } from "@/components/seo/faq-section";
import { RelatedLinks } from "@/components/seo/related-links";
import { ShareButtons } from "@/components/seo/share-buttons";
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
    <>
      <Breadcrumbs
        items={[
          { label: "البنوك", href: "/banks" },
          { label: bankData.name },
        ]}
      />
      <FAQJsonLd faqs={bankData.faqs} />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">{bankData.name}</h1>
      <p className="text-sm text-gray-500 mb-2">{bankData.nameEn}</p>
      <p className="text-gray-600 mb-8">{bankData.description}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">أنواع القروض</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bankData.loanTypes.map((loan) => (
            <Card key={loan.name}>
              <CardHeader>
                <CardTitle className="text-base">{loan.name}</CardTitle>
                <p className="text-lg font-bold text-emerald-600">{loan.rate}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{loan.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">شهادات الادخار</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">الشهادة</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">العائد</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">المدة</th>
              </tr>
            </thead>
            <tbody>
              {bankData.certificates.map((cert) => (
                <tr key={cert.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{cert.name}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-emerald-600">{cert.rate}</td>
                  <td className="py-3 px-4 text-sm">{cert.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">المميزات</h2>
        <div className="flex flex-wrap gap-2">
          {bankData.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
            >
              {feature}
            </span>
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
    </>
  );
}
