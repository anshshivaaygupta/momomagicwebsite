import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

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
    "pizza momos",
    "vegetarian momos",
    "FSSAI certified momos",
    "award-winning momos",
    "Momos Magic",
    "Dhruv Gupta",
    "Naya Bazar Sherghati",
    "food delivery Sherghati",
    "best food in Sherghati",
  ],
  authors: [{ name: "Momos Magic", url: "https://www.momomegics.com" }],
  creator: "Momos Magic",
  publisher: "Momos Magic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.momomegics.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Momos Magic - Best Momos in Sherghati, Bihar",
    description: "Award-winning momos, FSSAI certified, 100% vegetarian. First to introduce Kurkure Momos in Bihar.",
    url: "https://www.momomegics.com",
    siteName: "Momos Magic",
    images: [
      {
        url: "/images/og-image.jpg",
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
    images: ["/images/twitter-image.jpg"],
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
    google: "your-google-verification-code",
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
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
