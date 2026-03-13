import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Store from "@/models/Store"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import cloudinary from "@/lib/cloudinary"

export async function PUT(req:Request){

  await connectDB()

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  const decoded:any = jwt.verify(
    token!,
    process.env.JWT_SECRET!
  )

  const {name,description,logo,banner} = await req.json()

  const store = await Store.findOne({
    owner: decoded.userId
  })

  if(!store){
    return NextResponse.json(
      {message:"Store not found"},
      {status:404}
    )
  }

  // delete old logo
  if(
    logo?.public_id &&
    store.logo?.public_id &&
    logo.public_id !== store.logo.public_id
  ){
    await cloudinary.uploader.destroy(
      store.logo.public_id
    )
  }

  // delete old banner
  if(
    banner?.public_id &&
    store.banner?.public_id &&
    banner.public_id !== store.banner.public_id
  ){
    await cloudinary.uploader.destroy(
      store.banner.public_id
    )
  }

  store.name = name
  store.description = description
  store.logo = logo
  store.banner = banner

  await store.save()

  return NextResponse.json(store)

}