import type { Metadata } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./styles.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VersionGuard from "@/components/VersionGuard";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://emmanuel-okine.vercel.app"),
  title: "Emmanuel Okine | Software Engineer & UI/UX Designer",
  description: "Software engineer and designer in Accra building payment systems, operational dashboards, and product interfaces for fintech and logistics.",
  keywords: [
    "Emmanuel Okine",
    "Software Engineer",
    "Frontend Engineer",
    "UI/UX Designer",
    "React",
    "Next.js",
    "TypeScript",
    "Fintech",
    "Accra",
  ],
  authors: [{ name: "Emmanuel Okine" }],
  openGraph: {
    title: "Emmanuel Okine | Software Engineer & UI/UX Designer",
    description: "Software engineer and designer in Accra building payment systems, operational dashboards, and product interfaces for fintech and logistics.",
    type: "website",
    siteName: "Emmanuel Okine",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Okine | Software Engineer & UI/UX Designer",
    description: "Software engineer and designer building functional products across fintech and logistics.",
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
        className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased min-h-screen flex flex-col`}
      >
        <VersionGuard />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
