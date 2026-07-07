import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmanuel-okine.vercel.app"),
  title: "Emmanuel Okine | Software Engineer & UI/UX Designer",
  description: "Software Engineer & UI/UX Designer building functional, high-impact digital products across fintech, logistics, and education.",
  keywords: [
    "Emmanuel Okine",
    "Software Engineer",
    "Frontend Engineer",
    "UI/UX Designer",
    "React",
    "Next.js",
    "TypeScript",
    "Fleet Management",
    "Fintech",
  ],
  authors: [{ name: "Emmanuel Okine" }],
  openGraph: {
    title: "Emmanuel Okine | Software Engineer & UI/UX Designer",
    description: "Software Engineer & UI/UX Designer building functional, high-impact digital products across fintech, logistics, and education.",
    type: "website",
    siteName: "Emmanuel Okine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Okine | Software Engineer & UI/UX Designer",
    description: "Software Engineer & UI/UX Designer building functional, high-impact digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
