import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title:
    "Maze Group - Hotel Equipment & IT Solutions Supplier | Georgia, Azerbaijan, Armenia, CIS",
  description:
    "Leading hotel equipment supplier in Georgia, Azerbaijan, Armenia and CIS region. LG & Samsung hotel TVs, minibars, safes, LED screens, digital signage, carpets, IT infrastructure. 24/7 professional hospitality solutions in Tbilisi, Baku, Yerevan.",
  keywords: [
    // Main services
    "hotel equipment supplier Georgia",
    "hotel equipment supplier Tbilisi",
    "hotel equipment supplier Azerbaijan",
    "hotel equipment supplier Armenia",
    "hotel equipment supplier CIS region",
    "hospitality equipment supplier Caucasus",
    "hotel OS&E supplier Georgia",

    // Display & TV
    "LG hotel TV supplier Georgia",
    "Samsung hotel TV supplier Georgia",
    "hospitality TV supplier Tbilisi",
    "hotel TV with server system",
    "Pro:Centric WebOS",
    "digital signage screens for hotels",
    "LED screens for hotels and casinos",
    "LED video wall supplier Georgia",
    "outdoor LED screen supplier Georgia",

    // Room equipment
    "hotel minibar supplier Georgia",
    "hotel safe box supplier Georgia",
    "hotel room equipment Georgia",
    "hotel kettle and tray set supplier",
    "hotel hair dryer supplier",

    // Flooring & Carpets
    "hotel carpet supplier Georgia",
    "Balsan carpet tiles Georgia",
    "hotel corridor carpet supplier",
    "hotel flooring solutions Georgia",
    "hotel bathroom ceramics supplier",

    // IT Infrastructure
    "hotel IT infrastructure integrator Georgia",
    "hospitality Wi-Fi solutions",
    "hotel server solutions",
    "data center virtualization",

    // Russian keywords
    "Поставщик оборудования для отелей в Грузии",
    "Поставщик оборудования для отелей в Тбилиси",
    "LG телевизоры для отелей Грузия",
    "Samsung телевизоры для отелей Грузия",
    "LED экраны для отелей Грузия",
    "Минибары для отелей Грузия",
    "Сейфы для отелей Грузия",
    "ИТ-инфраструктура для отелей Грузия",
  ],
  authors: [{ name: "Maze Group" }],
  creator: "Maze Group",
  publisher: "Maze Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Maze Group - Hotel Equipment & IT Solutions Supplier",
    description:
      "Professional hotel equipment supplier in Georgia, Azerbaijan, Armenia and CIS. LG & Samsung TVs, minibars, safes, LED screens, IT infrastructure.",
    url: "https://maze-group.com",
    siteName: "Maze Group",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification (დაამატე შენი კოდი)
    // google: 'your-google-verification-code',
    // Yandex verification (რუსულ ბაზარზე)
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: "https://maze-group.com",
    languages: {
      en: "https://maze-group.com/en",
      ru: "https://maze-group.com/ru",
      ka: "https://maze-group.com/ka",
    },
  },
  other: {
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-navbutton-color": "#FFFFFF",
    "msapplication-TileColor": "#FFFFFF",
  },
};

export const viewport: Viewport = {
  themeColor: "#032685",
};

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <head>
        <meta name="msapplication-navbutton-color" content="#FFFFFF" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Geo targeting */}
        <meta name="geo.region" content="GE" />
        <meta name="geo.placename" content="Tbilisi" />

        {/* Business schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Maze Group",
              description:
                "Hotel equipment and IT solutions supplier in Georgia, Azerbaijan, Armenia and CIS region",
              url: "https://maze-group.com",
              logo: "https://maze-group.com/logo.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tbilisi",
                addressCountry: "GE",
              },
              areaServed: ["GE", "AZ", "AM"],
              serviceType: [
                "Hotel Equipment Supply",
                "IT Infrastructure",
                "Hospitality Solutions",
                "LED Display Systems",
                "Digital Signage",
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className="bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <NextIntlClientProvider>
          {children}
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
