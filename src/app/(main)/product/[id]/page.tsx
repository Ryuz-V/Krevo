import Link from 'next/link';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

async function getProduct(id: string) {
    if (id.startsWith('ext-')) {
        const originalId = id.replace('ext-', '');
        try {
            const res = await fetch(`https://dummyjson.com/products/${originalId}`);
            if (!res.ok) return null;
            const data = await res.json();
            return {
                id: id,
                name: data.title,
                mainImage: data.thumbnail,
                price: Math.round(data.price * 15000),
                description: data.description,
                brand: data.brand,
                category: data.category,
                stock: data.stock,
                rating: data.rating
            };
        } catch (error) {
            console.error("Error fetching external product detail:", error);
            return null;
        }
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Error fetching local product detail:", error);
        return null;
    }
}

export default async function ProductPage(
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
                <h1 className="text-2xl font-black uppercase tracking-tighter mb-4">Produk Tidak Ditemukan</h1>
                <Link href="/" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600">
                    Kembali Ke Beranda
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 py-12 md:py-20">
            {/* Breadcrumb / Back */}
            <div className="mb-12">
                <Link href="/" className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors w-fit">
                    <ChevronLeft className="w-3 h-3 mr-1" />
                    Kembali ke Koleksi
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Product Image */}
                <div className="bg-gray-50 aspect-square flex items-center justify-center p-8 md:p-16 overflow-hidden rounded-2xl">
                    <img
                        src={product.mainImage || product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <div className="mb-8">
                        {product.brand && (
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                                {product.brand}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                            {product.name}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <h3 className="text-2xl font-bold text-black">
                                Rp {(product.price || 0).toLocaleString('id-ID')}
                            </h3>
                            {product.rating && (
                                <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-400 rounded text-[10px] font-black">
                                    <span>★</span>
                                    <span>{product.rating}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-3">Deskripsi Produk</h4>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                                {product.description || "Tidak ada deskripsi tersedia untuk produk ini."}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="flex-1 bg-black text-white text-[11px] font-black uppercase tracking-widest py-5 px-8 hover:bg-gray-800 transition-colors flex items-center justify-center">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Masukkan Keranjang
                            </button>
                            <button className="flex-1 border-2 border-black text-black text-[11px] font-black uppercase tracking-widest py-5 px-8 hover:bg-black hover:text-white transition-all">
                                Beli Sekarang
                            </button>
                        </div>

                        <div className="pt-8 border-t border-gray-100 flex items-center space-x-12">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kategori</span>
                                <span className="text-xs font-bold uppercase">{product.category || 'Lifestyle'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stok</span>
                                <span className="text-xs font-bold uppercase">{product.stock || 'Tersedia'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}