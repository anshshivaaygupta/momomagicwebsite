import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "Momos Magic - Best Momos in Sherghati, Bihar | Award-Winning Quality",
    template: "%s | Momos Magic",
  },
  description: "Experience the Magic That Transformed Sherghati's Street Food Scene. Award-winning momos, FSSAI certified, 100% vegetarian. First to introduce Kurkure Momos in Bihar. Order now!",
  keywords: [
    "momos",
    "Sherghati momos",
    "Bihar momos",
    "best momos in Sherghati",
    "kurkure momos",
    "vegetarian momos",
    "FSSAI certified momos",
    "award-winning momos",
    "Momos Magic",
    "Dhruv Gupta",
    "Naya Bazar Sherghati",
    "food delivery Sherghati",
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
    description: "Award-winning momos, FSSAI certified, 100% vegetarian. First to introduce Kurkure Momos in Bihar.",
    url: "https://momo-magic-website.vercel.app",
    siteName: "Momos Magic",
    images: [
      {
        url: "/images/stock/platter.jpg",
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
    description: "Award-winning momos, FSSAI certified, 100% vegetarian. First to introduce Kurkure Momos in Bihar.",
    images: ["/images/stock/platter.jpg"],
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

