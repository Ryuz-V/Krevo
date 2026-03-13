"use client"

import { useEffect,useState } from "react"

export default function SellerProducts(){

  const [products,setProducts] = useState<any[]>([])

  const loadProducts = ()=>{

    fetch("/api/products/my")
      .then(res=>res.json())
      .then(data=>setProducts(data))

  }

  useEffect(()=>{
    loadProducts()
  },[])

  const deleteProduct = async(id:string)=>{

    const confirmDelete = confirm("Delete this product?")

    if(!confirmDelete) return

    await fetch(`/api/products/${id}`,{
      method:"DELETE"
    })

    loadProducts()

  }

  return(

    <div>

      <h1>My Products</h1>

      <table border={1} cellPadding={10}>

        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {products.map(product=>(
            <tr key={product._id}>

              <td>
                <img
                  src={product.mainImage}
                  width={80}
                />
              </td>

              <td>{product.name}</td>

              <td>Rp {product.price}</td>

              <td>

                <a href={`/seller/products/edit/${product._id}`}>
                  Edit
                </a>

                {" | "}

                <button
                  onClick={()=>deleteProduct(product._id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}