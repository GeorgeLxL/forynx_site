"use client";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b"
      style={{ background: "color-mix(in srgb, var(--bg-base) 80%, transparent)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="relative h-9 w-[120px]">
          <Image src="/logo.png" alt="ForyNX" fill className="object-contain dark-hide" priority />
          <Image src="/logo_light.png" alt="ForyNX" fill className="object-contain light-hide" priority />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#problem" className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
            Problem
          </a>
          <a href="#solution" className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
            Solution
          </a>
          <a href="#pricing" className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
            Pricing
          </a>
          <a
            href="https://whatsapp.com/channel/0029Vb7qFH67Noa4TACE710k"
            target="_blank" rel="noopener noreferrer"
            className="text-sm transition-colors flex items-center gap-1.5"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#25D366")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="https://demoforynx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors border"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            Try demo
          </a>
          <a
            href="#contact"
            className="text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ background: "var(--accent)" }}
          >
            Book a call
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
          >
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
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
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
          <button className="transition-colors" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ borderColor: "var(--border)", background: "var(--bg-base)" }}>
          <a href="#problem" className="text-sm" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>Problem</a>
          <a href="#solution" className="text-sm" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>Solution</a>
          <a href="#pricing" className="text-sm" style={{ color: "var(--text-muted)" }} onClick={() => setOpen(false)}>Pricing</a>
          <a href="https://whatsapp.com/channel/0029Vb7qFH67Noa4TACE710k" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1.5" style={{ color: "#25D366" }}>WhatsApp Channel</a>
          <a href="https://demoforynx.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Try demo</a>
          <a href="#contact" className="text-sm font-medium" style={{ color: "var(--text-primary)" }} onClick={() => setOpen(false)}>Book a call</a>
        </div>
      )}
    </header>
  );
}
