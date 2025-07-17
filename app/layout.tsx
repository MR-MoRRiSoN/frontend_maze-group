import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Maze Group - IT & Hospitality Solutions",
  description:
    "Professional IT and Hospitality solutions with 24/7 innovation and infinite possibilities",
  // Additional meta tags for better branding
  other: {
    // Safari
    "apple-mobile-web-app-status-bar-style": "default",
    // Microsoft Edge
    "msapplication-navbutton-color": "#FFFFFF",
    "msapplication-TileColor": "#FFFFFF",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <head>
        {/* Additional meta tags for comprehensive browser theming */}
        <meta name="msapplication-navbutton-color" content="#FFFFFF" />
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
