import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "powerUP Showcase — Neo-Brutalist Interactive Template",
  description:
    "A high-impact neo-brutalist editorial template with GSAP scroll animations, animated infographics, and kinetic typography. Built by powerUP — AI tools, digital products, web experiences.",
  keywords: [
    "powerUP",
    "neo-brutalist",
    "editorial template",
    "GSAP animations",
    "scroll-driven",
    "infographic",
    "kinetic typography",
    "Next.js",
    "Tailwind CSS",
    "interactive template",
    "web design",
    "motion design",
    "brutalist template",
    "animated infographic",
    "scroll animation",
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
    title: "powerUP Showcase — Neo-Brutalist Interactive Template",
    description:
      "Scroll-driven neo-brutalist editorial with animated data visualization, kinetic typography, and GSAP motion transitions.",
    siteName: "powerUP Showcase",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "powerUP Showcase — Neo-Brutalist Interactive Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "powerUP Showcase — Neo-Brutalist Interactive Template",
    description:
      "Scroll-driven neo-brutalist editorial with animated infographics and motion transitions.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "powerUP Showcase",
              description:
                "Neo-brutalist interactive editorial template with GSAP scroll animations",
              url: "https://brutalist-editorial.vercel.app",
              author: {
                "@type": "Person",
                name: "Mark Tantongco",
                url: "https://github.com/marktantongco",
              },
              creator: { "@type": "Organization", name: "powerUP" },
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "2847",
              },
            }),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
