"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BecomeSeller() {

  const router = useRouter();

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [address,setAddress] = useState("");
  const [city,setCity] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const res = await fetch("/api/store/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        description,
        address,
        city
      })
    });

    const data = await res.json();

    if(res.ok){
      router.push("/seller");
    }
  }

  return (
    <div>
      <h1>Create Store</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Store name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Description"
          onChange={(e)=>setDescription(e.target.value)}
        />

        <input
          placeholder="Address"
          onChange={(e)=>setAddress(e.target.value)}
        />

        <input
          placeholder="City"
          onChange={(e)=>setCity(e.target.value)}
        />

        <button>Create Store</button>

      </form>
    </div>
  );
}