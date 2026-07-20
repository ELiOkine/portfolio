import type { Metadata } from "next";
import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./styles.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VersionGuard from "@/components/VersionGuard";
import { TrackProvider } from "@/components/TrackProvider";

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
 title: "Emmanuel Okine | Software Engineer & Data Scientist",
 description:
 "Software engineer and data scientist in Accra. Ships fintech and ops products, and delivers forecasting, anomaly detection, and NLP case studies from the University of Cambridge Data Science for Business Career Accelerator.",
 keywords: [
 "Emmanuel Okine",
 "Software Engineer",
 "Data Scientist",
 "Machine Learning",
 "Frontend Engineer",
 "UI/UX Designer",
 "React",
 "Next.js",
 "Python",
 "University of Cambridge",
 "Fintech",
 "Accra",
 ],
 authors: [{ name: "Emmanuel Okine" }],
 openGraph: {
 title: "Emmanuel Okine | Software Engineer & Data Scientist",
 description:
 "Production software systems and University of Cambridge to affiliated data science case studies.",
 type: "website",
 siteName: "Emmanuel Okine",
 },
 twitter: {
 card: "summary_large_image",
 title: "Emmanuel Okine | Software Engineer & Data Scientist",
 description:
 "Production software and data science case studies for hiring managers who want evidence, not theater.",
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
 <TrackProvider>
 <VersionGuard />
 <Navbar />
 <main className="flex-grow">
 {children}
 </main>
 <Footer />
 </TrackProvider>
 </body>
 </html>
 );
}
