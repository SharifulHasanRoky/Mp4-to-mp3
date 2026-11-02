import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoogleTagManager } from "@/components/google-tag-manager";
import { SiteSchema } from "@/components/site-schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Avoid FOIT — show fallback font during load
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.mp4tomp3.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MP4 to MP3 Converter Online – Free & Fast | MP4toMP3.online",
    template: "%s | MP4toMP3.online",
  },
  description:
    "Convert MP4 to MP3 online for free. Extract audio from MP4, MOV, WebM, MKV and more — fast, private, runs entirely in your browser. No sign-up, no watermark, no upload to server.",
  applicationName: "MP4toMP3.online",
  keywords: [
    "mp4 to mp3",
    "mp4 to mp3 converter",
    "convert mp4 to mp3",
    "mp4 to mp3 online",
    "mp4 to mp3 converter online free",
    "free mp4 to mp3 converter",
    "extract audio from mp4",
    "mp4 audio extractor",
    "video to mp3 converter",
    "convert video to audio",
  ],
  authors: [{ name: "MP4toMP3.online" }],
  creator: "MP4toMP3.online",
  publisher: "MP4toMP3.online",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MP4 to MP3 Converter Online – Free & Fast",
    description:
      "Convert MP4 to MP3 audio online for free. Files are processed in your browser — private, fast, no sign-up. Supports MP4, MOV, WebM, MKV and more.",
    url: siteUrl,
    siteName: "MP4toMP3.online",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "MP4 to MP3 Converter — Free Online Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MP4 to MP3 Converter Online – Free & Fast",
    description:
      "Convert MP4 to MP3 audio online for free. Fast, private, no sign-up required.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Add Google Search Console verification token here when ready
    // google: "your-verification-token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <SiteSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
