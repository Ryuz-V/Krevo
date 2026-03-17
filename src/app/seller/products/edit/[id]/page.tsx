"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

type ImageType = {
  url: string
  public_id: string
}

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

export default function EditProduct() {
  const { id } = useParams()
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<Category[]>([])

  // Foto yang tersimpan di DB (object {url, public_id})
  const [mainImage, setMainImage] = useState<ImageType | null>(null)
  const [galleryImages, setGalleryImages] = useState<(ImageType | null)[]>([null, null, null])

  // File baru yang dipilih user (belum diupload)
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([null, null, null])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [productRes, catRes] = await Promise.all([
        fetch(`/api/products/${id}`),
        fetch("/api/categories"),
      ])
      const product = await productRes.json()
      const cats = await catRes.json()

      setName(product.name || "")
      setDescription(product.description || "")
      setPrice(String(product.price || ""))
      setCategoryId(product.categoryId?._id || product.categoryId || "")
      setMainImage(product.mainImage || null)

      const gallery = product.galleryImages || []
      setGalleryImages([
        gallery[0] || null,
        gallery[1] || null,
        gallery[2] || null,
      ])
      setCategories(cats)
      setLoading(false)
    }
    load()
  }, [id])

  // Upload satu file ke Cloudinary
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
    setSaving(true)

    try {
      let finalMainImage = mainImage
      // public_id lama yang perlu dihapus — dikumpulkan lalu dikirim ke server
      let oldMainImagePublicId: string | null = null
      const oldGalleryPublicIds: string[] = []

      // Proses main image
      if (mainImageFile) {
        // Catat public_id lama untuk dihapus di server
        if (mainImage?.public_id) oldMainImagePublicId = mainImage.public_id
        finalMainImage = await uploadImage(mainImageFile)
      }

      // Proses gallery
      const finalGallery = [...galleryImages]
      for (let i = 0; i < 3; i++) {
        if (galleryFiles[i]) {
          if (galleryImages[i]?.public_id) {
            oldGalleryPublicIds.push(galleryImages[i]!.public_id)
          }
          finalGallery[i] = await uploadImage(galleryFiles[i]!)
        }
      }

      const cleanGallery = finalGallery.filter(Boolean)

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          categoryId,
          mainImage: finalMainImage,
          galleryImages: cleanGallery,
          // Kirim ke server untuk dihapus dari Cloudinary
          oldMainImagePublicId,
          oldGalleryPublicIds,
        }),
      })

      if (!res.ok) {
        alert("Gagal menyimpan produk")
        setSaving(false)
        return
      }

      router.push("/seller/products")

    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan")
      setSaving(false)
    }
  }

  const getMainPreview = () => {
    if (mainImageFile) return URL.createObjectURL(mainImageFile)
    return mainImage?.url || null
  }

  const getGalleryPreview = (i: number) => {
    if (galleryFiles[i]) return URL.createObjectURL(galleryFiles[i]!)
    return galleryImages[i]?.url || null
  }

  if (loading) {
    return (
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "300px", color: "#aaa", fontSize: "14px",
      }}>
        Memuat produk...
      </div>
    )
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
          Edit Produk
        </h1>
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
            Foto Utama
          </p>
          <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#aaa" }}>
            Pilih foto baru
          </p>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            {/* Preview */}
            <div style={{
              width: "100px", height: "100px",
              borderRadius: "10px",
              border: `2px solid ${mainImageFile ? "#22c55e" : "#ebebeb"}`,
              overflow: "hidden", flexShrink: 0,
              background: "#f5f5f5",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.15s ease",
            }}>
              {getMainPreview() ? (
                <img src={getMainPreview()!} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                {mainImageFile ? "Ganti Lagi" : "Pilih Foto Baru"}
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
                  ✓ {mainImageFile.name} — akan mengganti foto lama
                </p>
              ) : (
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#aaa" }}>
                  Foto saat
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
                  border: `2px solid ${galleryFiles[i] ? "#22c55e" : "#ebebeb"}`,
                  overflow: "hidden",
                  background: "#f5f5f5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "8px",
                  position: "relative",
                  transition: "border-color 0.15s ease",
                }}>
                  {getGalleryPreview(i) ? (
                    <img
                      src={getGalleryPreview(i)!}
                      alt={`gallery ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  )}
                  {galleryFiles[i] && (
                    <div style={{
                      position: "absolute", top: "6px", right: "6px",
                      background: "#22c55e", borderRadius: "50%",
                      width: "20px", height: "20px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
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
                  {galleryImages[i] ? "Ganti" : "Tambah"}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const newFiles = [...galleryFiles]
                      newFiles[i] = file
                      setGalleryFiles(newFiles)
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
            disabled={saving}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "11px 24px",
              background: saving ? "#888" : "#0a0a0a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px", fontWeight: "500",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? (
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