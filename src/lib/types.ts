export interface CalculatorInput {
  name: string;
  label: string;
  type: "number" | "select" | "range";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  unit?: string;
  options?: { label: string; value: string | number }[];
  required?: boolean;
}

export interface CalculatorConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  inputs: CalculatorInput[];
  formula: string;
  resultLabel: string;
  resultUnit: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  faqs: { question: string; answer: string }[];
  relatedCalculators: string[];
}

export interface SalaryData {
  slug: string;
  profession: string;
  professionEn: string;
  averageSalary: number;
  minSalary: number;
  maxSalary: number;
  taxRate: number;
  insurance: number;
  description: string;
  skills: string[];
  growthTips: string[];
  faqs: { question: string; answer: string }[];
  relatedProfessions: string[];
}

export interface CityData {
  slug: string;
  name: string;
  nameEn: string;
  costOfLiving: number;
  avgRent: number;
  avgSalary: number;
  description: string;
  highlights: string[];
  faqs: { question: string; answer: string }[];
  relatedCities: string[];
}

export interface BankData {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  loanTypes: { name: string; rate: string; description: string }[];
  certificates: { name: string; rate: string; duration: string }[];
  features: string[];
  faqs: { question: string; answer: string }[];
  relatedBanks: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
}

export interface GuideData {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
  faqs: { question: string; answer: string }[];
  relatedGuides: string[];
  relatedCalculators: string[];
}
