import type { CityData } from "@/lib/types";

export const cities: CityData[] = [
  {
    slug: "cairo",
    name: "القاهرة",
    nameEn: "Cairo",
    costOfLiving: 12000,
    avgRent: 5000,
    avgSalary: 15000,
    description: "القاهرة هي عاصمة مصر وأكبر مدنها. تضم أكبر عدد من الشركات والمؤسسات وتوفر أعلى الرواتب مع تكلفة معيشة مرتفعة نسبياً.",
    highlights: ["أكبر سوق عمل في مصر", "أعلى متوسط رواتب", "تكلفة معيشة مرتفعة", "مواصلات متنوعة (مترو، أتوبيس)"],
    faqs: [
      { question: "كم تكلفة المعيشة في القاهرة؟", answer: "تتراوح بين 8,000 و15,000 جنيه شهرياً للفرد حسب نمط الحياة والمنطقة." },
      { question: "ما أفضل مناطق السكن في القاهرة؟", answer: "مدينة نصر، المعادي، التجمع الخامس، والشيخ زايد من أفضل المناطق السكنية." },
      { question: "كم إيجار شقة في القاهرة؟", answer: "يتراوح بين 3,000 جنيه في المناطق الشعبية و15,000+ جنيه في المناطق الراقية." },
    ],
    relatedCities: ["alexandria", "giza"],
  },
  {
    slug: "alexandria",
    name: "الإسكندرية",
    nameEn: "Alexandria",
    costOfLiving: 8000,
    avgRent: 3000,
    avgSalary: 10000,
    description: "الإسكندرية هي ثاني أكبر مدن مصر وتقع على ساحل البحر المتوسط. تتميز بتكلفة معيشة أقل من القاهرة مع جودة حياة جيدة.",
    highlights: ["مدينة ساحلية جميلة", "تكلفة معيشة معقولة", "قطاع صناعي قوي", "جامعات عريقة"],
    faqs: [
      { question: "كم تكلفة المعيشة في الإسكندرية؟", answer: "تتراوح بين 5,000 و10,000 جنيه شهرياً، أقل من القاهرة بحوالي 30%." },
      { question: "ما أفضل مناطق السكن في الإسكندرية؟", answer: "سموحة، جليم، سيدي بشر، والمندرة من المناطق المفضلة." },
    ],
    relatedCities: ["cairo", "mansoura"],
  },
  {
    slug: "giza",
    name: "الجيزة",
    nameEn: "Giza",
    costOfLiving: 10000,
    avgRent: 4000,
    avgSalary: 13000,
    description: "الجيزة تقع غرب القاهرة وتضم مناطق سكنية مهمة مثل الشيخ زايد و6 أكتوبر. تتميز بتوفر مساحات سكنية أوسع بأسعار أقل نسبياً.",
    highlights: ["قربها من القاهرة", "مدن جديدة حديثة", "مساحات سكنية أوسع", "مناطق صناعية"],
    faqs: [
      { question: "كم تكلفة المعيشة في الجيزة؟", answer: "تتراوح بين 7,000 و12,000 جنيه شهرياً حسب المنطقة." },
    ],
    relatedCities: ["cairo", "alexandria"],
  },
  {
    slug: "mansoura",
    name: "المنصورة",
    nameEn: "Mansoura",
    costOfLiving: 6000,
    avgRent: 2000,
    avgSalary: 7000,
    description: "المنصورة هي عاصمة محافظة الدقهلية وتضم جامعة المنصورة المشهورة. تتميز بتكلفة معيشة منخفضة وجودة تعليم جيدة.",
    highlights: ["جامعة المنصورة المرموقة", "تكلفة معيشة منخفضة", "مركز طبي مهم", "حياة اجتماعية نشطة"],
    faqs: [
      { question: "كم تكلفة المعيشة في المنصورة؟", answer: "تتراوح بين 4,000 و8,000 جنيه شهرياً، من أقل المدن تكلفة." },
    ],
    relatedCities: ["cairo", "alexandria"],
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
