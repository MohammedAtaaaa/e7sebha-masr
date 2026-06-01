# احسبها مصر (E7sebha Masr)

منصة الحاسبات المالية الأولى في مصر - حاسبات القروض، الرواتب، الزكاة، الضرائب والمزيد.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel

## Features

- 🧮 **Config-driven Calculator Engine** — Add new calculators by dropping JSON configs
- 📊 **Programmatic SEO** — Auto-generated salary, city, and bank comparison pages
- 📝 **MDX Blog System** — SEO-optimized articles with category support
- 🔗 **Internal Linking Engine** — Related calculators, breadcrumbs, contextual links
- 🔍 **Full SEO Infrastructure** — Sitemap, robots.txt, JSON-LD, Open Graph, Twitter Cards
- 📱 **PWA Support** — Installable, offline fallback
- 💰 **Monetization Ready** — AdSlot components throughout
- 🌐 **RTL Arabic** — Full right-to-left support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── calculators/        # Calculator pages
│   ├── blog/               # Blog pages
│   ├── salary/             # Salary intelligence pages
│   ├── cities/             # City cost-of-living pages
│   ├── banks/              # Bank comparison pages
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt
│   └── manifest.ts         # PWA manifest
├── components/             # Reusable components
│   ├── ui/                 # Base UI components
│   ├── calculators/        # Calculator components
│   ├── seo/                # SEO components (FAQ, breadcrumbs, etc.)
│   └── layout/             # Layout components
├── data/                   # Data configs
│   ├── calculators/        # Calculator configs
│   ├── salaries/           # Salary data
│   ├── cities/             # City data
│   └── banks/              # Bank data
├── content/
│   └── blog/               # MDX blog articles
└── lib/                    # Utilities and types
    ├── calculator-engine.ts
    ├── blog.ts
    ├── types.ts
    └── utils.ts
```

## Adding a New Calculator

Add a new entry to `src/data/calculators/index.ts` with the calculator config and add the formula to `src/lib/calculator-engine.ts`. No page code needed.

## Deployment

```bash
npm run build
# Deploy to Vercel
```
