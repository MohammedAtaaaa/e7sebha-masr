import type { SalaryData } from "@/lib/types";

export const salaries: SalaryData[] = [
  {
    slug: "software-engineer-egypt",
    profession: "مهندس برمجيات",
    professionEn: "Software Engineer",
    averageSalary: 25000,
    minSalary: 8000,
    maxSalary: 60000,
    taxRate: 15,
    insurance: 11,
    description: "مهندس البرمجيات في مصر يعمل على تطوير التطبيقات والأنظمة البرمجية. يتراوح الراتب حسب الخبرة والشركة وتقنيات البرمجة المستخدمة.",
    skills: ["JavaScript", "Python", "React", "Node.js", "SQL", "Git"],
    growthTips: ["تعلم تقنيات جديدة باستمرار", "ساهم في مشاريع مفتوحة المصدر", "احصل على شهادات معتمدة", "ابنِ شبكة علاقات مهنية"],
    faqs: [
      { question: "كم راتب مهندس البرمجيات في مصر؟", answer: "يتراوح بين 8,000 و60,000 جنيه شهرياً حسب الخبرة والشركة. المتوسط حوالي 25,000 جنيه." },
      { question: "ما المهارات المطلوبة لمهندس البرمجيات؟", answer: "مطلوب معرفة بلغات البرمجة مثل JavaScript وPython، وأطر العمل مثل React وNode.js." },
      { question: "هل يمكن العمل عن بعد كمهندس برمجيات؟", answer: "نعم، مجال البرمجة من أكثر المجالات المناسبة للعمل عن بعد مع شركات محلية ودولية." },
    ],
    relatedProfessions: ["doctor-egypt", "accountant-egypt", "teacher-egypt"],
  },
  {
    slug: "doctor-egypt",
    profession: "طبيب",
    professionEn: "Doctor",
    averageSalary: 20000,
    minSalary: 5000,
    maxSalary: 100000,
    taxRate: 15,
    insurance: 11,
    description: "الأطباء في مصر يعملون في المستشفيات الحكومية والخاصة والعيادات. الراتب يختلف بشكل كبير حسب التخصص والخبرة ومكان العمل.",
    skills: ["التشخيص الطبي", "الجراحة", "التعامل مع المرضى", "البحث العلمي"],
    growthTips: ["احصل على تخصص دقيق", "ابنِ سمعة مهنية جيدة", "شارك في مؤتمرات طبية", "فكر في فتح عيادة خاصة"],
    faqs: [
      { question: "كم راتب الطبيب في مصر؟", answer: "يتراوح بين 5,000 جنيه للطبيب المقيم و100,000+ جنيه للاستشاري في القطاع الخاص." },
      { question: "ما أعلى التخصصات الطبية أجراً؟", answer: "جراحة القلب، التجميل، طب العيون، وجراحة العظام من أعلى التخصصات أجراً." },
    ],
    relatedProfessions: ["software-engineer-egypt", "pharmacist-egypt", "teacher-egypt"],
  },
  {
    slug: "accountant-egypt",
    profession: "محاسب",
    professionEn: "Accountant",
    averageSalary: 10000,
    minSalary: 4000,
    maxSalary: 35000,
    taxRate: 10,
    insurance: 11,
    description: "المحاسبون في مصر يعملون في الشركات والمؤسسات المالية ومكاتب المحاسبة. يزداد الراتب مع الحصول على شهادات مهنية.",
    skills: ["المحاسبة المالية", "Excel", "ERP Systems", "التحليل المالي", "الضرائب"],
    growthTips: ["احصل على شهادة CMA أو CPA", "تعلم أنظمة ERP", "تخصص في مجال معين", "طور مهارات التحليل المالي"],
    faqs: [
      { question: "كم راتب المحاسب في مصر؟", answer: "يتراوح بين 4,000 و35,000 جنيه. المتوسط حوالي 10,000 جنيه." },
      { question: "ما أفضل شهادة للمحاسبين؟", answer: "شهادة CMA (المحاسب الإداري المعتمد) وCPA هي الأكثر طلباً في السوق المصري." },
    ],
    relatedProfessions: ["software-engineer-egypt", "teacher-egypt"],
  },
  {
    slug: "teacher-egypt",
    profession: "مدرس",
    professionEn: "Teacher",
    averageSalary: 6000,
    minSalary: 3000,
    maxSalary: 20000,
    taxRate: 5,
    insurance: 11,
    description: "المدرسون في مصر يعملون في المدارس الحكومية والخاصة والدولية. الدروس الخصوصية تمثل مصدر دخل إضافي كبير.",
    skills: ["التدريس", "إدارة الفصل", "التكنولوجيا التعليمية", "التقييم"],
    growthTips: ["احصل على شهادات تعليمية دولية", "تعلم التدريس عبر الإنترنت", "تخصص في مادة مطلوبة", "اعمل في مدارس دولية"],
    faqs: [
      { question: "كم راتب المدرس في مصر؟", answer: "يتراوح بين 3,000 جنيه في المدارس الحكومية و20,000+ جنيه في المدارس الدولية." },
    ],
    relatedProfessions: ["doctor-egypt", "accountant-egypt"],
  },
  {
    slug: "pharmacist-egypt",
    profession: "صيدلي",
    professionEn: "Pharmacist",
    averageSalary: 8000,
    minSalary: 4000,
    maxSalary: 25000,
    taxRate: 10,
    insurance: 11,
    description: "الصيادلة في مصر يعملون في الصيدليات وشركات الأدوية والمستشفيات. فتح صيدلية خاصة يمثل فرصة لدخل أعلى.",
    skills: ["علم الأدوية", "خدمة العملاء", "إدارة المخزون", "الكيمياء الحيوية"],
    growthTips: ["فكر في فتح صيدلية خاصة", "تخصص في مجال معين", "اعمل في شركات الأدوية", "تعلم التسويق الدوائي"],
    faqs: [
      { question: "كم راتب الصيدلي في مصر؟", answer: "يتراوح بين 4,000 و25,000 جنيه. صاحب الصيدلية قد يحقق دخلاً أعلى بكثير." },
    ],
    relatedProfessions: ["doctor-egypt", "accountant-egypt"],
  },
];

export function getSalaryBySlug(slug: string): SalaryData | undefined {
  return salaries.find((s) => s.slug === slug);
}

export function getAllSalarySlugs(): string[] {
  return salaries.map((s) => s.slug);
}
