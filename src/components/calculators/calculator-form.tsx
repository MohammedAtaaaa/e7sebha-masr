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
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{config.title}</CardTitle>
          <p className="text-sm text-gray-500">{config.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label htmlFor={input.name} className="block text-sm font-medium text-gray-700">
                {input.label}
                {input.required && <span className="text-red-500 mr-1">*</span>}
              </label>
              {input.type === "select" && input.options ? (
                <select
                  id={input.name}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      {input.unit}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCalculate} className="flex-1" size="lg">
              احسب الآن
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              مسح
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardHeader>
            <CardTitle className="text-xl text-emerald-800">النتيجة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-emerald-600 p-6 text-center text-white">
              <p className="text-sm opacity-80">{config.resultLabel}</p>
              <p className="text-3xl font-bold mt-1">
                {formatNumber(result.primary)} {config.resultUnit}
              </p>
              {result.label && (
                <p className="text-sm mt-2 opacity-90">{result.label}</p>
              )}
            </div>
            {result.breakdown && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">التفاصيل:</h4>
                {Object.entries(result.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg bg-white p-3 text-sm"
                  >
                    <span className="text-gray-600">{key}</span>
                    <span className="font-semibold">{formatNumber(value)}</span>
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
