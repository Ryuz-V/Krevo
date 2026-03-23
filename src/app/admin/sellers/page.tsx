"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Store,
  Search,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  MoreHorizontal,
} from "lucide-react";

interface SellerItem {
  _id: string;
  name: string;
  email: string;
  role: string;
  store: {
    _id: string;
    name: string;
    city: string;
    storeStatus: string;
    createdAt: string;
    logo?: { url: string };
  } | null;
}

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<SellerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "suspended">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSellers = async () => {
    try {
      const res = await fetch("/api/admin/sellers");
      const data = await res.json();
      setSellers(Array.isArray(data) ? data : []);
    } catch {
      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleToggleStatus = async (
    storeId: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    setActionLoading(storeId);
    try {
      const res = await fetch("/api/admin/sellers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId, status: newStatus }),
      });
      if (res.ok) {
        setSellers((prev) =>
          prev.map((s) =>
            s.store?._id === storeId
              ? { ...s, store: { ...s.store!, storeStatus: newStatus } }
              : s
          )
        );
      }
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = sellers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.store?.name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" || s.store?.storeStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <Store size={20} color="#000" />
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#0a0a0a" }}>
            Sellers
          </h1>
        </div>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
          Manage seller accounts and their stores.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1", minWidth: "200px", maxWidth: "360px" }}>
          <Search
            size={14}
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }}
          />
          <input
            type="text"
            placeholder="Search seller or store..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 12px 9px 34px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "13px",
              outline: "none",
              background: "#fff",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: "flex", gap: "6px" }}>
          {(["all", "active", "suspended"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: "8px 14px",
                borderRadius: "7px",
                border: filterStatus === s ? "1px solid #000" : "1px solid #e0e0e0",
                background: filterStatus === s ? "#0a0a0a" : "#fff",
                color: filterStatus === s ? "#fff" : "#555",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div
          style={{
            marginLeft: "auto",
            fontSize: "12px",
            color: "#aaa",
            fontWeight: 500,
          }}
        >
          {filtered.length} seller{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div
            style={{
              padding: "60px",
              textAlign: "center",
              color: "#aaa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: "13px" }}>Loading sellers...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#bbb", fontSize: "13px" }}>
            No sellers found.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                {["Seller", "Store", "City", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 20px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#aaa",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((seller, i) => (
                <tr
                  key={seller._id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f5" : "none",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "#fafafa")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                  }
                >
                  {/* Seller info */}
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#0a0a0a" }}>
                      {seller.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>
                      {seller.email}
                    </div>
                  </td>

                  {/* Store name */}
                  <td style={{ padding: "14px 20px" }}>
                    {seller.store ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {seller.store.logo?.url ? (
                          <img
                            src={seller.store.logo.url}
                            alt=""
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "6px",
                              objectFit: "cover",
                              border: "1px solid #eee",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "6px",
                              background: "#f0f0f0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Store size={12} color="#bbb" />
                          </div>
                        )}
                        <span style={{ fontSize: "13px", color: "#333", fontWeight: 500 }}>
                          {seller.store.name}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#ccc" }}>No store</span>
                    )}
                  </td>

                  {/* City */}
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ fontSize: "13px", color: "#666" }}>
                      {seller.store?.city || "—"}
                    </span>
                  </td>

                  {/* Status badge */}
                  <td style={{ padding: "14px 20px" }}>
                    {seller.store ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background:
                            seller.store.storeStatus === "active" ? "#f0fdf4" : "#fef2f2",
                          color:
                            seller.store.storeStatus === "active" ? "#16a34a" : "#dc2626",
                          border: `1px solid ${
                            seller.store.storeStatus === "active" ? "#bbf7d0" : "#fecaca"
                          }`,
                        }}
                      >
                        {seller.store.storeStatus === "active" ? (
                          <CheckCircle2 size={10} />
                        ) : (
                          <AlertCircle size={10} />
                        )}
                        {seller.store.storeStatus}
                      </span>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#ccc" }}>—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {seller.store && (
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              seller.store!._id,
                              seller.store!.storeStatus
                            )
                          }
                          disabled={actionLoading === seller.store._id}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "1px solid #e0e0e0",
                            background:
                              seller.store.storeStatus === "active" ? "#fff" : "#0a0a0a",
                            color:
                              seller.store.storeStatus === "active" ? "#dc2626" : "#fff",
                            fontSize: "11px",
                            fontWeight: 600,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {actionLoading === seller.store._id ? (
                            <Loader2 size={11} style={{ animation: "spin 1s linear infinite" }} />
                          ) : null}
                          {seller.store.storeStatus === "active" ? "Suspend" : "Activate"}
                        </button>
                      )}

                      <Link
                        href={`/admin/sellers/${seller._id}`}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "1px solid #e0e0e0",
                          background: "#fff",
                          color: "#333",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Detail
                        <ChevronRight size={12} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}