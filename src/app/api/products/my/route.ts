import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Store from "@/models/Store";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(){

  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const decoded:any = jwt.verify(
    token!,
    process.env.JWT_SECRET!
  )

  const store = await Store.findOne({
    owner: decoded.userId
  })

  const products = await Product.find({
    storeId: store._id
  })

  return NextResponse.json(products)

}