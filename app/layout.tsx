import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mazeegroup.net"),

  title: {
    default:
      "Mazee Group | Hotel Equipment Supplier Georgia, Azerbaijan, Armenia & CIS",
    template: "%s | Mazee Group",
  },

  description:
    "Leading hotel equipment supplier in Georgia, Azerbaijan, Armenia and CIS countries. Official LG & Samsung Hotel TV distributor. Digital signage, LED screens, minibars, safes, Balsan carpets, Pro:Centric, WebOS, and IT infrastructure for hospitality industry.",

  keywords: [
    // English
    "hotel equipment supplier Georgia",
    "hotel equipment supplier Tbilisi",
    "hotel equipment supplier Azerbaijan",
    "hotel equipment supplier Armenia",
    "hotel room equipment Georgia",
    "hospitality equipment supplier Caucasus",
    "hotel OS&E supplier Georgia",

    // Display & TV
    "LG hotel TV supplier Georgia",
    "Samsung hotel TV supplier Georgia",
    "hospitality TV supplier Tbilisi",
    "hotel TV Pro:Centric Georgia",
    "hotel TV WebOS system",
    "digital signage screens hotels",
    "advertising screens hotels",
    "LED screens hotels casinos",
    "LED video wall supplier Georgia",
    "outdoor LED screen supplier Georgia",

    // Minibars & Safes
    "hotel minibar supplier Georgia",
    "hotel safe box supplier Georgia",
    "hotel kettle tray set supplier",
    "hotel hair dryer supplier",
    "hotel ironing center supplier",

    // Carpets & Flooring
    "hotel carpet supplier Georgia",
    "Balsan carpet tiles Georgia",
    "hotel corridor carpet supplier",
    "hotel flooring solutions Georgia",
    "hotel bathroom ceramics supplier",
    "tiles ceramics hotels",

    // LED & AV
    "LED screen supplier Tbilisi",
    "outdoor LED screen Georgia",
    "LED signage shopping malls",
    "casino LED screen supplier",
    "digital signage solutions Caucasus",

    // IT Infrastructure
    "hotel IT infrastructure integrator Georgia",
    "hospitality Wi-Fi network solutions",
    "hotel server storage solutions",
    "data center virtualization Georgia",
    "DELL HP VMware Veeam Nutanix Cisco",
    "hotel information security solutions",

    // Russian keywords
    "поставщик оборудования для отелей Грузия",
    "оборудование для отелей Тбилиси",
    "LG телевизоры для отелей Грузия",
    "минибары для отелей Грузия",
    "LED экраны Тбилиси",
    "ковры для отелей Грузия",
    "Balsan ковры Грузия",
  ],

  authors: [{ name: "Mazee Group" }],

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU", "ka_GE"],
    url: "https://mazeegroup.net",
    siteName: "Mazee Group",
    title: "Mazee Group | Hotel Equipment Supplier Georgia & Caucasus",
    description:
      "Official LG & Samsung distributor. Hotel TVs, digital signage, LED screens, minibars, safes, Balsan carpets, and IT solutions for hospitality industry in Georgia, Azerbaijan, Armenia.",
    images: [
      {
        url: "/assets/project_images/hilton-baku/small.webp",
        width: 1200,
        height: 630,
        alt: "Mazee Group - Hotel Equipment Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mazee Group | Hotel Equipment Supplier Georgia",
    description:
      "Leading hospitality equipment supplier in Caucasus: LG TVs, LED screens, minibars, safes, carpets, IT infrastructure",
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

  alternates: {
    canonical: "https://mazeegroup.net",
    languages: {
      en: "https://mazeegroup.net/en",
      ru: "https://mazeegroup.net/ru",
      ka: "https://mazeegroup.net/ka",
    },
  },

  other: {
    "apple-mobile-web-app-status-bar-style": "default",
    "msapplication-navbutton-color": "#032685",
    "msapplication-TileColor": "#032685",
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
        {/* Plyr CSS from CDN - fixes Vercel build issue */}
        <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />

        {/* JSON-LD Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mazee Group",
              url: "https://mazeegroup.net",
              logo: "https://mazeegroup.net/logo.png",
              description:
                "Leading hotel equipment supplier in Georgia, Azerbaijan, Armenia and CIS. Official LG & Samsung distributor for hospitality industry.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "GE",
                addressLocality: "Tbilisi",
                addressRegion: "Tbilisi",
              },
              areaServed: ["Georgia", "Azerbaijan", "Armenia", "CIS"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Hotel Equipment & Solutions",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "LG Hotel TVs & Digital Signage",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Hotel Minibars & Safes",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "LED Screens & Video Walls",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Balsan Carpets & Flooring",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Hotel IT Infrastructure",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* Additional meta tags */}
        <meta name="msapplication-navbutton-color" content="#032685" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
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
