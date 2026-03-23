"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  Tag,
  LogOut,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/sellers", label: "Sellers", icon: Store },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  // Tutup sidebar saat navigasi (mobile)
  useEffect(() => {
    onClose();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
            display: "none",
          }}
          className="mobile-overlay"
        />
      )}

      <aside
        className="admin-sidebar"
        style={{
          width: "220px",
          background: "#0a0a0a",
          borderRight: "1px solid #222",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 50,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            padding: "20px 16px",
            borderBottom: "1px solid #222",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
            <ShoppingBag size={18} color="#fff" />
            <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700, letterSpacing: "2px" }}>
              KREVO
            </span>
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

          {/* Close button — hanya muncul di mobile */}
          <button
            onClick={onClose}
            className="close-btn"
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              padding: "4px",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            overflowY: "auto",
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
    </>
  );
}

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  const currentPage = navItems.find((item) =>
    item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
  );

  return (
    <header
      className="mobile-topbar"
      style={{
        display: "none",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        background: "#0a0a0a",
        borderBottom: "1px solid #222",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <button
        onClick={onMenuClick}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu size={20} />
      </button>

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "6px" }}>
        <ShoppingBag size={16} color="#fff" />
        <span style={{ color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px" }}>
          KREVO
        </span>
        <span
          style={{
            fontSize: "8px",
            background: "#fff",
            color: "#000",
            padding: "1px 5px",
            borderRadius: "3px",
            letterSpacing: "1px",
            fontWeight: 800,
          }}
        >
          ADMIN
        </span>
      </div>

      {currentPage && (
        <span style={{ fontSize: "12px", color: "#666", marginLeft: "4px" }}>
          / {currentPage.label}
        </span>
      )}
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9f9f9" }}>
      <style>{`
        /* Desktop: sidebar selalu tampil */
        @media (min-width: 768px) {
          .admin-sidebar {
            position: sticky !important;
            transform: translateX(0) !important;
            flex-shrink: 0;
          }
          .mobile-topbar {
            display: none !important;
          }
          .mobile-overlay {
            display: none !important;
          }
          .close-btn {
            display: none !important;
          }
        }

        /* Mobile: sidebar hidden by default, topbar tampil */
        @media (max-width: 767px) {
          .admin-sidebar {
            position: fixed !important;
          }
          .mobile-topbar {
            display: flex !important;
          }
          .mobile-overlay {
            display: block !important;
          }
          .close-btn {
            display: flex !important;
          }
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
          className="mobile-overlay"
        />
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile top bar */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main style={{ flex: 1, padding: "24px 16px" }} className="admin-main">
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .admin-main {
            padding: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}