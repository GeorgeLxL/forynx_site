"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "inbox_last_seen";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/admin/inbox", label: "Contact Inbox", icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" },
  { href: "/admin/gmail/in", label: "Gmail Inbox", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { href: "/admin/gmail/out", label: "Gmail Outbox", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" },
  { href: "/admin/gmail/out/compose", label: "Compose", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { href: "/admin/gmail/out/template", label: "Templates", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function checkNew() {
      try {
        const data = await fetch("/api/inbox").then(r => r.json());
        if (!Array.isArray(data)) return;
        const total = data.length;
        const lastSeen = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
        setNewCount(Math.max(0, total - lastSeen));
      } catch {}
    }
    checkNew();
    const interval = setInterval(checkNew, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Clear badge when visiting inbox
  useEffect(() => {
    if (pathname === "/admin/inbox") {
      fetch("/api/inbox").then(r => r.json()).then(data => {
        if (Array.isArray(data)) {
          localStorage.setItem(STORAGE_KEY, String(data.length));
          setNewCount(0);
        }
      });
    }
  }, [pathname]);

  async function signOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/admin/signin");
  }

  return (
    <aside
      className="flex flex-col border-r transition-all duration-200 shrink-0"
      style={{ width: collapsed ? 56 : 220, background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="h-16 flex items-center justify-between px-3 border-b" style={{ borderColor: "var(--border)" }}>
        {!collapsed && <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>ForyNX Admin</span>}
        <button onClick={() => setCollapsed(c => !c)} className="ml-auto p-1 rounded" style={{ color: "var(--text-muted)" }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 py-3 flex flex-col gap-1 px-2 overflow-hidden">
        {nav.map(item => {
          const active = pathname === item.href;
          const isInbox = item.href === "/admin/inbox";
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors"
              style={{
                background: active ? "color-mix(in srgb, var(--accent) 15%, transparent)" : "transparent",
                color: active ? "var(--accent)" : "var(--text-muted)",
              }}>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {!collapsed && (
                <span className="truncate flex-1">{item.label}</span>
              )}
              {isInbox && newCount > 0 && (
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white shrink-0"
                  style={{ background: "#ef4444", fontSize: "10px" }}>
                  {newCount > 99 ? "99+" : newCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t flex flex-col gap-1" style={{ borderColor: "var(--border)" }}>
        <Link href="/"
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors"
          style={{ color: "var(--text-muted)" }}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {!collapsed && <span>View Site</span>}
        </Link>
        <button onClick={signOut}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors"
          style={{ color: "var(--text-muted)" }}>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
