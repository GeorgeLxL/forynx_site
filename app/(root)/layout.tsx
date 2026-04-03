import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ForyNX — Custom Internal Tools for Manufacturing & Wholesale",
  description:
    "We build simple ERP-lite systems for manufacturing and wholesale teams to replace spreadsheets, manual workflows, and outdated tools.",
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
