"use client"

import { useEffect,useState } from "react"

export default function AdminCategories(){

  const [categories,setCategories] = useState([])

  const loadCategories = ()=>{

    fetch("/api/categories")
      .then(res=>res.json())
      .then(data=>setCategories(data))

  }

  useEffect(()=>{
    loadCategories()
  },[])

  const deleteCategory = async(id:string)=>{

    if(!confirm("Delete category?")) return

    await fetch(`/api/categories/${id}`,{
      method:"DELETE"
    })

    loadCategories()

  }

  return(

    <div>

      <h1>Categories</h1>

      <a href="/admin/categories/add">
        Add Category
      </a>

      {categories.map((cat:any)=>(
        <div key={cat._id}>

          <img src={cat.image} width={60}/>

          <h3>{cat.name}</h3>

          <a href={`/admin/categories/edit/${cat._id}`}>
            Edit
          </a>

          <button
          onClick={()=>deleteCategory(cat._id)}
          >
            Delete
          </button>

        </div>
      ))}

    </div>

  )

}