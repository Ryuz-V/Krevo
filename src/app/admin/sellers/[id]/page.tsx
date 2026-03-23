"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Store,
  Package,
  MapPin,
  Mail,
  User,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ImageIcon,
} from "lucide-react";

interface SellerDetail {
  seller: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  store: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    city: string;
    address: string;
    storeStatus: string;
    createdAt: string;
    logo?: { url: string };
    banner?: { url: string };
  } | null;
  products: {
    _id: string;
    name: string;
    price: number;
    mainImage?: { url: string };
    createdAt: string;
  }[];
}

export default function AdminSellerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<SellerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [suspendLoading, setSuspendLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/admin/sellers/${params.id}`);
        if (!res.ok) {
          setError("Failed to fetch seller data.");
          return;
        }
        const json = await res.json();

        // Pastikan struktur data valid
        if (!json || !json.seller) {
          setError("Seller data not found.");
          return;
        }

        setData({
          seller: json.seller,
          store: json.store || null,
          products: Array.isArray(json.products) ? json.products : [],
        });
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params.id]);

  const handleToggleStatus = async () => {
    if (!data?.store) return;
    const newStatus = data.store.storeStatus === "active" ? "suspended" : "active";
    setSuspendLoading(true);
    try {
      const res = await fetch("/api/admin/sellers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId: data.store._id, status: newStatus }),
      });
      if (res.ok) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                store: prev.store ? { ...prev.store, storeStatus: newStatus } : null,
              }
            : prev
        );
      }
    } finally {
      setSuspendLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/sellers/${params.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/sellers");
      }
    } finally {
      setDeleteLoading(false);
      setShowConfirm(false);
    }
  };

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(p);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          gap: "8px",
          color: "#aaa",
        }}
      >
        <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
        <span style={{ fontSize: "13px" }}>Loading...</span>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Error state
  if (error || !data || !data.seller) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#aaa" }}>
        <p style={{ marginBottom: "12px" }}>{error || "Seller not found."}</p>
        <Link href="/admin/sellers" style={{ color: "#000", fontSize: "13px" }}>
          ← Back to Sellers
        </Link>
      </div>
    );
  }

  const { seller, store, products } = data;

  return (
    <div style={{ maxWidth: "860px" }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* Back */}
      <Link
        href="/admin/sellers"
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
        Back to Sellers
      </Link>

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 4px", color: "#0a0a0a" }}>
            {seller.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#888", fontSize: "13px" }}>
            <Mail size={12} />
            {seller.email}
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {store && (
            <button
              onClick={handleToggleStatus}
              disabled={suspendLoading}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                background: store.storeStatus === "active" ? "#fff" : "#0a0a0a",
                color: store.storeStatus === "active" ? "#dc2626" : "#fff",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {suspendLoading ? (
                <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
              ) : null}
              {store.storeStatus === "active" ? "Suspend Store" : "Activate Store"}
            </button>
          )}
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #fecaca",
              background: "#fff5f5",
              color: "#dc2626",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Trash2 size={13} />
            Delete Seller
          </button>
        </div>
      </div>

      {/* Grid: Store info + Seller info */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        {/* Store Card */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: "12px", overflow: "hidden" }}>
          {store?.banner?.url ? (
            <img src={store.banner.url} alt="banner" style={{ width: "100%", height: "90px", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "90px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ImageIcon size={20} color="#ddd" />
            </div>
          )}
          <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              {store?.logo?.url ? (
                <img src={store.logo.url} alt="logo" style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover", border: "1px solid #eee" }} />
              ) : (
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Store size={16} color="#bbb" />
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#0a0a0a" }}>
                  {store?.name || "No store"}
                </div>
                {store?.slug && (
                  <div style={{ fontSize: "11px", color: "#aaa" }}>/{store.slug}</div>
                )}
              </div>
            </div>

            {store ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {(store.city || store.address) && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#555" }}>
                    <MapPin size={12} color="#aaa" />
                    {[store.city, store.address].filter(Boolean).join(", ")}
                  </div>
                )}
                {store.description && (
                  <div style={{ fontSize: "12px", color: "#888", lineHeight: "1.5" }}>
                    {store.description.slice(0, 100)}{store.description.length > 100 ? "..." : ""}
                  </div>
                )}
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: store.storeStatus === "active" ? "#f0fdf4" : "#fef2f2",
                      color: store.storeStatus === "active" ? "#16a34a" : "#dc2626",
                      border: `1px solid ${store.storeStatus === "active" ? "#bbf7d0" : "#fecaca"}`,
                    }}
                  >
                    {store.storeStatus === "active" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                    {store.storeStatus}
                  </span>
                </div>
                {store.createdAt && (
                  <div style={{ fontSize: "11px", color: "#bbb" }}>
                    Created {formatDate(store.createdAt)}
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: "12px", color: "#ccc" }}>This seller has no store.</p>
            )}
          </div>
        </div>

        {/* Seller Info Card */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#aaa", letterSpacing: "0.5px", textTransform: "uppercase", margin: "0 0 16px" }}>
            Account Info
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#bbb", marginBottom: "3px" }}>Full Name</div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "#0a0a0a", fontWeight: 600 }}>
                <User size={13} color="#999" />
                {seller.name}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#bbb", marginBottom: "3px" }}>Email</div>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "#0a0a0a" }}>
                <Mail size={13} color="#999" />
                {seller.email}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#bbb", marginBottom: "3px" }}>Role</div>
              <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", background: "#0a0a0a", color: "#fff", fontSize: "11px", fontWeight: 600 }}>
                {seller.role}
              </span>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#bbb", marginBottom: "3px" }}>Total Products</div>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#0a0a0a" }}>
                {products.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: "12px", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "8px" }}>
          <Package size={15} color="#000" />
          <h2 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#0a0a0a" }}>
            Products ({products.length})
          </h2>
        </div>

        {products.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#ccc", fontSize: "13px" }}>
            No products yet.
          </div>
        ) : (
          <div>
            {products.map((product, i) => (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 20px",
                  borderBottom: i < products.length - 1 ? "1px solid #f5f5f5" : "none",
                }}
              >
                {product.mainImage?.url ? (
                  <img src={product.mainImage.url} alt="" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover", border: "1px solid #eee" }} />
                ) : (
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Package size={14} color="#ddd" />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#0a0a0a" }}>{product.name}</div>
                  {product.createdAt && (
                    <div style={{ fontSize: "11px", color: "#aaa" }}>{formatDate(product.createdAt)}</div>
                  )}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#0a0a0a" }}>
                  {formatPrice(product.price)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            style={{ background: "#fff", borderRadius: "16px", padding: "32px", width: "420px", maxWidth: "90vw" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Trash2 size={16} color="#dc2626" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>Delete Seller?</h3>
            </div>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", margin: "0 0 8px" }}>
              This will permanently delete:
            </p>
            <ul style={{ fontSize: "13px", color: "#666", margin: "0 0 20px", paddingLeft: "20px", lineHeight: "1.8" }}>
              <li>Seller account (role will revert to <strong>user</strong>)</li>
              <li>Store: <strong>{store?.name || "—"}</strong></li>
              <li><strong>{products.length} product(s)</strong> and all their images from Cloudinary</li>
              <li>Store logo &amp; banner from Cloudinary</li>
            </ul>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ padding: "9px 20px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", fontSize: "13px", cursor: "pointer", fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                style={{ padding: "9px 20px", border: "none", borderRadius: "8px", background: "#dc2626", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                {deleteLoading ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={13} />}
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}