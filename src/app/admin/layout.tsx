import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <aside style={{
        width: "220px",
        background: "#111",
        color: "white",
        padding: "20px"
      }}>
        <h2>Krevo Admin</h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/admin/users">Users</a></li>
          <li><a href="/admin/sellers">Sellers</a></li>
          <li><a href="/admin/products">Products</a></li>
          <li><a href="/admin/orders">Orders</a></li>
          <li><a href="/admin/categories">Categories</a></li>
                <LogoutButton />
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "30px" }}>
        {children}
      </main>

    </div>
  );
}