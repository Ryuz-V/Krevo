"use client"

import { useEffect, useState } from "react"

type ImageType = {
  url: string
  public_id: string
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  fontSize: "14px",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  outline: "none",
  background: "#fff",
  color: "#0a0a0a",
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: "border-box",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: "500",
  color: "#444",
  marginBottom: "6px",
}

const sectionStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #ebebeb",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "16px",
}

export default function StoreSettings() {
  const [store, setStore] = useState<any>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [logo, setLogo] = useState<ImageType | null>(null)
  const [banner, setBanner] = useState<ImageType | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/store/my")
      .then(res => res.json())
      .then(data => {
        setStore(data)
        setName(data.name || "")
        setDescription(data.description || "")
        setLogo(data.logo || null)
        setBanner(data.banner || null)
      })
  }, [])

  const uploadImage = async (file: File): Promise<ImageType> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "krevoid")
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      { method: "POST", body: formData }
    )
    const data = await res.json()
    return { url: data.secure_url, public_id: data.public_id }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setSaved(false)

    try {
      let finalLogo = logo
      let finalBanner = banner

      if (logoFile) finalLogo = await uploadImage(logoFile)
      if (bannerFile) finalBanner = await uploadImage(bannerFile)

      const res = await fetch("/api/store/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, logo: finalLogo, banner: finalBanner }),
      })

      if (!res.ok) {
        alert("Gagal menyimpan pengaturan")
        setUploading(false)
        return
      }

      const updated = await res.json()
      setStore(updated)
      setLogoFile(null)
      setBannerFile(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)

    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan")
    }

    setUploading(false)
  }

  if (!store) {
    return (
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "300px", color: "#aaa", fontSize: "14px",
      }}>
        Memuat pengaturan toko...
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: "720px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#0a0a0a", letterSpacing: "-0.02em" }}>
          Store Settings
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#888" }}>
          Kelola informasi dan tampilan toko Anda
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Info toko */}
        <div style={sectionStyle}>
          <p style={{ margin: "0 0 18px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>
            Informasi Toko
          </p>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Nama Toko</label>
            <input
              style={inputStyle}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nama toko Anda"
              required
              onFocus={e => (e.currentTarget.style.borderColor = "#0a0a0a")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          <div>
            <label style={labelStyle}>Deskripsi</label>
            <textarea
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ceritakan tentang toko Anda..."
              onFocus={e => (e.currentTarget.style.borderColor = "#0a0a0a")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>
        </div>

        {/* Logo */}
        <div style={sectionStyle}>
          <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>
            Logo Toko
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#aaa" }}>
            Tampil di sidebar dan halaman toko — disarankan ukuran persegi
          </p>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            {/* Preview */}
            <div style={{
              width: "80px", height: "80px",
              borderRadius: "12px",
              border: `2px dashed ${logoFile ? "#0a0a0a" : "#e0e0e0"}`,
              overflow: "hidden", flexShrink: 0,
              background: "#f9f9f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.15s ease",
            }}>
              {logo?.url ? (
                <img src={logoFile ? URL.createObjectURL(logoFile) : logo.url} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>

            <div>
              <label style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "9px 16px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "13px", fontWeight: "500", color: "#333",
                cursor: "pointer",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {logoFile ? "Ganti Logo" : "Upload Logo"}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setLogoFile(file)
                    setLogo({ url: URL.createObjectURL(file), public_id: "" })
                  }}
                />
              </label>
              {logoFile ? (
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#22c55e" }}>✓ {logoFile.name}</p>
              ) : (
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#aaa" }}>Format: JPG, PNG, WEBP</p>
              )}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={sectionStyle}>
          <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>
            Banner Toko
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#aaa" }}>
            Tampil di bagian atas dashboard dan halaman toko — disarankan ukuran 1737×532px (rasio 16:5)
          </p>

          {/* Banner preview */}
          <div style={{
            width: "100%", height: "120px",
            borderRadius: "10px",
            border: `2px dashed ${bannerFile ? "#0a0a0a" : "#e0e0e0"}`,
            overflow: "hidden",
            background: "#f9f9f9",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "12px",
            transition: "border-color 0.15s ease",
            position: "relative",
          }}>
            {banner?.url ? (
              <>
                <img
                  src={bannerFile ? URL.createObjectURL(bannerFile) : banner.url}
                  alt="banner"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {bannerFile && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "12px", color: "#fff", fontWeight: "500" }}>Preview baru</span>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ margin: "0 auto 6px", display: "block" }}>
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <p style={{ margin: 0, fontSize: "12px", color: "#bbb" }}>Belum ada banner</p>
              </div>
            )}
          </div>

          <label style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "9px 16px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            fontSize: "13px", fontWeight: "500", color: "#333",
            cursor: "pointer",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            {bannerFile ? "Ganti Banner" : "Upload Banner"}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={e => {
                const file = e.target.files?.[0]
                if (!file) return
                setBannerFile(file)
                setBanner({ url: URL.createObjectURL(file), public_id: "" })
              }}
            />
          </label>
          {bannerFile && (
            <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#22c55e" }}>✓ {bannerFile.name}</p>
          )}
        </div>

        {/* Submit */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="submit"
            disabled={uploading}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "11px 24px",
              background: uploading ? "#888" : "#0a0a0a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px", fontWeight: "500",
              cursor: uploading ? "not-allowed" : "pointer",
            }}
          >
            {uploading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Simpan Perubahan
              </>
            )}
          </button>

          {/* Success toast */}
          {saved && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "8px 14px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "8px",
              fontSize: "13px", color: "#16a34a", fontWeight: "500",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Tersimpan
            </div>
          )}
        </div>

      </form>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  )
}