"use client"

import { useEffect,useState } from "react"
import { useParams,useRouter } from "next/navigation"

export default function EditProduct(){

  const {id} = useParams()

  const router = useRouter()

  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")

  const [mainImage,setMainImage] = useState("")
  const [galleryImages,setGalleryImages] = useState<string[]>([])

  useEffect(()=>{

    fetch(`/api/products/${id}`)
      .then(res=>res.json())
      .then(data=>{

        setName(data.name)
        setDescription(data.description)
        setPrice(data.price)
        setMainImage(data.mainImage)
        setGalleryImages(data.galleryImages || [])

      })

  },[id])

  const handleSubmit = async(e:any)=>{

    e.preventDefault()

    await fetch(`/api/products/${id}`,{

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        name,
        description,
        price,
        mainImage,
        galleryImages
      })

    })

    alert("Product updated")

    router.push("/seller/products")

  }

  return(

    <form onSubmit={handleSubmit}>

      <h1>Edit Product</h1>

      <input
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <textarea
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />

      <input
      type="number"
      value={price}
      onChange={(e)=>setPrice(e.target.value)}
      />

      <button>
        Update Product
      </button>

    </form>

  )

}