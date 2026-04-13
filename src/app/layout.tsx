import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  preload: true,
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Living Word — Transformative Bible Study Seminar",
  description:
    "A comprehensive 12-week Bible study seminar for the Filipino Christian community. Using the SOAP inductive method and 4-Pillar Architecture to know God deeply through Scripture, with animated infographics and cinematic scroll experience.",
  keywords: [
    "Bible study",
    "Filipino church",
    "SOAP method",
    "inductive Bible study",
    "12-week seminar",
    "Christian discipleship",
    "small group",
    "spiritual formation",
    "Scripture engagement",
    "Filipino Christian",
    "Taguig",
    "Living Word seminar",
    "4-Pillar Architecture",
    "GSAP animations",
    "interactive web app",
  ],
  authors: [
    { name: "Mark Tantongco", url: "https://github.com/marktantongco" },
  ],
  creator: "powerUP",
  publisher: "powerUP",
  metadataBase: new URL("https://brutalist-editorial.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brutalist-editorial.vercel.app",
    title: "The Living Word — Transformative Bible Study Seminar",
    description:
      "A 12-week interactive Bible study seminar for Filipino believers. SOAP inductive method, 4-Pillar Architecture, and cinematic scroll experience with animated infographics.",
    siteName: "The Living Word Seminar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Living Word — Transformative Bible Study Seminar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Living Word — Transformative Bible Study Seminar",
    description:
      "12-week interactive Bible study seminar with animated infographics and cinematic scroll experience.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
      >
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `
            .hero-cross,.hero-pre-title,.hero-title-1,.hero-title-2,.hero-title-3,
            .hero-divider,.hero-tagline,.hero-verse-ref,.hero-stats,.hero-scroll,
            .hero-watermark,.about-line,.struct-block,.commission-animate,
            .split-char,.bar-fill,.bar-label,.donut-segment,
            .reveal-child,.will-reveal {
              opacity:1!important;transform:none!important;clip-path:none!important;
              -webkit-text-fill-color:currentColor!important;
            }
            .text-stroke,.text-stroke-thick {
              -webkit-text-fill-color:currentColor!important;
            }
          `}} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalEvent",
              name: "The Living Word: A Transformative Bible Study Seminar",
              description:
                "A comprehensive 12-week Bible study seminar for Filipino Christian believers using the SOAP inductive method.",
              organizer: {
                "@type": "Organization",
                name: "powerUP",
              },
              location: {
                "@type": "Place",
                name: "Filipino Christian Community",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Taguig",
                  addressCountry: "PH",
                },
              },
              duration: "P84D",
              educationalLevel: "All Levels",
              educationalFramework: "SOAP Inductive Bible Study Method",
              inLanguage: ["en", "fil"],
              startDate: "2026-04-01",
              endDate: "2026-06-24",
              offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
            }),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
