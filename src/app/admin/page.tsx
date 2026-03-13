import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  return (
    <div>

      <h1>Admin Dashboard</h1>

      <p>Welcome to Krevo Admin Panel</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Total Users</h3>
          <p>0</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Total Sellers</h3>
          <p>0</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Total Products</h3>
          <p>0</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Total Orders</h3>
          <p>0</p>
        </div>

      </div>
    </div>
  );
}