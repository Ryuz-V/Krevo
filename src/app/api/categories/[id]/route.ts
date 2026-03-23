import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// GET - Detail satu category
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("[GET /api/categories/[id]]", error);
    return NextResponse.json({ message: "Failed to fetch category" }, { status: 500 });
  }
}

// PUT - Update category + hapus gambar lama di cloudinary jika diganti
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const body = await req.json();
    console.log("[PUT] body received:", JSON.stringify(body));

    const { name, image } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    const existing = await Category.findById(id);
    if (!existing) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    console.log("[PUT] existing image:", existing.image);
    console.log("[PUT] new image:", image);

    // Hapus gambar lama dari cloudinary hanya jika ada gambar baru dengan public_id berbeda
    if (
      image?.public_id &&
      existing.image?.public_id &&
      image.public_id !== existing.image.public_id
    ) {
      try {
        console.log("[PUT] Deleting old cloudinary image:", existing.image.public_id);
        await cloudinary.uploader.destroy(existing.image.public_id);
      } catch (cloudErr) {
        // Jangan gagalkan update jika cloudinary gagal
        console.error("[PUT] Cloudinary delete error (non-fatal):", cloudErr);
      }
    }

    const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    const updated = await Category.findByIdAndUpdate(
      id,
      { name: name.trim(), slug, ...(image ? { image } : {}) },
      { new: true }
    );

    console.log("[PUT] Updated category:", updated);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PUT /api/categories/[id]] ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update category", detail: String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Hapus category + gambar di cloudinary
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    if (category.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(category.image.public_id);
      } catch (cloudErr) {
        console.error("[DELETE] Cloudinary delete error (non-fatal):", cloudErr);
      }
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("[DELETE /api/categories/[id]] ERROR:", error);
    return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
  }
}