import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://mp4-to-mp3.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MP4 to MP3 Converter – Free Online Video to Audio Tool",
    template: "%s | MP4 to MP3",
  },
  description:
    "Convert MP4 to MP3 online for free. Upload any video file and extract a high-quality MP3 audio track in seconds — fast, private, FFmpeg-powered, no sign-up required.",
  keywords: [
    "mp4 to mp3",
    "mp4 to mp3 converter",
    "convert mp4 to mp3",
    "mp4 to mp3 online",
    "video to audio converter",
    "extract audio from video",
    "mp3 extractor",
    "video to mp3 converter",
  ],
  authors: [{ name: "MP4 to MP3" }],
  creator: "MP4 to MP3",
  openGraph: {
    title: "MP4 to MP3 Converter – Free Online Video to Audio Tool",
    description:
      "Convert MP4 to MP3 audio online for free. Fast, private, no sign-up required. Supports MP4, MOV, WebM, MKV and more.",
    url: siteUrl,
    siteName: "MP4 to MP3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MP4 to MP3 Converter – Free Online Video to Audio Tool",
    description:
      "Convert MP4 to MP3 audio online for free. Fast, private, no sign-up required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    <html lang="en" suppressHydrationWarning>
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
