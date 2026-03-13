import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Category from "@/models/Category"

export async function POST(req:Request){

  await connectDB()

  const {name,image} = await req.json()

const slug = name
  .toLowerCase()
  .trim()
  .replace(/\s+/g,"-")

const category = await Category.create({
  name,
  slug,
  image
})

  return NextResponse.json(category)

}