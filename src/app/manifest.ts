import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "احسبها مصر - منصة الحاسبات المالية",
    short_name: "احسبها مصر",
    description: "منصة الحاسبات المالية الأولى في مصر - حاسبات القروض، الرواتب، الزكاة، الضرائب والمزيد",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    dir: "rtl",
    lang: "ar",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
