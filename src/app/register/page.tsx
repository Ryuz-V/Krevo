"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("register clicked");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log(data);
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

      <button type="submit">Register</button>
    </form>
  );
}