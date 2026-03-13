"use client"

import { useState } from "react"

type ImageType = {
  url:string
  public_id:string
}

export default function AddCategory(){

  const [name,setName] = useState("")
  const [image,setImage] = useState<ImageType | null>(null)
  const [imageFile,setImageFile] = useState<File | null>(null)

  const [uploading,setUploading] = useState(false)

  const uploadImage = async(file:File)=>{

    const formData = new FormData()

    formData.append("file",file)
    formData.append("upload_preset","krevoid")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method:"POST",
        body:formData
      }
    )

    const data = await res.json()

    return {
      url:data.secure_url,
      public_id:data.public_id
    }

  }

  const handleSubmit = async(e:any)=>{

    e.preventDefault()

    if(!imageFile){
      alert("Image required")
      return
    }

    setUploading(true)

    const uploadedImage = await uploadImage(imageFile)

    await fetch("/api/categories/create",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        name,
        image:uploadedImage
      })

    })

    setUploading(false)

    alert("Category created")

  }

  return(

    <form onSubmit={handleSubmit}>

      <h1>Add Category</h1>

      <input
      placeholder="Category name"
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      type="file"
      onChange={(e:any)=>{

        const file = e.target.files?.[0]

        if(!file) return

        setImageFile(file)

        setImage({
          url:URL.createObjectURL(file),
          public_id:""
        })

      }}
      />

      {image && (
        <img src={image.url} width={120}/>
      )}

      {uploading && <p>Uploading...</p>}

      <button>
        Add Category
      </button>

    </form>

  )

}