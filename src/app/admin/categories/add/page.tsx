"use client"

import { useState } from "react"

export default function AddCategory(){

  const [name,setName] = useState("")
  const [image,setImage] = useState("")

  const uploadImage = async(file:File)=>{

    const formData = new FormData()

    formData.append("file",file)
    formData.append("upload_preset","krevoid")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    )

    const data = await res.json()

    return data.secure_url

  }

  const handleSubmit = async(e:any)=>{

    e.preventDefault()

    await fetch("/api/categories/create",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        name,
        image
      })

    })

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
      onChange={async(e:any)=>{

        const file = e.target.files?.[0]

        const url = await uploadImage(file)

        setImage(url)

      }}
      />

      {image && <img src={image} width={120}/>}

      <button>
        Add Category
      </button>

    </form>

  )

}