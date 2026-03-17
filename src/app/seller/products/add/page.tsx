"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Category = {
  _id: string
  name: string
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

export default function AddProduct() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<Category[]>([])

  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([null, null, null])

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  const uploadImage = async (file: File) => {
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

    if (!mainImageFile) {
      alert("Foto utama wajib diisi")
      return
    }

    setUploading(true)

    try {
      const mainImage = await uploadImage(mainImageFile)

      const galleryImages = []
      for (const file of galleryFiles) {
        if (file) {
          const img = await uploadImage(file)
          galleryImages.push(img)
        }
      }

      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          mainImage,
          galleryImages,
          categoryId,
        }),
      })

      if (!res.ok) {
        alert("Gagal menambah produk")
        setUploading(false)
        return
      }

      router.push("/seller/products")

    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan")
      setUploading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: "720px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "13px", color: "#888", padding: 0, marginBottom: "12px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Kembali
        </button>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#0a0a0a", letterSpacing: "-0.02em" }}>
          Tambah Produk
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#888" }}>
          Isi informasi produk dan upload foto
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Info dasar */}
        <div style={sectionStyle}>
          <p style={{ margin: "0 0 18px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>
            Informasi Produk
          </p>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Nama Produk</label>
            <input
              style={inputStyle}
              placeholder="Contoh: Kemeja Batik Premium"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              onFocus={e => (e.currentTarget.style.borderColor = "#0a0a0a")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Deskripsi</label>
            <textarea
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              placeholder="Deskripsikan produk Anda..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              onFocus={e => (e.currentTarget.style.borderColor = "#0a0a0a")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Harga (Rp)</label>
              <input
                style={inputStyle}
                type="number"
                placeholder="245000"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                onFocus={e => (e.currentTarget.style.borderColor = "#0a0a0a")}
                onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
              />
            </div>
            <div>
              <label style={labelStyle}>Kategori</label>
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                required
                onFocus={e => (e.currentTarget.style.borderColor = "#0a0a0a")}
                onBlur={e => (e.currentTarget.style.borderColor = "#e5e5e5")}
              >
                <option value="">Pilih kategori</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main image */}
        <div style={sectionStyle}>
          <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>
            Foto Utama <span style={{ color: "#e53e3e" }}>*</span>
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#aaa" }}>
            Foto pertama yang tampil di halaman produk
          </p>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <div style={{
              width: "100px", height: "100px",
              borderRadius: "10px",
              border: `2px dashed ${mainImageFile ? "#0a0a0a" : "#e0e0e0"}`,
              overflow: "hidden", flexShrink: 0,
              background: "#f9f9f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.15s ease",
            }}>
              {mainImageFile ? (
                <img
                  src={URL.createObjectURL(mainImageFile)}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
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
                {mainImageFile ? "Ganti Foto" : "Pilih Foto"}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) setMainImageFile(file)
                  }}
                />
              </label>
              {mainImageFile ? (
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#22c55e" }}>
                  ✓ {mainImageFile.name}
                </p>
              ) : (
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#aaa" }}>
                  Format: JPG, PNG, WEBP
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div style={sectionStyle}>
          <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "600", color: "#0a0a0a" }}>
            Foto Galeri
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#aaa" }}>
            Maksimal 3 foto tambahan (opsional)
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {[0, 1, 2].map(i => (
              <div key={i}>
                <div style={{
                  width: "100%", aspectRatio: "1",
                  borderRadius: "10px",
                  border: `2px dashed ${galleryFiles[i] ? "#0a0a0a" : "#e0e0e0"}`,
                  overflow: "hidden",
                  background: "#f9f9f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "8px",
                  position: "relative",
                  transition: "border-color 0.15s ease",
                }}>
                  {galleryFiles[i] ? (
                    <>
                      <img
                        src={URL.createObjectURL(galleryFiles[i]!)}
                        alt={`gallery ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...galleryFiles]
                          updated[i] = null
                          setGalleryFiles(updated)
                        }}
                        style={{
                          position: "absolute", top: "6px", right: "6px",
                          width: "22px", height: "22px",
                          background: "rgba(0,0,0,0.6)",
                          border: "none", borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  )}
                </div>

                <label style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  padding: "7px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "7px",
                  fontSize: "12px", fontWeight: "500", color: "#555",
                  cursor: "pointer", width: "100%",
                  boxSizing: "border-box",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  {galleryFiles[i] ? "Ganti" : "Tambah"}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const updated = [...galleryFiles]
                      updated[i] = file
                      setGalleryFiles(updated)
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", gap: "12px" }}>
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
                Mengupload...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Tambah Produk
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            style={{
              padding: "11px 20px",
              background: "transparent",
              color: "#666",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px", fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Batal
          </button>
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