export interface CalculationResult {
  primary: number;
  breakdown?: Record<string, number>;
  label?: string;
}

export function calculate(
  formula: string,
  inputs: Record<string, number>
): CalculationResult {
  switch (formula) {
    case "loan":
      return calculateLoan(inputs);
    case "carLoan":
      return calculateCarLoan(inputs);
    case "salary":
      return calculateSalary(inputs);
    case "tax":
      return calculateTax(inputs);
    case "zakat":
      return calculateZakat(inputs);
    case "goldZakat":
      return calculateGoldZakat(inputs);
    case "investment":
      return calculateInvestment(inputs);
    case "compoundInterest":
      return calculateCompoundInterest(inputs);
    case "percentage":
      return calculatePercentage(inputs);
    case "discount":
      return calculateDiscount(inputs);
    case "bmi":
      return calculateBMI(inputs);
    case "age":
      return calculateAge(inputs);
    case "roi":
      return calculateROI(inputs);
    case "profitMargin":
      return calculateProfitMargin(inputs);
    case "fuelCost":
      return calculateFuelCost(inputs);
    default:
      return { primary: 0 };
  }
}

function calculateLoan(inputs: Record<string, number>): CalculationResult {
  const { amount, rate, years } = inputs;
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  const monthly =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthly * numPayments;
  const totalInterest = totalPayment - amount;

  return {
    primary: Math.round(monthly),
    breakdown: {
      "إجمالي المدفوعات": Math.round(totalPayment),
      "إجمالي الفائدة": Math.round(totalInterest),
      "عدد الأقساط": numPayments,
    },
  };
}

function calculateCarLoan(inputs: Record<string, number>): CalculationResult {
  const { carPrice, propertyPrice, downPayment, rate, years } = inputs;
  const price = carPrice || propertyPrice || 0;
  const loanAmount = price - (downPayment || 0);
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  const monthly =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthly * numPayments;
  const totalInterest = totalPayment - loanAmount;

  return {
    primary: Math.round(monthly),
    breakdown: {
      "مبلغ التمويل": Math.round(loanAmount),
      "إجمالي المدفوعات": Math.round(totalPayment),
      "إجمالي الفائدة": Math.round(totalInterest),
      "عدد الأقساط": numPayments,
    },
  };
}

function calculateSalary(inputs: Record<string, number>): CalculationResult {
  const { grossSalary, insurance = 11 } = inputs;
  const annualGross = grossSalary * 12;
  const insuranceAmount = grossSalary * (insurance / 100);
  const taxableIncome = annualGross - 15000;
  const annualTax = calculateIncomeTax(Math.max(0, taxableIncome));
  const monthlyTax = annualTax / 12;
  const netSalary = grossSalary - insuranceAmount - monthlyTax;

  return {
    primary: Math.round(netSalary),
    breakdown: {
      "الراتب الإجمالي": Math.round(grossSalary),
      "خصم التأمينات": Math.round(insuranceAmount),
      "خصم الضريبة الشهرية": Math.round(monthlyTax),
      "صافي الراتب": Math.round(netSalary),
    },
  };
}

function calculateIncomeTax(taxableIncome: number): number {
  const brackets = [
    { limit: 40000, rate: 0 },
    { limit: 55000, rate: 0.1 },
    { limit: 70000, rate: 0.15 },
    { limit: 200000, rate: 0.2 },
    { limit: 400000, rate: 0.225 },
    { limit: 1200000, rate: 0.25 },
    { limit: Infinity, rate: 0.275 },
  ];

  let tax = 0;
  let remaining = taxableIncome;
  let prevLimit = 0;

  for (const bracket of brackets) {
    const taxableInBracket = Math.min(remaining, bracket.limit - prevLimit);
    if (taxableInBracket <= 0) break;
    tax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    prevLimit = bracket.limit;
  }

  return tax;
}

function calculateTax(inputs: Record<string, number>): CalculationResult {
  const { annualIncome } = inputs;
  const taxableIncome = annualIncome - 15000;
  const tax = calculateIncomeTax(Math.max(0, taxableIncome));
  const effectiveRate = annualIncome > 0 ? (tax / annualIncome) * 100 : 0;

  return {
    primary: Math.round(tax),
    breakdown: {
      "الدخل السنوي": Math.round(annualIncome),
      "الإعفاء الشخصي": 15000,
      "الدخل الخاضع للضريبة": Math.round(Math.max(0, taxableIncome)),
      "الضريبة السنوية": Math.round(tax),
      "الضريبة الشهرية": Math.round(tax / 12),
      "نسبة الضريبة الفعلية %": Math.round(effectiveRate * 10) / 10,
    },
  };
}

function calculateZakat(inputs: Record<string, number>): CalculationResult {
  const { savings = 0, gold = 0, silver = 0, investments = 0, debts = 0 } =
    inputs;
  const totalWealth = savings + gold + silver + investments - debts;
  const zakatAmount = Math.max(0, totalWealth) * 0.025;

  return {
    primary: Math.round(zakatAmount),
    breakdown: {
      "إجمالي الأموال": Math.round(totalWealth),
      "نسبة الزكاة": 2.5,
      "مبلغ الزكاة": Math.round(zakatAmount),
    },
  };
}

function calculateGoldZakat(inputs: Record<string, number>): CalculationResult {
  const { weight, karat, pricePerGram } = inputs;
  const pureGoldWeight = weight * (karat / 24);
  const nisab = 85;
  const totalValue = weight * pricePerGram;
  const zakatAmount = pureGoldWeight >= nisab ? totalValue * 0.025 : 0;

  return {
    primary: Math.round(zakatAmount),
    breakdown: {
      "وزن الذهب الخالص": Math.round(pureGoldWeight * 100) / 100,
      "النصاب (جرام ذهب خالص)": nisab,
      "القيمة الإجمالية": Math.round(totalValue),
      "مبلغ الزكاة": Math.round(zakatAmount),
    },
    label: pureGoldWeight < nisab ? "لم يبلغ النصاب - لا زكاة مستحقة" : undefined,
  };
}

function calculateInvestment(inputs: Record<string, number>): CalculationResult {
  const { principal, monthlyAdd = 0, rate, years } = inputs;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  let total = principal;

  for (let i = 0; i < months; i++) {
    total = (total + monthlyAdd) * (1 + monthlyRate);
  }

  const totalInvested = principal + monthlyAdd * months;
  const profit = total - totalInvested;

  return {
    primary: Math.round(total),
    breakdown: {
      "إجمالي المبالغ المستثمرة": Math.round(totalInvested),
      "إجمالي الأرباح": Math.round(profit),
      "القيمة النهائية": Math.round(total),
    },
  };
}

function calculateCompoundInterest(inputs: Record<string, number>): CalculationResult {
  const { principal, rate, compounds, years } = inputs;
  const total = principal * Math.pow(1 + rate / 100 / compounds, compounds * years);
  const interest = total - principal;

  return {
    primary: Math.round(total),
    breakdown: {
      "المبلغ الأصلي": Math.round(principal),
      "إجمالي الفائدة": Math.round(interest),
      "المبلغ النهائي": Math.round(total),
    },
  };
}

function calculatePercentage(inputs: Record<string, number>): CalculationResult {
  const { value, percentage } = inputs;
  const result = (value * percentage) / 100;

  return {
    primary: Math.round(result * 100) / 100,
    breakdown: {
      "القيمة": value,
      "النسبة": percentage,
      "النتيجة": Math.round(result * 100) / 100,
    },
  };
}

function calculateDiscount(inputs: Record<string, number>): CalculationResult {
  const { originalPrice, discount } = inputs;
  const discountAmount = (originalPrice * discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    primary: Math.round(finalPrice * 100) / 100,
    breakdown: {
      "السعر الأصلي": originalPrice,
      "مقدار الخصم": Math.round(discountAmount * 100) / 100,
      "السعر بعد الخصم": Math.round(finalPrice * 100) / 100,
      "نسبة التوفير %": discount,
    },
  };
}

function calculateBMI(inputs: Record<string, number>): CalculationResult {
  const { weight, height } = inputs;
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = "";

  if (bmi < 18.5) category = "نقص في الوزن";
  else if (bmi < 25) category = "وزن طبيعي";
  else if (bmi < 30) category = "زيادة في الوزن";
  else category = "سمنة";

  return {
    primary: Math.round(bmi * 10) / 10,
    breakdown: {
      "مؤشر كتلة الجسم": Math.round(bmi * 10) / 10,
    },
    label: category,
  };
}

function calculateAge(inputs: Record<string, number>): CalculationResult {
  const { birthYear, birthMonth, birthDay } = inputs;
  const today = new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  let years = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    years--;
  }

  let months = today.getMonth() - birthDate.getMonth();
  if (months < 0) months += 12;
  if (today.getDate() < birthDate.getDate()) months--;
  if (months < 0) months += 12;

  return {
    primary: years,
    breakdown: {
      "السنوات": years,
      "الشهور": months,
    },
    label: `${years} سنة و ${months} شهر`,
  };
}

function calculateROI(inputs: Record<string, number>): CalculationResult {
  const { investmentCost, revenue } = inputs;
  const profit = revenue - investmentCost;
  const roi = investmentCost > 0 ? (profit / investmentCost) * 100 : 0;

  return {
    primary: Math.round(roi * 10) / 10,
    breakdown: {
      "تكلفة الاستثمار": investmentCost,
      "العائد الكلي": revenue,
      "صافي الربح": profit,
      "نسبة العائد %": Math.round(roi * 10) / 10,
    },
  };
}

function calculateProfitMargin(inputs: Record<string, number>): CalculationResult {
  const { cost, revenue } = inputs;
  const profit = revenue - cost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return {
    primary: Math.round(margin * 10) / 10,
    breakdown: {
      "التكلفة": cost,
      "الإيرادات": revenue,
      "صافي الربح": profit,
      "هامش الربح %": Math.round(margin * 10) / 10,
    },
  };
}

function calculateFuelCost(inputs: Record<string, number>): CalculationResult {
  const { distance, consumption, fuelPrice } = inputs;
  const litersNeeded = (distance * consumption) / 100;
  const totalCost = litersNeeded * fuelPrice;

  return {
    primary: Math.round(totalCost * 100) / 100,
    breakdown: {
      "المسافة (كم)": distance,
      "كمية الوقود (لتر)": Math.round(litersNeeded * 10) / 10,
      "التكلفة الإجمالية": Math.round(totalCost * 100) / 100,
    },
  };
}
