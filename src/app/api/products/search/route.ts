import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    
    if (!q || q.trim() === '') {
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    await connectDB();
    
    // Search products where name or description matches the query (case insensitive)
    const products = await Product.find({ 
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }).limit(30);

    return NextResponse.json({ products }, { status: 200 });
    
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan saat mencari produk dari database" }, { status: 500 });
  }
}
