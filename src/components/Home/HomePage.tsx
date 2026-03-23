'use client';

import ProductCarousel, { Product } from '../ProductCarousel';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface HomeProps {
    userName?: string;
    userEmail?: string;
    arrivals: Product[];
    trending: Product[];
    forYou: Product[];
}

export default function Home({
    userName = "Pelanggan Setia",
    userEmail = "",
    arrivals,
    trending,
    forYou
}: HomeProps) {
    return (
        <div className="flex flex-col w-full max-w-[1400px] mx-auto px-6 py-12">
            {/* Banner Ad Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 relative h-[240px] md:h-[300px] w-full bg-gradient-to-r from-[#9d4edd] via-[#7b2cbf] to-[#5a189a] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-200 group flex items-center px-8 md:px-16"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    />
                    <div className="absolute right-20 bottom-10 opacity-20">
                        <div className="relative">
                            <div className="absolute -left-12 -top-12 w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl animate-pulse"></div>
                            <Star className="w-16 h-16 text-yellow-300 fill-yellow-300" />
                            <Star className="w-8 h-8 text-yellow-200 fill-yellow-200 absolute -right-8 -top-4" />
                            <Star className="w-6 h-6 text-yellow-100 fill-yellow-100 absolute -left-4 -bottom-6" />
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-start gap-4 max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
                        Malas belanja ke mal?
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-white/90 tracking-tight">
                        Coba Official Store, jaminan pasti ori!
                    </p>
                    <button className="mt-4 px-8 py-3.5 border-2 border-white text-white rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-[#7b2cbf] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group/btn">
                        Cek Sekarang
                    </button>
                </div>

                {/* Bottom Pagination-like dots */}
                <div className="absolute left-8 bottom-6 flex gap-1.5 pt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                    <div className="w-4 h-1.5 rounded-full bg-white"></div>
                </div>

                {/* Badge Bottom Right */}
                <div className="absolute right-6 bottom-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Lihat Promo Lainnya</span>
                </div>
            </motion.div>

            <div className="flex flex-col space-y-16">
                {arrivals.length > 0 && (
                    <ProductCarousel title="NEW ARRIVAL" products={arrivals} />
                )}
                {trending.length > 0 && (
                    <ProductCarousel title="TRENDING" products={trending} />
                )}
                {forYou.length > 0 && (
                    <ProductCarousel title="UNTUK KAMU" products={forYou} layout="grid" hideSeeAll />
                )}
            </div>
        </div>
    );
}
