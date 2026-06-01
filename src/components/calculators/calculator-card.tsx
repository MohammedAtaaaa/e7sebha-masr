import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/calculators";
import type { CalculatorConfig } from "@/lib/types";

interface CalculatorCardProps {
  calculator: CalculatorConfig;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const categoryLabel = categories[calculator.category as keyof typeof categories] || calculator.category;

  return (
    <Link href={`/calculators/${calculator.slug}`}>
      <Card className="h-full hover:border-brand-500/30 group">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500 group-hover:bg-brand-100 dark:bg-brand-900/20 dark:group-hover:bg-brand-900/40 transition-colors shrink-0">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base group-hover:text-brand-500 transition-colors leading-snug">
                {calculator.title}
              </CardTitle>
              <Badge variant="secondary" className="mt-2 text-[10px]">{categoryLabel}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">{calculator.description}</CardDescription>
          <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
            احسب الآن
            <svg className="h-3 w-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
