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

export const metadata: Metadata = {
  title: "Sumit Nair | Portfolio",
  description: "Creative Developer & Designer crafting digital experiences that defy gravity.",
  keywords: ["developer", "designer", "portfolio", "creative", "frontend"],
  authors: [{ name: "Sumit Nair" }],
  openGraph: {
    title: "Sumit Nair | Portfolio",
    description: "Creative Developer & Designer crafting digital experiences that defy gravity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-void text-mist`}
      >
        {children}
      </body>
    </html>
  );
}
