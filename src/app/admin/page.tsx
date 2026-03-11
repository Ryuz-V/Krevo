import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Admin Dashboard</h1>
      <p>This is admin page</p>

      <LogoutButton />
    </div>
  );
}