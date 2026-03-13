"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SellerLayout({
  children
}:{children:React.ReactNode}){

  const router = useRouter()

  const handleLogout = ()=>{

    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00"

    router.push("/login")

  }

  return(

    <div style={{display:"flex",minHeight:"100vh"}}>

      <aside
      style={{
        width:"220px",
        background:"#111",
        color:"#fff",
        padding:"20px"
      }}
      >

        <h2>Krevo Seller</h2>

        <nav style={{display:"flex",flexDirection:"column",gap:"10px"}}>

          <Link href="/seller">Dashboard</Link>

          <Link href="/seller/products">
            Products
          </Link>

          <Link href="/seller/products/add">
            Add Product
          </Link>

          <Link href="/seller/store-settings">
            Store Settings
          </Link>

          <button
          onClick={handleLogout}
          style={{
            marginTop:"20px",
            background:"red",
            color:"#fff",
            border:"none",
            padding:"8px",
            cursor:"pointer"
          }}
          >
            Logout
          </button>

        </nav>

      </aside>

      <main
      style={{
        flex:1,
        padding:"30px"
      }}
      >
        {children}
      </main>

    </div>

  )

}