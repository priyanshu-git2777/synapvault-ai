import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "SynapVault AI",
    template: "%s | SynapVault AI",
  },
  description:
    "Upload documents, ask grounded questions and receive answers with exact citations.",
  keywords: [
    "document intelligence",
    "RAG",
    "AI document chat",
    "PDF chat",
    "vector search",
    "knowledge workspace",
  ],
  authors: [{ name: "Priyanshu Jaggi" }],
  creator: "Priyanshu Jaggi",
  openGraph: {
    title: "SynapVault AI",
    description: "Turn every document into trusted, connected intelligence.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f9ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
