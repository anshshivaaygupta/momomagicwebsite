import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "Momo Magic | Steamed, Fried & Kurkure Momos in Sherghati",
    template: "%s | Momos Magic",
  },
  description: "Vegetarian steamed, fried and Kurkure momos in Naya Bazar, Sherghati. Browse the menu, plan a visit, explore takeaway and enquire about catering.",
  keywords: [
    "momos",
    "Sherghati momos",
    "Bihar momos",
    "best momos in Sherghati",
    "kurkure momos",
    "vegetarian momos",
    "Momos Magic",
    "Naya Bazar Sherghati",
    "best food in Sherghati",
  ],
  authors: [{ name: "Momos Magic", url: "https://momo-magic-website.vercel.app" }],
  creator: "Momos Magic",
  publisher: "Momos Magic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://momo-magic-website.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Momos Magic - Best Momos in Sherghati, Bihar",
    description: "Vegetarian momos at Naya Bazar, Sherghati. Explore our menu, takeaway and catering.",
    url: "https://momo-magic-website.vercel.app",
    siteName: "Momos Magic",
    images: [
      {
        url: "/images/premium/hero.webp",
        width: 1200,
        height: 630,
        alt: "Momos Magic - Best Momos in Sherghati",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Momos Magic - Best Momos in Sherghati, Bihar",
    description: "Vegetarian momos at Naya Bazar, Sherghati. Explore our menu, takeaway and catering.",
    images: ["/images/premium/hero.webp"],
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
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body
        className={"antialiased"}
      >
        {children}
      </body>
    </html>
  );
}

