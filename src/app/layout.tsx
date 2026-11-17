import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: "Super Sky Fiber Net" }],
  creator: "Super Sky Fiber Net (SSFN)",
  publisher: "Super Sky Fiber Net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.seo.siteUrl,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data for Local ISP in Jamshedpur
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["InternetServiceProvider", "LocalBusiness"],
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.seo.siteUrl,
    telephone: "+919471126747",
    email: siteConfig.contact.email,
    priceRange: "₹399 - ₹1299",
    description: siteConfig.seo.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Commercial Hub, Bistupur / Sakchi Main Road",
      addressLocality: "Jamshedpur",
      addressRegion: "Jharkhand",
      postalCode: "831001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.8046",
      longitude: "86.2029",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:30",
      },
    ],
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Jamshedpur",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jharkhand",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Broadband Plans",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SSFN Starter 50 Mbps",
          },
          price: "399",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SSFN Turbo Home 100 Mbps",
          },
          price: "449",
          priceCurrency: "INR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SSFN Ultra 200 Mbps",
          },
          price: "649",
          priceCurrency: "INR",
        },
      ],
    },
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-slate-900 selection:bg-cyan-100 selection:text-[#082B55]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
