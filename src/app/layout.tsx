import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tabble — Every table becomes your best waiter",
  description:
    "Guests scan the QR code on the table, browse your menu, order and pay from their phone — and every order lands on your kitchen screen the moment it's placed. Now onboarding the first 50 restaurants.",
  keywords: [
    "QR ordering",
    "restaurant SaaS",
    "dine-in ordering",
    "digital menu",
    "restaurant technology",
    "Tabble",
  ],
  authors: [{ name: "Tabble" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Tabble — Every table becomes your best waiter",
    description:
      "Guests scan, order and pay from their phone — no app download. Now onboarding the first 50 restaurants.",
    siteName: "Tabble",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFBF6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${jakarta.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
