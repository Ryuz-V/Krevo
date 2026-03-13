import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Category from "@/models/Category"
import cloudinary from "@/lib/cloudinary"

export async function PUT(
  req:Request,
  context:{params:Promise<{id:string}>}
){

  await connectDB()

  const {id} = await context.params

  const {name,image} = await req.json()

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g,"-")

  const category = await Category.findByIdAndUpdate(
    id,
    {name,slug,image},
    {new:true}
  )

  return NextResponse.json(category)

}

export async function DELETE(
  req:Request,
  context:{params:Promise<{id:string}>}
){

  await connectDB()

  const {id} = await context.params

  const category = await Category.findById(id)

  if(!category){
    return NextResponse.json({message:"Not found"})
  }

  if(category.image?.public_id){
    await cloudinary.uploader.destroy(
      category.image.public_id
    )
  }

  await Category.findByIdAndDelete(id)

  return NextResponse.json({
    message:"Category deleted"
  })

}

export async function GET(
  req:Request,
  context:{params:Promise<{id:string}>}
){

  await connectDB()

  const {id} = await context.params

  const category = await Category.findById(id)

  return NextResponse.json(category)

}