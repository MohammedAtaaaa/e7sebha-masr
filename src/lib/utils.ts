import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0621-\u064A-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatNumber(num: number, locale = "ar-EG"): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatCurrency(
  amount: number,
  currency = "EGP",
  locale = "ar-EG"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://e7sebha-masr.vercel.app";
export const SITE_NAME = "احسبها مصر";
export const SITE_DESCRIPTION =
  "منصة الحاسبات المالية الأولى في مصر - حاسبات القروض، الرواتب، الزكاة، الضرائب والمزيد";
