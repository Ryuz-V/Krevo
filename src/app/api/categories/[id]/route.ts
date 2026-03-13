import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Category from "@/models/Category"

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