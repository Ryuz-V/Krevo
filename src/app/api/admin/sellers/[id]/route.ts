import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Store from "@/models/Store";
import Product from "@/models/Product";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// GET - Detail satu seller beserta toko dan produknya
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const seller = await User.findById(id).select("-password").lean();
    if (!seller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    const store = await Store.findOne({ owner: id }).lean();
    const products = store
      ? await Product.find({ storeId: (store as any)._id }).lean()
      : [];

    return NextResponse.json({ seller, store, products });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch seller detail" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus seller + toko + semua produk + semua foto di cloudinary
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const seller = await User.findById(id);
    if (!seller || seller.role !== "seller") {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    const store = await Store.findOne({ owner: id });

    if (store) {
      const products = await Product.find({ storeId: store._id });

      // Hapus semua gambar produk dari cloudinary
      for (const product of products) {
        if (product.mainImage?.public_id) {
          await cloudinary.uploader.destroy(product.mainImage.public_id);
        }
        if (product.galleryImages?.length) {
          for (const img of product.galleryImages) {
            if (img.public_id) {
              await cloudinary.uploader.destroy(img.public_id);
            }
          }
        }
      }

      // Hapus logo dan banner toko dari cloudinary
      if (store.logo?.public_id) {
        await cloudinary.uploader.destroy(store.logo.public_id);
      }
      if (store.banner?.public_id) {
        await cloudinary.uploader.destroy(store.banner.public_id);
      }

      // Hapus semua produk
      await Product.deleteMany({ storeId: store._id });

      // Hapus toko
      await Store.findByIdAndDelete(store._id);
    }

    // Ubah role user kembali ke "user"
    await User.findByIdAndUpdate(id, { role: "user" });

    return NextResponse.json({
      message: "Seller and store deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete seller" },
      { status: 500 }
    );
  }
}