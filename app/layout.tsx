import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sumit-s-nair.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sumit Santhosh Nair | Full Stack Developer",
    template: "%s | Sumit Nair",
  },
  description:
    "Full Stack Developer & Videographer. Engineering student at PES University building scalable web applications and exploring multi-modal AI systems.",
  keywords: [
    "Sumit",
    "Sumit Nair",
    "Sumit S Nair",
    "Nair",
    "Sumit Santhosh Nair",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "PES University",
    "Software Engineer",
    "Bengaluru",
  ],
  authors: [{ name: "Sumit Santhosh Nair", url: siteUrl }],
  creator: "Sumit Santhosh Nair",
  publisher: "Sumit Santhosh Nair",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sumit Santhosh Nair",
    title: "Sumit Santhosh Nair | Full Stack Developer",
    description:
      "Full Stack Developer & Videographer building scalable web applications and exploring multi-modal AI systems.",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Sumit Santhosh Nair - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Sumit Santhosh Nair | Full Stack Developer",
    description:
      "Full Stack Developer & Videographer building scalable web applications.",
    images: ["/profile.jpg"],
    creator: "@sumit_s_nair",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sumit Santhosh Nair",
    alternateName: ["Sumit", "Sumit Nair", "Sumit S Nair"],
    url: siteUrl,
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/sumit-s-nair",
      "https://www.linkedin.com/in/sumit-santhosh-nair-3ba522283/",
    ],
    image: `${siteUrl}/profile.jpg`,
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-void text-mist`}
      >
        {children}
      </body>
    </html>
  );
}
