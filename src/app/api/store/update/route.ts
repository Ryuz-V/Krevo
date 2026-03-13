import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Store from "@/models/Store";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(req: Request){

  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const decoded:any = jwt.verify(
    token!,
    process.env.JWT_SECRET!
  )

  const {name,description,logo,banner} = await req.json()

const slug = name
  .toLowerCase()
  .trim()
  .replace(/\s+/g,"-")

const store = await Store.findOneAndUpdate(
  { owner: decoded.userId },
  {
    name,
    slug,
    description,
    logo,
    banner
  },
  { new:true }
)

  return NextResponse.json(store)
}