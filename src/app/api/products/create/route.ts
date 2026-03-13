import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Store from "@/models/Store";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {

    await connectDB()

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const decoded: any = jwt.verify(
        token!,
        process.env.JWT_SECRET!
    )

    const { name, description, price, mainImage, galleryImages, categoryId } = await req.json()

    const store = await Store.findOne({
        owner: decoded.userId
    })

    if (!store) {
        return NextResponse.json(
            { message: "Store not found" },
            { status: 404 }
        )
    }

    const product = await Product.create({

        name,
        description,
        price,
        mainImage,
        galleryImages,
        categoryId,
        storeId: store._id

    })

    return NextResponse.json(product)

}