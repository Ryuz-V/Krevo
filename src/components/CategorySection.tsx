'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
    { id: 1, title: 'NEW ARRIVALS', itemCount: '120+ Items', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'MENSWEAR', itemCount: '340+ Items', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'WOMENSWEAR', itemCount: '450+ Items', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'FOOTWEAR', itemCount: '180+ Items', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
    { id: 5, title: 'ACCESSORIES', itemCount: '95+ Items', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=800&auto=format&fit=crop' },
    { id: 6, title: 'ACTIVEWEAR', itemCount: '210+ Items', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800&auto=format&fit=crop' },
    { id: 7, title: 'BAGS & TOTES', itemCount: '85+ Items', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop' },
    { id: 8, title: 'OUTERWEAR', itemCount: '110+ Items', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop' },
];

export default function CategorySection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headerRef, { once: true, margin: "-100px" });

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full max-w-[1400px] mx-auto px-6 py-24 overflow-hidden">
            {/* Header */}
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-8"
            >
                <div className="flex-1">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Kategori</h2>
                </div>
                <div className="flex items-center justify-end space-x-4 w-full sm:w-auto">
                    <Link href="#" className="text-xs font-bold tracking-widest uppercase hover:text-gray-600 border-b border-black pb-1">
                        Lihat Semua
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
            </motion.div>

            {/* Scrollable Container */}
            <div className="relative -mx-6 px-6">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 sm:gap-8 pb-10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[400px] group cursor-pointer"
                        >
                            <Link href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-6 relative">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${category.image})` }}
                                    />
                                    {/* Top Right Arrow */}
                                    <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                                        <ArrowUpRight className="w-6 h-6 text-black" />
                                    </div>
                                    {/* Bottom Left Label */}
                                    <div className="absolute bottom-6 left-6 z-20 flex flex-col items-start overflow-hidden">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 + (index * 0.1) }}
                                            className="bg-white px-5 py-3 shadow-xl"
                                        >
                                            <span className="text-sm font-black uppercase tracking-widest text-black">
                                                {category.title}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-xl font-black tracking-tight uppercase group-hover:text-gray-500 transition-colors">
                                        {category.title}
                                    </h3>
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{category.itemCount}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>


        </section>
    );
}
