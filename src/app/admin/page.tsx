"use client";

import { useEffect, useState } from "react";
import { Users, Store, Package, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Stats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalCategories: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, sellersRes, productsRes, categoriesRes] =
          await Promise.all([
            fetch("/api/admin/users"),
            fetch("/api/admin/sellers"),
            fetch("/api/admin/products"),
            fetch("/api/admin/categories"),
          ]);

        const [users, sellers, products, categories] = await Promise.all([
          usersRes.ok ? usersRes.json() : [],
          sellersRes.ok ? sellersRes.json() : [],
          productsRes.ok ? productsRes.json() : [],
          categoriesRes.ok ? categoriesRes.json() : [],
        ]);

        setStats({
          totalUsers: Array.isArray(users) ? users.length : 0,
          totalSellers: Array.isArray(sellers) ? sellers.length : 0,
          totalProducts: Array.isArray(products) ? products.length : 0,
          totalCategories: Array.isArray(categories) ? categories.length : 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      href: "/admin/users",
      desc: "Registered accounts",
    },
    {
      label: "Total Sellers",
      value: stats.totalSellers,
      icon: Store,
      href: "/admin/sellers",
      desc: "Active store owners",
    },
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      href: "/admin/products",
      desc: "Listed products",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: Tag,
      href: "/admin/categories",
      desc: "Product categories",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <TrendingUp size={20} color="#000" />
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, color: "#0a0a0a" }}>
            Dashboard Overview
          </h1>
        </div>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>
          Welcome back — here's what's happening on Krevo.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}
      >
        {cards.map(({ label, value, icon: Icon, href, desc }) => (
          <Link
            key={label}
            href={href}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                padding: "24px",
                cursor: "pointer",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#000";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 16px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e8e8";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#0a0a0a",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Icon size={16} color="#fff" />
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#0a0a0a",
                  letterSpacing: "-0.5px",
                  marginBottom: "4px",
                }}
              >
                {loading ? "—" : value}
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "2px" }}>
                {label}
              </div>
              <div style={{ fontSize: "11px", color: "#aaa" }}>{desc}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a", margin: "0 0 16px" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            { href: "/admin/sellers", label: "Manage Sellers" },
            { href: "/admin/categories", label: "Manage Categories" },
            { href: "/admin/users", label: "Manage Users" },
            { href: "/admin/products", label: "View Products" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: "8px 16px",
                background: "#0a0a0a",
                color: "#fff",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.3px",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}