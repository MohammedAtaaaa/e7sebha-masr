import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CalculatorConfig } from "@/lib/types";

interface CalculatorCardProps {
  calculator: CalculatorConfig;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <Link href={`/calculators/${calculator.slug}`}>
      <Card className="h-full hover:border-emerald-300 hover:shadow-md transition-all group">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-base group-hover:text-emerald-600 transition-colors">
                {calculator.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">{calculator.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
