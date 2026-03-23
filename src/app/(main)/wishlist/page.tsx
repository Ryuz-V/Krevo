'use client';

import Link from 'next/link';
import { Heart, ChevronLeft, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-6">
            <div className="max-w-[1000px] mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/profile" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900">Wishlist Saya</h1>
                        <p className="text-sm text-gray-500">Kumpulan produk favorit yang telah kamu simpan.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-6">
                        <Heart size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Wishlist masih kosong</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Simpan produk yang kamu suka di sini agar lebih mudah menemukannya nanti.</p>
                    <Link href="/home" className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-black/10">
                        <ShoppingBag size={16} />
                        Cari Produk
                    </Link>
                </div>
            </div>
        </div>
    );
}
