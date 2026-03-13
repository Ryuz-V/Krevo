"use client"

import { useEffect,useState } from "react"

export default function SellerProducts(){

  const [products,setProducts] = useState<any[]>([])

  useEffect(()=>{

    fetch("/api/products/my")
      .then(res=>res.json())
      .then(data=>setProducts(data))

  },[])

  return(

    <div>

      <h1>My Products</h1>

      {products.map(product=>(
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}

    </div>

  )

}