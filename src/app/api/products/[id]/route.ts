import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"
import cloudinary from "@/lib/cloudinary"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB()
  const { id } = await context.params
  const product = await Product.findById(id)
  return NextResponse.json(product)
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params
    const {
      name,
      description,
      price,
      categoryId,
      mainImage,
      galleryImages,
      oldMainImagePublicId,
      oldGalleryPublicIds,
    } = await req.json()

    // Hapus main image lama dari Cloudinary kalau diganti
    if (oldMainImagePublicId) {
      await cloudinary.uploader.destroy(oldMainImagePublicId)
    }

    // Hapus gallery lama yang diganti
    if (oldGalleryPublicIds?.length) {
      for (const public_id of oldGalleryPublicIds) {
        if (public_id) await cloudinary.uploader.destroy(public_id)
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, categoryId, mainImage, galleryImages },
      { new: true }
    )

    return NextResponse.json(product)

  } catch (error) {
    console.log("PUT PRODUCT ERROR:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await context.params
    const product = await Product.findById(id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    if (product.mainImage?.public_id) {
      await cloudinary.uploader.destroy(product.mainImage.public_id)
    }

    if (product.galleryImages?.length) {
      for (const img of product.galleryImages) {
        if (img.public_id) await cloudinary.uploader.destroy(img.public_id)
      }
    }

    await Product.findByIdAndDelete(id)

    return NextResponse.json({ message: "Product deleted" })

  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}