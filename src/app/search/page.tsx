'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar'; // Sesuaikan path-nya
import ProductCarousel, { Product } from '@/components/ProductCarousel'; //

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            if (!query.trim()) {
                setResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                // Jalankan pengambilan data secara paralel
                const [dbRes, dummyRes] = await Promise.all([
                    fetch(`/api/products/search?q=${encodeURIComponent(query)}`),
                    fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
                ]);

                const [dbData, dummyData] = await Promise.all([
                    dbRes.ok ? dbRes.json() : { products: [] },
                    dummyRes.ok ? dummyRes.json() : { products: [] }
                ]);

                // Map produk database agar sesuai dengan tipe Product
                const mappedDbProducts: Product[] = (dbData.products || []).map((p: any) => ({
                    id: p._id,
                    name: p.name,
                    colors: 1,
                    price: p.price,
                    image: p.mainImage?.url || '/placeholder.png'
                }));

                // Map produk dummyjson agar sesuai dengan tipe Product
                const mappedDummyProducts: Product[] = (dummyData.products || []).map((p: any) => ({
                    id: `ext-${p.id}`,
                    name: p.title,
                    colors: (p.id % 3) + 1,
                    price: Math.round(p.price * 15000),
                    image: p.thumbnail,
                    badge: p.discountPercentage > 15 ? 'SALE' : undefined,
                    originalPrice: p.discountPercentage > 15 ? Math.round((p.price / (1 - p.discountPercentage / 100)) * 15000) : undefined
                }));

                // Gabungkan hasil dari kedua sumber
                const combinedResults = [...mappedDbProducts, ...mappedDummyProducts];
                setResults(combinedResults);

            } catch (err) {
                console.error("Gagal melakukan pencarian:", err);
                setResults([]); // Fallback jika gagal total
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [query]);

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Navbar isLoggedIn={true} />

            <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 pt-32 pb-20"> {/* */}
                
                {/* Judul Hasil Pencarian */}
                <div className="mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase">
                        Hasil Pencarian: <span className="text-gray-400">"{query}"</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Ditemukan {results.length} produk yang cocok
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="w-10 h-10 animate-spin text-gray-300 mb-4" />
                        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">Mencari Produk...</p>
                    </div>
                ) : results.length > 0 ? (
                    /* Menampilkan Produk dalam Grid (Mirip bagian 'UNTUK KAMU' di HomePage) */
                    <div className="flex flex-col">
                        <ProductCarousel 
                            title="SEMUA HASIL" 
                            products={results} 
                            layout="grid" //
                            hideSeeAll    //
                        />
                    </div>
                ) : (
                    /* Tampilan Jika Tidak Ada Hasil */
                    <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                            <Search className="w-8 h-8 text-gray-200" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h2>
                        <p className="text-gray-500 text-sm text-center max-w-xs">
                            Kami tidak menemukan produk dengan nama tersebut. Coba gunakan kata kunci yang lebih umum.
                        </p>
                    </div>
                )}
            </main>

            {/* Tambahkan Footer di sini jika sudah ada komponennya */}
        </div>
    );
}