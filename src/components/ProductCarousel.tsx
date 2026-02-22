'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export type Product = {
    id: string;
    name: string;
    colors: number;
    price: number;
    image: string;
    badge?: 'NEW' | 'SALE';
    originalPrice?: number;
};

type ProductCarouselProps = {
    title: string;
    products: Product[];
};

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
    return (
        <section className="w-full max-w-[1400px] mx-auto px-6 py-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase mb-4 sm:mb-0">{title}</h2>
                <div className="flex items-center justify-end space-x-4 w-full sm:w-auto">
                    <Link href="#" className="text-xs font-bold tracking-widest uppercase hover:text-gray-600 border-b border-black pb-1">
                        Show All
                    </Link>
                    <div className="flex items-center space-x-1">
                        <button className="p-2 bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-200 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-50 text-gray-400 hover:text-black hover:bg-gray-200 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex flex-col cursor-pointer"
                    >
                        <div className="relative w-full aspect-square md:aspect-[4/5] bg-gray-50 mb-4 overflow-hidden flex items-center justify-center p-8 transition-colors group-hover:bg-gray-100">
                            {product.badge && (
                                <div className={`absolute top-4 left-4 text-[9px] font-black px-2 py-1 tracking-widest text-white uppercase z-10 ${product.badge === 'SALE' ? 'bg-[#ff4e00]' : 'bg-black'}`}>
                                    {product.badge}
                                </div>
                            )}
                            <motion.img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                        <div className="text-center flex flex-col space-y-1.5 px-2">
                            <h3 className="text-xs font-bold uppercase tracking-tight">{product.name}</h3>
                            <p className="text-[10px] text-gray-500 uppercase">{product.colors} colors</p>
                            <div className="flex items-center justify-center space-x-2">
                                {product.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)} USD</span>
                                )}
                                <p className={`text-xs font-bold ${product.badge === 'SALE' ? 'text-[#ff4e00]' : 'text-black'}`}>
                                    ${product.price.toFixed(2)} USD
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
