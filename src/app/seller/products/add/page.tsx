"use client"

import { useState, useEffect } from "react"

export default function AddProduct() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])

  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")

  const [uploading, setUploading] = useState(false)

  useEffect(() => {

    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))

  }, [])

  const uploadImage = async (file: File) => {

    const formData = new FormData()

    formData.append("file", file)
    formData.append("upload_preset", "krevoid")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    )

    const data = await res.json()

    return {
      url: data.secure_url,
      public_id: data.public_id
    }

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!mainImageFile) {
      alert("Main image required")
      return
    }

    setUploading(true)

    // upload main image
    const mainImage = await uploadImage(mainImageFile)

    // upload gallery images
    const galleryImages: any[] = []

    for (const file of galleryFiles) {

      const img = await uploadImage(file)

      galleryImages.push(img)

    }

    await fetch("/api/products/create", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        description,
        price,
        mainImage,
        galleryImages,
        categoryId
      })

    })

    setUploading(false)

    alert("Product created")

  }

  return (

    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>

      <h1>Add Product</h1>

      <input
        placeholder="Product name"
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <input
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />

      <select onChange={(e) => setCategoryId(e.target.value)}>

        <option>Select Category</option>

        {categories.map((cat: any) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}

      </select>

      <br />

      <h3>Main Image</h3>

      <input
        type="file"
        onChange={(e) => {

          const file = e.target.files?.[0]

          if (file) {
            setMainImageFile(file)
          }

        }}
      />

      {mainImageFile && (
        <img
          src={URL.createObjectURL(mainImageFile)}
          width={120}
        />
      )}

      <br />

      <h3>Gallery Images (max 3)</h3>

      <input
        type="file"
        multiple
        onChange={(e) => {

          const files = Array.from(e.target.files || []) as File[]

          if (files.length > 3) {
            alert("Max 3 images")
            return
          }

          setGalleryFiles(files)

        }}
      />

      <div>

        {galleryFiles.map((file, i) => (
          <img
            key={i}
            src={URL.createObjectURL(file)}
            width={100}
          />
        ))}

      </div>

      {uploading && <p>Uploading...</p>}

      <br />

      <button>
        Add Product
      </button>

    </form>

  )

}