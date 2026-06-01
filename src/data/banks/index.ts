import type { BankData } from "@/lib/types";

export const banks: BankData[] = [
  {
    slug: "national-bank-of-egypt",
    name: "البنك الأهلي المصري",
    nameEn: "National Bank of Egypt",
    description: "البنك الأهلي المصري هو أكبر بنك حكومي في مصر وأقدمها. يقدم مجموعة واسعة من المنتجات المالية للأفراد والشركات.",
    loanTypes: [
      { name: "القرض الشخصي", rate: "16-22%", description: "قرض شخصي بضمان الراتب لموظفي القطاع العام والخاص." },
      { name: "تمويل السيارات", rate: "14-20%", description: "تمويل شراء السيارات الجديدة والمستعملة حتى 7 سنوات." },
      { name: "التمويل العقاري", rate: "3-8%", description: "تمويل شراء الوحدات السكنية ضمن مبادرة البنك المركزي." },
    ],
    certificates: [
      { name: "شهادة البلاتينية", rate: "27%", duration: "سنة" },
      { name: "شهادة الادخار الثلاثية", rate: "22%", duration: "3 سنوات" },
      { name: "شهادة أمان المصريين", rate: "13%", duration: "3 سنوات" },
    ],
    features: ["أكبر شبكة فروع في مصر", "خدمات بنكية رقمية متطورة", "صناديق استثمار متنوعة", "بطاقات ائتمان متعددة"],
    faqs: [
      { question: "ما هي شروط القرض الشخصي من البنك الأهلي؟", answer: "الحد الأدنى للراتب 3,000 جنيه، مدة خدمة 6 أشهر على الأقل، وتحويل الراتب على البنك." },
      { question: "ما أعلى عائد على شهادات البنك الأهلي؟", answer: "شهادة البلاتينية تقدم عائد 27% سنوياً يصرف شهرياً." },
      { question: "كيف أفتح حساب في البنك الأهلي؟", answer: "تحتاج بطاقة رقم قومي سارية وإيصال مرافق حديث. الحد الأدنى لفتح الحساب يختلف حسب نوعه." },
    ],
    relatedBanks: ["banque-misr", "cib"],
  },
  {
    slug: "banque-misr",
    name: "بنك مصر",
    nameEn: "Banque Misr",
    description: "بنك مصر هو ثاني أكبر بنك حكومي في مصر. يقدم خدمات مصرفية شاملة مع تركيز على خدمة الشرائح المختلفة من المجتمع.",
    loanTypes: [
      { name: "القرض الشخصي", rate: "17-23%", description: "قرض شخصي للموظفين وأصحاب الأعمال الحرة." },
      { name: "تمويل السيارات", rate: "15-21%", description: "تمويل سيارات جديدة ومستعملة." },
      { name: "التمويل العقاري", rate: "3-8%", description: "تمويل عقاري ضمن المبادرات الحكومية." },
    ],
    certificates: [
      { name: "شهادة طلعت حرب", rate: "27%", duration: "سنة" },
      { name: "شهادة ابن مصر", rate: "22%", duration: "3 سنوات" },
    ],
    features: ["شبكة فروع واسعة", "تطبيق BM Online", "حسابات توفير متنوعة", "خدمات التمويل متناهي الصغر"],
    faqs: [
      { question: "ما هي شروط القرض الشخصي من بنك مصر؟", answer: "الحد الأدنى للراتب 2,500 جنيه، مدة خدمة سنة على الأقل." },
      { question: "ما أفضل شهادات بنك مصر؟", answer: "شهادة طلعت حرب تقدم أعلى عائد 27% سنوياً." },
    ],
    relatedBanks: ["national-bank-of-egypt", "cib"],
  },
  {
    slug: "cib",
    name: "البنك التجاري الدولي",
    nameEn: "CIB",
    description: "البنك التجاري الدولي (CIB) هو أكبر بنك خاص في مصر. يتميز بخدمات رقمية متقدمة وحلول مالية مبتكرة.",
    loanTypes: [
      { name: "القرض الشخصي", rate: "18-24%", description: "قرض شخصي بمزايا تنافسية للعملاء المميزين." },
      { name: "تمويل السيارات", rate: "16-22%", description: "تمويل سيارات بشروط مرنة." },
    ],
    certificates: [
      { name: "شهادة Prime", rate: "22%", duration: "سنة" },
      { name: "شهادة Plus", rate: "20%", duration: "3 سنوات" },
    ],
    features: ["أفضل تطبيق بنكي في مصر", "خدمة عملاء متميزة", "بطاقات ائتمان عالمية", "Smart Wallet"],
    faqs: [
      { question: "ما مميزات حساب CIB؟", answer: "خدمات رقمية متقدمة، تطبيق سهل الاستخدام، وخدمة عملاء 24/7." },
    ],
    relatedBanks: ["national-bank-of-egypt", "banque-misr"],
  },
];

export function getBankBySlug(slug: string): BankData | undefined {
  return banks.find((b) => b.slug === slug);
}

export function getAllBankSlugs(): string[] {
  return banks.map((b) => b.slug);
}
