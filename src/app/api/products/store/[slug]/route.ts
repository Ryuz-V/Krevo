import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"
import Store from "@/models/Store"

export async function GET(
  req:Request,
  context:{params:Promise<{slug:string}>}
){

  await connectDB()

  const {slug} = await context.params

  const store = await Store.findOne({slug})

  if(!store){
    return NextResponse.json([], {status:404})
  }

  const products = await Product.find({
    storeId:store._id
  })

  return NextResponse.json(products)

}