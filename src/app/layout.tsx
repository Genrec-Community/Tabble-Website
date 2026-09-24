import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Tabble — QR dine-in ordering & restaurant OS",
  description:
    "Guests scan a QR at the table, browse your menu, order and pay from their phone. Orders flow straight to your kitchen display. Tabble is the QR dine-in ordering platform built for restaurants.",
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
    title: "Tabble — QR dine-in ordering & restaurant OS",
    description:
      "Turn every table into a self-ordering table. Guests scan, order and pay from their phone — no app download.",
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
        className={`${fraunces.variable} ${jakarta.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
