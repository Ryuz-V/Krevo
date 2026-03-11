"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";

    router.push("/login");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}