"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const navItems = [
  {
    href: "/seller",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    href: "/seller/products",
    label: "Products",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    href: "/seller/products/add",
    label: "Add Product",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    href: "/seller/store-settings",
    label: "Store Settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
]

interface SidebarProps {
  onLogout: () => void
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ onLogout, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  // Tutup sidebar saat navigasi (mobile)
  useEffect(() => {
    onClose()
  }, [pathname])

  // Kunci scroll body saat drawer terbuka di mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay — hanya muncul di mobile saat drawer terbuka */}
      {isOpen && (
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
        style={{
          width: "240px",
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          flexShrink: 0,
          zIndex: 50,
        }}
        className={`seller-sidebar ${isOpen ? "sidebar-open" : ""}`}
      >
        {/* Logo area */}
        <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid #1e1e1e" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px", height: "32px",
                background: "#ffffff", borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#ffffff", letterSpacing: "-0.01em" }}>
                  Krevo
                </p>
                <p style={{ margin: 0, fontSize: "11px", color: "#666", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Seller
                </p>
              </div>
            </div>

            {/* Tombol tutup — hanya di mobile */}
            <button
              onClick={onClose}
              className="sidebar-close-btn"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: "#666",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          <p style={{
            fontSize: "10px", color: "#444",
            letterSpacing: "0.08em", textTransform: "uppercase",
            margin: "0 12px 8px", fontWeight: "600",
          }}>
            Menu
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/seller"
                  ? pathname === "/seller"
                  : pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: isActive ? "500" : "400",
                    color: isActive ? "#ffffff" : "#888",
                    background: isActive ? "#1e1e1e" : "transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <span style={{
                      marginLeft: "auto",
                      width: "4px", height: "4px",
                      borderRadius: "50%",
                      background: "#ffffff",
                    }} />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 12px 24px" }}>
          <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "16px" }}>
            <button
              onClick={onLogout}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #2a2a2a",
                background: "transparent",
                color: "#888",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#1e1e1e"
                e.currentTarget.style.color = "#ff6b6b"
                e.currentTarget.style.borderColor = "#3a2020"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "#888"
                e.currentTarget.style.borderColor = "#2a2a2a"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .seller-sidebar {
            position: fixed !important;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.25s ease;
          }
          .seller-sidebar.sidebar-open {
            transform: translateX(0);
          }
          .mobile-overlay {
            display: block !important;
          }
          .sidebar-close-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}