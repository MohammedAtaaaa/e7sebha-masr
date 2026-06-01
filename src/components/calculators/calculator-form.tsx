"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculate, type CalculationResult } from "@/lib/calculator-engine";
import type { CalculatorConfig } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface CalculatorFormProps {
  config: CalculatorConfig;
}

export function CalculatorForm({ config }: CalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const defaults: Record<string, number> = {};
    for (const input of config.inputs) {
      if (input.defaultValue !== undefined) {
        defaults[input.name] = input.defaultValue;
      }
    }
    return defaults;
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleCalculate = () => {
    const calculationResult = calculate(config.formula, inputs);
    setResult(calculationResult);
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${config.resultLabel}: ${formatNumber(result.primary)} ${config.resultUnit}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Card */}
      <Card className="border-[var(--border-color)]">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{config.title}</CardTitle>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{config.description}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          {config.inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label htmlFor={input.name} className="block text-sm font-semibold text-[var(--text-primary)]">
                {input.label}
                {input.required && <span className="text-red-500 mr-1">*</span>}
              </label>
              {input.type === "select" && input.options ? (
                <select
                  id={input.name}
                  className="flex h-11 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 text-sm text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:border-brand-500 transition-all duration-200"
                  value={inputs[input.name] ?? ""}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                >
                  <option value="">اختر...</option>
                  {input.options.map((opt) => (
                    <option key={String(opt.value)} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  <Input
                    id={input.name}
                    type="number"
                    placeholder={input.placeholder}
                    min={input.min}
                    max={input.max}
                    step={input.step ?? 1}
                    value={inputs[input.name] ?? ""}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                  />
                  {input.unit && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-elevated)] px-1.5 py-0.5 rounded">
                      {input.unit}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <Button onClick={handleCalculate} className="flex-1" size="lg">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              احسب الآن
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              مسح
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      {result && (
        <Card className="border-brand-500/20 bg-gradient-to-bl from-brand-50/50 to-transparent dark:from-brand-900/10 dark:to-transparent animate-fade-in-up">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-brand-600 dark:text-brand-400">النتيجة</CardTitle>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-brand-500 transition-colors px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-brand-500/30 btn-press"
              >
                {copied ? (
                  <>
                    <svg className="h-3.5 w-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    تم النسخ
                  </>
                ) : (
                  <>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    نسخ
                  </>
                )}
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-l from-brand-500 to-brand-600 p-6 text-center text-white shadow-lg shadow-brand-500/20">
              <p className="text-sm opacity-80 mb-1">{config.resultLabel}</p>
              <p className="text-4xl font-extrabold">
                {formatNumber(result.primary)} {config.resultUnit}
              </p>
              {result.label && (
                <p className="text-sm mt-2 opacity-90">{result.label}</p>
              )}
            </div>
            {result.breakdown && (
              <div className="space-y-2">
                <h4 className="font-semibold text-[var(--text-primary)] text-sm">التفاصيل:</h4>
                {Object.entries(result.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] p-3.5 text-sm"
                  >
                    <span className="text-[var(--text-secondary)]">{key}</span>
                    <span className="font-bold text-[var(--text-primary)]">{formatNumber(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
