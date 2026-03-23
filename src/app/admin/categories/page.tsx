"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tag, Plus, Pencil, Trash2, Loader2, ImageIcon } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: { url: string; public_id: string };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <Tag size={20} color="#000" />
            <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#0a0a0a" }}>
              Categories
            </h1>
          </div>
          <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
            Manage product categories for sellers.
          </p>
        </div>

        <Link
          href="/admin/categories/add"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 18px",
            background: "#0a0a0a",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          <Plus size={15} />
          Add Category
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", gap: "8px", color: "#aaa" }}>
          <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
          <span style={{ fontSize: "13px" }}>Loading categories...</span>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : categories.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e8e8e8",
            borderRadius: "12px",
            padding: "60px",
            textAlign: "center",
            color: "#bbb",
          }}
        >
          <Tag size={32} color="#ddd" style={{ marginBottom: "12px" }} />
          <p style={{ fontSize: "14px", margin: "0 0 16px" }}>No categories yet.</p>
          <Link
            href="/admin/categories/add"
            style={{
              padding: "8px 16px",
              background: "#0a0a0a",
              color: "#fff",
              borderRadius: "7px",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Add First Category
          </Link>
        </div>
      ) : (
        <>
          {/* Count */}
          <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "14px", fontWeight: 500 }}>
            {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
          </p>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "14px",
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat._id}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ height: "120px", background: "#f5f5f5", overflow: "hidden", position: "relative" }}>
                  {cat.image?.url ? (
                    <img
                      src={cat.image.url}
                      alt={cat.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                      <ImageIcon size={28} color="#ddd" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a" }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#bbb" }}>/{cat.slug}</div>
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "12px 14px",
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <Link
                    href={`/admin/categories/edit/${cat._id}`}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      padding: "7px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "7px",
                      background: "#fff",
                      color: "#333",
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    <Pencil size={12} />
                    Edit
                  </Link>
                  <button
                    onClick={() => setConfirmId(cat._id)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      padding: "7px",
                      border: "1px solid #fecaca",
                      borderRadius: "7px",
                      background: "#fff5f5",
                      color: "#dc2626",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Confirm Modal */}
      {confirmId && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setConfirmId(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "28px",
              width: "360px",
              maxWidth: "90vw",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Trash2 size={15} color="#dc2626" />
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>Delete Category?</h3>
            </div>
            <p style={{ fontSize: "13px", color: "#666", margin: "0 0 20px", lineHeight: "1.6" }}>
              This will permanently delete the category and its image from Cloudinary.
            </p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setConfirmId(null)}
                style={{
                  padding: "8px 18px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "7px",
                  background: "#fff",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deletingId === confirmId}
                style={{
                  padding: "8px 18px",
                  border: "none",
                  borderRadius: "7px",
                  background: "#dc2626",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {deletingId === confirmId ? (
                  <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Trash2 size={13} />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}