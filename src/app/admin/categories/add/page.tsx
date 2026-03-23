"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, ImageIcon, Loader2, CheckCircle2 } from "lucide-react";

type ImageType = {
  url: string;
  public_id: string;
};

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState<ImageType | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const uploadImage = async (file: File): Promise<ImageType> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "krevoid");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return { url: data.secure_url, public_id: data.public_id };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    if (!imageFile) {
      setError("Please select an image.");
      return;
    }

    setUploading(true);
    try {
      const uploadedImage = await uploadImage(imageFile);

      const res = await fetch("/api/categories/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), image: uploadedImage }),
      });

      if (!res.ok) throw new Error("Failed to create");

      setSuccess(true);
      setTimeout(() => router.push("/admin/categories"), 1200);
    } catch {
      setError("Failed to create category. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "520px" }}>
      {/* Back */}
      <Link
        href="/admin/categories"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#888",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "24px",
          fontWeight: 500,
        }}
      >
        <ArrowLeft size={14} />
        Back to Categories
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <Tag size={20} color="#000" />
        <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#0a0a0a" }}>
          Add Category
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #e8e8e8",
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Name */}
          <div>
            <label
              style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "8px", letterSpacing: "0.3px" }}
            >
              CATEGORY NAME
            </label>
            <input
              type="text"
              placeholder="e.g. Electronics, Fashion..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                color: "#0a0a0a",
              }}
            />
            {name.trim() && (
              <div style={{ marginTop: "6px", fontSize: "11px", color: "#aaa" }}>
                slug: <span style={{ color: "#666" }}>{name.toLowerCase().trim().replace(/\s+/g, "-")}</span>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label
              style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#444", marginBottom: "8px", letterSpacing: "0.3px" }}
            >
              CATEGORY IMAGE
            </label>

            <label
              htmlFor="imageInput"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                height: "180px",
                border: "2px dashed #e0e0e0",
                borderRadius: "10px",
                cursor: "pointer",
                overflow: "hidden",
                background: preview ? "#000" : "#fafafa",
                position: "relative",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                />
              ) : (
                <>
                  <ImageIcon size={28} color="#ccc" />
                  <span style={{ fontSize: "13px", color: "#bbb" }}>Click to upload image</span>
                  <span style={{ fontSize: "11px", color: "#ddd" }}>PNG, JPG up to 5MB</span>
                </>
              )}
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setImageFile(null);
                  setImage(null);
                }}
                style={{
                  marginTop: "8px",
                  padding: "4px 12px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  background: "#fff",
                  fontSize: "11px",
                  color: "#666",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Remove image
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ fontSize: "13px", color: "#dc2626", background: "#fef2f2", padding: "10px 14px", borderRadius: "7px", border: "1px solid #fecaca" }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || success}
            style={{
              padding: "12px",
              background: success ? "#16a34a" : "#0a0a0a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: uploading || success ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
          >
            {uploading ? (
              <>
                <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                Uploading...
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={15} />
                Created! Redirecting...
              </>
            ) : (
              "Add Category"
            )}
          </button>
        </div>
      </form>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}