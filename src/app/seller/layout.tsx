"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/DashboardSeller/Sidebar"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00"
    router.push("/login")
  }

  return (
    <>
      <style>{`
        .seller-layout * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>

      <div
        className="seller-layout"
        style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}
      >
        <Sidebar
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

          {/* Mobile topbar */}
          <header
            className="mobile-topbar"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              background: "#ffffff",
              borderBottom: "1px solid #ebebeb",
              position: "sticky",
              top: 0,
              zIndex: 30,
            }}
          >
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px",
                background: "none", border: "none",
                cursor: "pointer", borderRadius: "8px",
                color: "#0a0a0a",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            {/* Logo tengah */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "26px", height: "26px",
                background: "#0a0a0a", borderRadius: "6px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>Krevo Seller</span>
            </div>

            {/* Spacer kanan biar logo tetap di tengah */}
            <div style={{ width: "36px" }} />
          </header>

          <main style={{ flex: 1, padding: "40px", background: "#f9f9f9" }}
            className="seller-main"
          >
            {children}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-topbar {
            display: flex !important;
          }
          .seller-main {
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </>
  )
}