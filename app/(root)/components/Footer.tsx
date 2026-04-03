"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t py-8" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#" className="relative h-7 w-24">
          <Image src="/logo.png" alt="ForyNX" fill className="object-contain dark-hide" />
          <Image src="/logo_light.png" alt="ForyNX" fill className="object-contain light-hide" />
        </a>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} ForyNX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
