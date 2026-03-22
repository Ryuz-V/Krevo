'use client';

import ProductCarousel, { Product } from '../ProductCarousel';

interface HomeProps {
    userName?: string;
    arrivals: Product[];
    trending: Product[];
    forYou: Product[];
}

export default function Home({
    userName = "Pelanggan Setia",
    arrivals,
    trending,
    forYou
}: HomeProps) {
    return (
        <div className="flex flex-col w-full max-w-[1400px] mx-auto px-6 py-12">
            {/* Dashboard Header */}
            <div className="mb-12 bg-white rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-2">Halo, {userName} 👋</h1>
                    <p className="text-gray-500 text-sm">Selamat datang kembali! Yuk cek rekomendasi produk terbaru untukmu hari ini.</p>
                </div>
                <div className="flex gap-3 md:gap-4 mt-8 md:mt-0 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 snap-x">
                    <button className="snap-center shrink-0 flex flex-col items-center justify-center bg-gray-50 border border-gray-100 rounded-xl p-4 w-[100px] hover:border-black hover:bg-black hover:text-white transition-all group">
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">📦</span>
                        <span className="text-[10px] font-bold tracking-wider uppercase">Pesanan</span>
                    </button>
                    <button className="snap-center shrink-0 flex flex-col items-center justify-center bg-gray-50 border border-gray-100 rounded-xl p-4 w-[100px] hover:border-black hover:bg-black hover:text-white transition-all group">
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">❤️</span>
                        <span className="text-[10px] font-bold tracking-wider uppercase">Wishlist</span>
                    </button>
                    <button className="snap-center shrink-0 flex flex-col items-center justify-center bg-gray-50 border border-gray-100 rounded-xl p-4 w-[100px] hover:border-black hover:bg-black hover:text-white transition-all group">
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎟️</span>
                        <span className="text-[10px] font-bold tracking-wider uppercase">Voucher</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col space-y-16">
                {arrivals.length > 0 && (
                    <ProductCarousel title="NEW ARRIVAL" products={arrivals} />
                )}
                {trending.length > 0 && (
                    <ProductCarousel title="TRENDING" products={trending} />
                )}
                {forYou.length > 0 && (
                    <ProductCarousel title="UNTUK KAMU" products={forYou} hideArrows hideSeeAll />
                )}
            </div>
        </div>
    );
}
