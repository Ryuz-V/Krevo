"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {

      document.cookie = `token=${data.token}; path=/`;

      const decoded: any = jwtDecode(data.token)

      if (decoded.role === "admin") {
        router.push("/admin")
      }
      else if (decoded.role === "seller") {
        router.push("/seller")
      }
      else {
        router.push("/")
      }

    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}