'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
    { id: 1, title: 'MEN', image: '/images/category_men_1771688393713.png' },
    { id: 2, title: 'WOMEN', image: '/images/category_women_1771688426763.png' },
    { id: 3, title: 'TOTE + BAGS', image: '/images/category_bags_1771688463625.png' },
];

export default function CategorySection() {
    return (
        <section className="w-full max-w-[1400px] mx-auto px-6 py-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">Wear the Legacy</h2>
                <div className="flex items-center space-x-2">
                    <button className="p-3 bg-gray-50 hover:bg-gray-200 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-gray-50 hover:bg-gray-200 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="group cursor-pointer flex flex-col items-center"
                    >
                        <div className="w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-6 relative">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />
                        </div>
                        <h3 className="text-sm font-black tracking-widest uppercase group-hover:text-gray-500 transition-colors">
                            {category.title}
                        </h3>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
