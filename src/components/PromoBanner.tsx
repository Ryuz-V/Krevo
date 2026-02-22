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
                    style={{ backgroundImage: "url('/images/promo_banner_1771688490185.png')" }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 z-[5]" />

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center px-10 md:px-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col max-w-xl"
                    >
                        <p className="text-white text-md font-medium tracking-[0.2em] mb-2 uppercase">The</p>
                        <h2 className="text-6xl md:text-[100px] lg:text-[130px] font-black text-white leading-[0.85] tracking-tighter mb-8">
                            BLACK<br />LAND
                        </h2>
                        <p className="text-white text-xs md:text-sm font-light leading-relaxed mb-8 max-w-sm">
                            Inspired by the rich legacy of Kemet, this collection honors the cradle of civilization with timeless, eco-friendly apparel and accessories.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="absolute bottom-10 right-10 md:bottom-20 md:right-20"
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
