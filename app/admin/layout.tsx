"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminSidebar from "./components/AdminSidebar";
import { ThemeProvider, useTheme } from "../components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

function AdminShell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  return (
    <body className={`${inter.className} antialiased`}>
      <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-base)" }}>
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b flex items-center justify-between px-6 shrink-0"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Admin Panel</span>
            <button onClick={toggle} aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
              {theme === "dark" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </body>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AdminShell>{children}</AdminShell>
      </ThemeProvider>
    </html>
  );
}
