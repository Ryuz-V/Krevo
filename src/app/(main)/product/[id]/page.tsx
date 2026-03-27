import { notFound } from "next/navigation";
import ProductDetail from "@/app/(main)/store/[slug]/product/[id]/ProductDetail";

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
    if (id.startsWith('ext-')) {
        const originalId = id.replace('ext-', '');
        try {
            const res = await fetch(`https://dummyjson.com/products/${originalId}`);
            if (!res.ok) return null;
            const data = await res.json();
            
            return {
                name: data.title,
                price: Math.round(data.price * 15000),
                description: data.description,
                mainImage: { url: data.thumbnail },
                galleryImages: data.images?.map((img: string) => ({ url: img })),
                rating: data.rating,
                reviewCount: Math.floor(data.rating * 10) + (parseInt(originalId) % 50),
                soldCount: (parseInt(originalId) % 100) + 50,
                brand: data.brand,
                category: data.category,
                stock: data.stock
            };
        } catch (error) {
            console.warn("External product API fetch failed. Using fallback data to prevent crash.");
            return {
                name: "External Product Dummy",
                price: 150000,
                description: "This product is shown as a fallback because the external API requested failed to load (e.g. dummyjson.com being blocked or unreachable).",
                mainImage: { url: "https://via.placeholder.com/600x600?text=Product+Image" },
                rating: 4.5,
                reviewCount: 12,
                soldCount: 88,
                brand: "KREVO",
                category: "Aksesoris",
                stock: 50
            };
        }
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        const data = await res.json();
        
        // Ensure data matches Product interface
        return {
            ...data,
            mainImage: typeof data.mainImage === 'string' ? { url: data.mainImage } : data.mainImage,
            galleryImages: data.galleryImages?.map((img: any) => 
                typeof img === 'string' ? { url: img } : img
            )
        };
    } catch (error) {
        console.error("Error fetching local product detail:", error);
        return null;
    }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-6 lg:py-10">
        <ProductDetail product={{ ...product, id } as any} />
      </div>
    </main>
  );
}
