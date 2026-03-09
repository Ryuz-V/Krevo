'use client';

import { motion } from 'framer-motion';

export default function PromoBanner() {
    return (
        <section className="w-full max-w-[1400px] mx-auto px-6 py-12 mb-20">
            <div className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-gray-200 overflow-hidden flex items-center group">

                {/* Background Image */}
                <motion.div
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: "url('/images/Ads.webp')" }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 z-[5]" />

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center px-10 md:px-20">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col ml-auto text-right items-end"
                    >
                        <p className="text-white text-lg md:text-xl font-bold tracking-[0.2em] mb-2">
                            THE
                        </p>
                        <h2 className="text-5xl md:text-[80px] lg:text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-8 whitespace-nowrap">
                            BATIK<br />DANAR HADI
                        </h2>
                        <p className="text-white text-[16px] md:text-xs font-light leading-relaxed mb-4 max-w-lg">
                            Batik berkualitas dari Batik Danar Hadi yang memadukan warisan budaya dengan gaya modern, menghadirkan motif khas Nusantara yang elegan dan tetap relevan dengan gaya masa kini, cocok digunakan dalam berbagai kesempatan.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="self-end mt-4"
                    >
                        <button className="bg-black text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
                            Discover More
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
