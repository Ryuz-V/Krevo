"use client"

import { useEffect,useState } from "react"
import { useParams,useRouter } from "next/navigation"

export default function EditCategory(){

  const {id} = useParams()

  const router = useRouter()

  const [name,setName] = useState("")
  const [image,setImage] = useState("")

  const [uploading,setUploading] = useState(false)

  useEffect(()=>{

    fetch(`/api/categories/${id}`)
      .then(res=>res.json())
      .then(data=>{

        setName(data.name)
        setImage(data.image)

      })

  },[id])

  const uploadImage = async(file:File)=>{

    setUploading(true)

    const formData = new FormData()

    formData.append("file",file)
    formData.append("upload_preset","krevoid")

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    )

    const data = await res.json()

    setUploading(false)

    return data.secure_url

  }

  const handleSubmit = async(e:any)=>{

    e.preventDefault()

    await fetch(`/api/categories/${id}`,{

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        name,
        image
      })

    })

    alert("Category updated")

    router.push("/admin/categories")

  }

  return(

    <form onSubmit={handleSubmit}>

      <h1>Edit Category</h1>

      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/>

      <input
        type="file"
        onChange={async(e:any)=>{

          const file = e.target.files?.[0]

          if(!file) return

          const url = await uploadImage(file)

          setImage(url)

        }}
      />

      <br/>

      {image && (
        <img src={image} width={120}/>
      )}

      {uploading && <p>Uploading...</p>}

      <br/>

      <button>
        Update Category
      </button>

    </form>

  )

}