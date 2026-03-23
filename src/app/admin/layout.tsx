"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  Tag,
  LogOut,
  ShoppingBag,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/sellers", label: "Sellers", icon: Store },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#0a0a0a",
        borderRight: "1px solid #222",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "24px 20px",
          borderBottom: "1px solid #222",
          color: "#fff",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "2px",
        }}
      >
        <ShoppingBag size={20} />
        <span>KREVO</span>
        <span
          style={{
            fontSize: "9px",
            background: "#fff",
            color: "#000",
            padding: "2px 6px",
            borderRadius: "3px",
            letterSpacing: "1px",
            fontWeight: 800,
          }}
        >
          ADMIN
        </span>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                color: isActive ? "#fff" : "#888",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                background: isActive ? "#1e1e1e" : "transparent",
                border: isActive ? "1px solid #333" : "1px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          padding: "16px 24px",
          borderTop: "1px solid #222",
          background: "none",
          border: "none",
          borderTop: "1px solid #222",
          color: "#555",
          fontSize: "13px",
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#555";
        }}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9f9f9" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}