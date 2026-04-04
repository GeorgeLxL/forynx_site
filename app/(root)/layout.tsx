import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ForyNX — Custom Internal Tools for Manufacturing, logistics & Wholesale",
  description: "We build custom ERP-lite systems for manufacturing, logistics and wholesale teams to replace spreadsheets, manual workflows, and outdated tools.",
  keywords: ["ERP", "manufacturing", "logistics", "wholesale", "internal tools"],
  authors: [{ name: "ForyNX" }],
  openGraph: {
    title: "ForyNX",
    description: "We build custom ERP-lite systems for manufacturing, logistics and wholesale teams to replace spreadsheets, manual workflows, and outdated tools.",
    url: "https://forynx.vercel.app",
    siteName: "ForyNX",
    images: [{ url: "/og-image.png", width: 1000, height: 366, alt: "ForyNX" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ForyNX",
    description: "We build custom ERP-lite systems for manufacturing, logistics and wholesale teams to replace spreadsheets, manual workflows, and outdated tools.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
