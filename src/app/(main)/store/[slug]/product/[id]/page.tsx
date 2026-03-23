import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  url: string;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  mainImage: { url: string };
  galleryImages?: GalleryImage[];
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  brand?: string;
  category?: string;
  stock?: number;
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    {
      // Cache hasil fetch, revalidate setiap 60 detik.
      // Ganti angkanya sesuai seberapa sering data produk berubah.
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  return res.json();
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-6 lg:py-10">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}
