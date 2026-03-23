"use client";

import { useEffect, useState } from "react";
import { Users, Search, Loader2, ShieldCheck, Store, User } from "lucide-react";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: "user" | "seller" | "admin";
}

const ROLE_CONFIG = {
  admin: { label: "Admin", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: ShieldCheck },
  seller: { label: "Seller", color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd", icon: Store },
  user: { label: "User", color: "#555", bg: "#f5f5f5", border: "#e5e5e5", icon: User },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "user" | "seller" | "admin">("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const counts = {
    all: users.length,
    user: users.filter((u) => u.role === "user").length,
    seller: users.filter((u) => u.role === "seller").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <Users size={20} color="#000" />
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#0a0a0a" }}>
            Users
          </h1>
        </div>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
          All registered accounts on Krevo.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "200px", maxWidth: "340px" }}>
          <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
          <input
            type="text"
            placeholder="Search name or email..."
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

        {/* Role filter tabs */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {(["all", "user", "seller", "admin"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              style={{
                padding: "7px 14px",
                borderRadius: "7px",
                border: filterRole === role ? "1px solid #000" : "1px solid #e0e0e0",
                background: filterRole === role ? "#0a0a0a" : "#fff",
                color: filterRole === role ? "#fff" : "#555",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span style={{ textTransform: "capitalize" }}>{role}</span>
              <span
                style={{
                  fontSize: "10px",
                  background: filterRole === role ? "rgba(255,255,255,0.2)" : "#f0f0f0",
                  color: filterRole === role ? "#fff" : "#888",
                  padding: "1px 6px",
                  borderRadius: "10px",
                  fontWeight: 700,
                }}
              >
                {counts[role]}
              </span>
            </button>
          ))}
        </div>

        <div style={{ marginLeft: "auto", fontSize: "12px", color: "#aaa", fontWeight: 500 }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: "12px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px", gap: "8px", color: "#aaa" }}>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: "13px" }}>Loading users...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#bbb", fontSize: "13px" }}>
            No users found.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                {["#", "Name", "Email", "Role"].map((h) => (
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
              {filtered.map((user, i) => {
                const roleConf = ROLE_CONFIG[user.role] || ROLE_CONFIG.user;
                const RoleIcon = roleConf.icon;
                return (
                  <tr
                    key={user._id}
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5f5f5" : "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#fafafa")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                  >
                    {/* No */}
                    <td style={{ padding: "14px 20px", width: "48px" }}>
                      <span style={{ fontSize: "12px", color: "#ccc", fontWeight: 600 }}>
                        {i + 1}
                      </span>
                    </td>

                    {/* Name + avatar */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            background: "#0a0a0a",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#0a0a0a" }}>
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: "13px", color: "#666" }}>{user.email}</span>
                    </td>

                    {/* Role badge */}
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: roleConf.bg,
                          color: roleConf.color,
                          border: `1px solid ${roleConf.border}`,
                        }}
                      >
                        <RoleIcon size={10} />
                        {roleConf.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}