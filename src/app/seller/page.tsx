"use client"

import { useEffect, useState } from "react"

interface Store {
  _id: string
  name: string
  slug: string
  description: string
  logo: { url: string; public_id: string }
  banner: { url: string; public_id: string }
  address: string
  city: string
  storeStatus: "active" | "inactive" | "banned"
  createdAt: string
  owner: string
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #ebebeb",
      borderRadius: "12px",
      padding: "16px 20px",
      display: "flex",
      alignItems: "flex-start",
      gap: "14px",
    }}>
      <div style={{
        width: "38px", height: "38px",
        background: "#f5f5f5",
        borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "11px", color: "#aaa", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: "600" }}>
          {label}
        </p>
        <p style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: "600", color: "#0a0a0a", letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </p>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "12px 0",
      borderBottom: "1px solid #f5f5f5",
      gap: "12px",
    }}>
      <span style={{ fontSize: "13px", color: "#aaa", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: "13px", color: "#0a0a0a", fontWeight: "500", textAlign: "right", wordBreak: "break-word" }}>{value}</span>
    </div>
  )
}

export default function SellerDashboard() {
  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [productCount, setProductCount] = useState<number>(0)

  useEffect(() => {
    fetch("/api/store/my")
      .then(res => res.json())
      .then(data => { setStore(data); setLoading(false) })
      .catch(() => setLoading(false))

    fetch("/api/products/my")
      .then(res => res.json())
      .then(data => setProductCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {})
  }, [])

  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "300px", color: "#aaa", fontSize: "14px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        Memuat data toko...
      </div>
    )
  }

  if (!store) {
    return (
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#ffffff", borderRadius: "12px",
        border: "1px solid #ebebeb", padding: "60px", textAlign: "center",
      }}>
        <p style={{ color: "#aaa", fontSize: "14px" }}>Gagal memuat data toko.</p>
      </div>
    )
  }

  const joinedDate = new Date(store.createdAt).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  })

  const isActive = store.storeStatus === "active"

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "600", color: "#0a0a0a", letterSpacing: "-0.02em" }}>
          Dashboard
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#888" }}>
          Selamat datang kembali, ringkasan toko Anda
        </p>
      </div>

      {/* Banner */}
      {store.banner?.url && (
        <div style={{
          width: "100%", borderRadius: "12px", overflow: "hidden",
          marginBottom: "20px", border: "1px solid #ebebeb",
          position: "relative", aspectRatio: "16/5",
        }}>
          <img src={store.banner.url} alt="Banner toko" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", bottom: "16px", left: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            {store.logo?.url && (
              <img src={store.logo.url} alt="Logo" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
            )}
            <div>
              <p style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#fff", letterSpacing: "-0.01em" }}>
                {store.name}
              </p>
              <p style={{ margin: "1px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
                /{store.slug}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stat cards — 3 kolom di desktop, 1 baris scroll di mobile */}
      <div className="stat-grid" style={{ marginBottom: "20px" }}>
        <StatCard
          label="Total Produk"
          value={productCount}
          icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>}
        />
        <StatCard
          label="Kota"
          value={store.city}
          icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
        />
        <StatCard
          label="Status Toko"
          value={isActive ? "Aktif" : store.storeStatus}
          icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#22c55e" : "#aaa"} strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
        />
      </div>

      {/* Bottom grid — 2 kolom di desktop, 1 kolom di mobile */}
      <div className="info-grid">

        {/* Info toko */}
        <div style={{ background: "#ffffff", border: "1px solid #ebebeb", borderRadius: "12px", padding: "20px 24px" }}>
          <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>Informasi Toko</p>
          <p style={{ margin: "0 0 14px", fontSize: "12px", color: "#aaa" }}>Detail data toko Anda</p>
          <InfoRow label="Nama Toko" value={store.name} />
          <InfoRow label="Slug" value={`/${store.slug}`} />
          <InfoRow label="Alamat" value={store.address} />
          <InfoRow label="Kota" value={store.city} />
          <InfoRow label="Bergabung" value={joinedDate} />
          <div style={{ padding: "12px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#aaa" }}>Status</span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "500",
              background: isActive ? "#f0fdf4" : "#fafafa",
              color: isActive ? "#16a34a" : "#888",
              border: `1px solid ${isActive ? "#bbf7d0" : "#e5e5e5"}`,
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isActive ? "#22c55e" : "#ccc" }} />
              {isActive ? "Aktif" : store.storeStatus}
            </span>
          </div>
        </div>

        {/* Deskripsi + Aksi cepat */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <div style={{ background: "#ffffff", border: "1px solid #ebebeb", borderRadius: "12px", padding: "20px 24px", flex: 1 }}>
            <p style={{ margin: "0 0 10px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>Deskripsi Toko</p>
            <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: "1.7" }}>
              {store.description || "Belum ada deskripsi."}
            </p>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #ebebeb", borderRadius: "12px", padding: "20px 24px" }}>
            <p style={{ margin: "0 0 14px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>Aksi Cepat</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { href: "/seller/products/add", label: "Tambah Produk Baru", icon: "+" },
                { href: "/seller/products", label: "Lihat Semua Produk", icon: "→" },
                { href: "/seller/store-settings", label: "Edit Pengaturan Toko", icon: "✎" },
              ].map(action => (
                <a
                  key={action.href}
                  href={action.href}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px", borderRadius: "8px", border: "1px solid #f0f0f0",
                    textDecoration: "none", fontSize: "13px", fontWeight: "500", color: "#333",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#0a0a0a"
                    e.currentTarget.style.color = "#fff"
                    e.currentTarget.style.borderColor = "#0a0a0a"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.color = "#333"
                    e.currentTarget.style.borderColor = "#f0f0f0"
                  }}
                >
                  {action.label}
                  <span style={{ fontSize: "16px", fontWeight: "400" }}>{action.icon}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .stat-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

    </div>
  )
}