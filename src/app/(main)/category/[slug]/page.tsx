import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import ProductCarousel, { Product } from "@/components/ProductCarousel";

// Peta penerjemah slug bahasa Indonesia ke format kategori JSON API dummyjson
const categoryMap: Record<string, string[]> = {
  "produk-terbaru": ["new-arrivals"], 
  "elektronik": ["smartphones", "laptops"],
  "aksesoris-hp-&-laptop": ["mobile-accessories", "tablets"],
  "buku-&-alat-tulis": [],
  "pakaian-pria": ["mens-shirts"],
  "sepatu": ["mens-shoes", "womens-shoes"],
  "tas-pria": ["mens-shirts"],
  "aksesoris-fashion": ["mens-watches", "womens-watches", "womens-jewellery", "sunglasses"],
  "hobi-&-koleksi": ["sports-accessories"],
  "perawatan-&-kecantikan": ["beauty", "skin-care", "fragrances"],
  "sourvenir-&-perlengkapan": ["home-decoration"],
  "pakaian-wanita": ["womens-dresses", "tops"],
  "pakaian-bayi-&-anak": [],
  "sepatu-wanita": ["womens-shoes"],
  "tas-wanita": ["womens-bags"],
  "gadget-&-kamera": ["smartphones", "laptops"],
  "makanan-&-minuman": ["groceries"]
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const title = decodedSlug.replace(/-/g, " ").toUpperCase();

  await connectDB();

  // 1. Local DB Search (Case-insensitive substring search for category field)
  const dbProducts = await ProductModel.find({
    category: { $regex: new RegExp(decodedSlug.replace(/-/g, " "), "i") },
  }).limit(20);

  const mappedDbProducts: Product[] = dbProducts.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    colors: 1,
    price: p.price,
    image: p.mainImage?.url || "/placeholder.png",
  }));

  // 2. DummyJSON Fetch (Map indo slug to english JSON categories)
  let mappedDummyProducts: Product[] = [];
  const dummyCategories = categoryMap[decodedSlug] || [];

  if (dummyCategories.length > 0) {
    try {
      const fetchPromises = dummyCategories.map((cat) =>
        fetch(`https://dummyjson.com/products/category/${cat}?limit=20`, {
          cache: "no-store",
        }).then((res) => (res.ok ? res.json() : { products: [] }))
      );

      const results = await Promise.all(fetchPromises);

      let allDummyProducts: any[] = [];
      results.forEach((res) => {
        if (res.products) {
          allDummyProducts = [...allDummyProducts, ...res.products];
        }
      });

      mappedDummyProducts = allDummyProducts.map((p: any) => ({
        id: `ext-${p.id}`,
        name: p.title,
        colors: (p.id % 3) + 1,
        price: Math.round(p.price * 15000),
        image: p.thumbnail,
        badge: p.discountPercentage > 15 ? "SALE" : undefined,
        originalPrice:
          p.discountPercentage > 15
            ? Math.round((p.price / (1 - p.discountPercentage / 100)) * 15000)
            : undefined,
      }));
    } catch (e) {
      console.error("Failed to fetch dummy category", e);
    }
  }

  const combinedResults = [...mappedDbProducts, ...mappedDummyProducts];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 pb-24 pt-12">
        {/* Header Kategori */}
        <div className="mb-14 border-b border-gray-100 pb-8 flex flex-col justify-center items-center text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[#e4572e] mb-3 uppercase">
            Kategori
          </p>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-gray-900 uppercase">
            {title}
          </h1>
          <p className="text-gray-500 mt-4 font-medium text-sm">
            Menemukan {combinedResults.length} produk di kategori ini
          </p>
        </div>

        {/* Daftar Produk */}
        {combinedResults.length > 0 ? (
          <div className="flex flex-col">
            <ProductCarousel
              title=""
              products={combinedResults}
              layout="grid"
              hideSeeAll
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
              <span className="text-3xl">🛒</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Kategori Ini Kosong
            </h2>
            <p className="text-gray-500 text-sm text-center max-w-sm">
              Wah, sepertinya belum ada penjual yang menambahkan produk ke label
              kategori "{title}".
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
