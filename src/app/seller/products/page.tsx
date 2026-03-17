"use client"

import { useEffect, useState } from "react"

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price)
}

export default function SellerProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadProducts = () => {
    setLoading(true)
    fetch("/api/products/my")
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { loadProducts() }, [])

  const deleteProduct = async (id: string) => {
    const confirmDelete = confirm("Hapus produk ini? Tindakan ini tidak bisa dibatalkan.")
    if (!confirmDelete) return
    setDeletingId(id)
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    setDeletingId(null)
    loadProducts()
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", gap: "12px" }}>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "600", color: "#0a0a0a", letterSpacing: "-0.02em" }}>
            My Products
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#888" }}>
            {loading ? "Memuat..." : `${products.length} produk terdaftar`}
          </p>
        </div>

        <a
          href="/seller/products/add"
          style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "10px 16px",
            background: "#0a0a0a", color: "#ffffff",
            borderRadius: "8px", textDecoration: "none",
            fontSize: "13px", fontWeight: "500",
            flexShrink: 0, whiteSpace: "nowrap",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span className="btn-label">Add Product</span>
        </a>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ebebeb", padding: "60px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
          Memuat produk...
        </div>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ebebeb", padding: "60px 24px", textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", background: "#f0f0f0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "500", color: "#333" }}>Belum ada produk</p>
          <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#aaa" }}>Tambahkan produk pertama Anda sekarang</p>
          <a href="/seller/products/add" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", background: "#0a0a0a", color: "#fff", borderRadius: "7px", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}>
            Tambah Produk
          </a>
        </div>
      )}

      {/* Desktop table */}
      {!loading && products.length > 0 && (
        <>
          {/* TABLE — desktop only */}
          <div className="product-table-wrap" style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ebebeb", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                  {["Produk", "Harga", "Aksi"].map(col => (
                    <th key={col} style={{ padding: "14px 20px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#aaa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr
                    key={product._id}
                    style={{ borderBottom: i < products.length - 1 ? "1px solid #f5f5f5" : "none", transition: "background 0.1s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "8px", overflow: "hidden", border: "1px solid #f0f0f0", flexShrink: 0 }}>
                          <img src={product.mainImage?.url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#0a0a0a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {product.name}
                          </p>
                          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#aaa" }}>ID: {product._id?.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "14px", fontWeight: "500", color: "#0a0a0a", whiteSpace: "nowrap" }}>
                      {formatRupiah(product.price)}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <a
                          href={`/seller/products/edit/${product._id}`}
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 13px", border: "1px solid #e0e0e0", borderRadius: "7px", fontSize: "13px", fontWeight: "500", color: "#333", textDecoration: "none", transition: "all 0.15s ease" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0a0a0a" }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "#e0e0e0" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Edit
                        </a>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          disabled={deletingId === product._id}
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 13px", border: "1px solid #fce8e8", borderRadius: "7px", fontSize: "13px", fontWeight: "500", color: "#cc3333", background: "#fff5f5", cursor: deletingId === product._id ? "not-allowed" : "pointer", opacity: deletingId === product._id ? 0.6 : 1, transition: "all 0.15s ease" }}
                          onMouseEnter={e => { if (deletingId !== product._id) { e.currentTarget.style.background = "#cc3333"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#cc3333" } }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#fff5f5"; e.currentTarget.style.color = "#cc3333"; e.currentTarget.style.borderColor = "#fce8e8" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                          {deletingId === product._id ? "Menghapus..." : "Hapus"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARD LIST — mobile only */}
          <div className="product-card-list">
            {products.map((product, i) => (
              <div
                key={product._id}
                style={{
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: "12px",
                  padding: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: i < products.length - 1 ? "10px" : 0,
                }}
              >
                {/* Foto */}
                <div style={{ width: "56px", height: "56px", borderRadius: "8px", overflow: "hidden", border: "1px solid #f0f0f0", flexShrink: 0 }}>
                  <img src={product.mainImage?.url} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#0a0a0a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.name}
                  </p>
                  <p style={{ margin: "3px 0 0", fontSize: "13px", fontWeight: "500", color: "#0a0a0a" }}>
                    {formatRupiah(product.price)}
                  </p>
                </div>

                {/* Aksi */}
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <a
                    href={`/seller/products/edit/${product._id}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", border: "1px solid #e0e0e0", borderRadius: "7px", color: "#333", textDecoration: "none" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </a>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    disabled={deletingId === product._id}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", border: "1px solid #fce8e8", borderRadius: "7px", background: "#fff5f5", color: "#cc3333", cursor: deletingId === product._id ? "not-allowed" : "pointer", opacity: deletingId === product._id ? 0.6 : 1 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        .product-card-list { display: none; }

        @media (max-width: 768px) {
          .product-table-wrap { display: none; }
          .product-card-list { display: block; }
          .btn-label { display: none; }
        }
      `}</style>

    </div>
  )
}