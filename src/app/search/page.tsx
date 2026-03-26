'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar'; // Sesuaikan path-nya
import ProductCarousel, { Product } from '@/components/ProductCarousel'; //

// DATA DUMMY UNTUK TESTING
const ALL_PRODUCTS: Product[] = [
    { id: '1', name: 'Kaos', price: 150000, image: '/products/kaos.png' },
    { id: '2', name: 'Laptop Gaming Gahar', price: 15000000, image: '/products/laptop.png' },
    { id: '3', name: 'Sepatu Lari Pro', price: 850000, image: '/products/sepatu.png' },
    { id: '4', name: 'Tas Ransel Kanvas', price: 320000, image: '/products/tas.png' },
];

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            // Simulasi loading 1 detik
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Filter data berdasarkan nama produk (case insensitive)
            const filtered = ALL_PRODUCTS.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase())
            );

            setResults(filtered);
            setLoading(false);
        };

        if (query) performSearch();
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