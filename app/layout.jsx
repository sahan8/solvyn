import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const metadata = { metadataBase: new URL(siteUrl), title: { default: "SOLVYN — Move Beyond", template: "%s — SOLVYN" }, description: "Performance and lifestyle footwear engineered around movement, comfort and fit.", openGraph: { title: "SOLVYN — Move Beyond", description: "Performance and lifestyle footwear engineered around movement, comfort and fit.", type: "website", siteName: "SOLVYN" } };
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0A0A0A", colorScheme: "light dark" };
export default function RootLayout({ children }) { return <html lang="en" className={`${geist.variable} ${mono.variable} ${space.variable}`}><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }
