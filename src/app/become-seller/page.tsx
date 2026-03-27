"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, GalleryHorizontal, Loader2, Store } from "lucide-react";

type ImageType = {
  url: string;
  public_id: string;
};

export default function BecomeSeller() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [logo, setLogo] = useState<ImageType | null>(null);
  const [banner, setBanner] = useState<ImageType | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "krevoid");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method:"POST",
        body:formData
      }
    )

    const data = await res.json();
    return { url: data.secure_url, public_id: data.public_id };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUploading(true);

    let finalLogo = null;
    let finalBanner = null;

    if (logoFile) finalLogo = await uploadImage(logoFile);
    if (bannerFile) finalBanner = await uploadImage(bannerFile);

    const res = await fetch("/api/store/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, address, city, logo: finalLogo, banner: finalBanner }),
    });

    const data = await res.json();
    setUploading(false);

    if (res.ok) {
      if (data.token) {
        document.cookie = `token=${data.token}; path=/`;
      }
      window.location.href = "/seller";
    }
  };

  return (
    <>
      <style>{`
        .seller-wrapper {
          min-height: calc(100vh - 5rem);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          margin-top: 2.5rem;
        }

        .seller-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 48px 44px;
          width: 100%;
          max-width: 520px;
          box-shadow: 0 2px 24px rgba(0,0,0,0.07);
          border: 1px solid #e8e8e8;
        }

        .seller-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .seller-title {
          font-size: 26px;
          font-weight: 800;
          color: #111111;
          margin: 0 0 6px;
          letter-spacing: -0.5px;
        }

        .seller-subtitle {
          font-size: 14px;
          color: #888888;
          margin: 0;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 7px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          font-size: 14px;
          color: #111111;
          background: #fafafa;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .form-input::placeholder {
          color: #bbbbbb;
        }

        .form-input:focus {
          border-color: #111111;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(17,17,17,0.06);
        }

        .form-textarea {
          resize: vertical;
          min-height: 88px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .upload-section {
          margin-bottom: 18px;
        }

        .upload-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333333;
          margin-bottom: 7px;
        }

        .upload-box {
          border: 1.5px dashed #d4d4d4;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          background: #fafafa;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }

        .upload-box:hover {
          border-color: #111111;
          background: #f4f4f4;
        }

        .upload-box input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .upload-text {
          font-size: 13px;
          color: #888888;
          font-weight: 500;
          margin: 6px 0 0;
        }

        .upload-text strong {
          color: #111111;
        }

        .preview-logo {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
          margin-top: 12px;
          border: 1.5px solid #e8e8e8;
          display: block;
        }

        .preview-banner {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 10px;
          margin-top: 12px;
          border: 1.5px solid #e8e8e8;
          display: block;
        }

        .divider {
          border: none;
          border-top: 1px solid #eeeeee;
          margin: 24px 0;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #111111;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #222222;
        }

        .submit-btn:active:not(:disabled) {
          transform: scale(0.99);
        }

        .submit-btn:disabled {
          background: #888888;
          cursor: not-allowed;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="seller-wrapper">
        <div className="seller-card">
          <div className="seller-header">
            <h1 className="seller-title">
              Buat Toko di <span>KREVO.ID</span>
            </h1>
            <p className="seller-subtitle">Lengkapi informasi toko Anda untuk memulai berjualan</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nama Toko</label>
              <input
                className="form-input"
                placeholder="Masukkan nama toko"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Deskripsi Toko</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Ceritakan tentang toko Anda..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Alamat</label>
                <input
                  className="form-input"
                  placeholder="Jl. Contoh No. 1"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Kota</label>
                <input
                  className="form-input"
                  placeholder="Jakarta"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <hr className="divider" />

            <div className="upload-section">
              <label className="upload-label">Logo Toko</label>
              <div className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setLogoFile(file);
                    setLogo({ url: URL.createObjectURL(file), public_id: "" });
                  }}
                />
                <ImageIcon size={24} color="#aaaaaa" style={{ margin: "0 auto 6px" }} />
                <p className="upload-text">
                  <strong>Klik untuk upload</strong> logo toko
                </p>
              </div>
              {logo && <img src={logo.url} className="preview-logo" alt="Logo preview" />}
            </div>

            <div className="upload-section">
              <label className="upload-label">Banner Toko</label>
              <div className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setBannerFile(file);
                    setBanner({ url: URL.createObjectURL(file), public_id: "" });
                  }}
                />
                <GalleryHorizontal size={24} color="#aaaaaa" style={{ margin: "0 auto 6px" }} />
                <p className="upload-text">
                  <strong>Klik untuk upload</strong> banner toko
                </p>
              </div>
              {banner && <img src={banner.url} className="preview-banner" alt="Banner preview" />}
            </div>

            <hr className="divider" />

            <button type="submit" className="submit-btn" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 0.7s linear infinite" }} />
                  Membuat toko...
                </>
              ) : (
                <>
                  <Store size={16} />
                  Buat Toko Sekarang
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}