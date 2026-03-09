'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full h-[85vh] overflow-hidden bg-black flex items-center justify-center -mt-20">
            {/* Background Image */}
            <motion.div
                initial={{ scale: 1.05, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
                style={{ backgroundImage: "url('/images/Hero.webp')" }}
            />

            {/* Overlay Content */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center mt-20">

                {/* Top Text */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-white text-sm tracking-[0.2em] font-medium mb-2 uppercase"
                >
                    Onyx Tee&apos;s Remember
                </motion.p>

                {/* Huge KEMET Text block */}
                <div className="relative w-full flex items-center justify-between mt-8">
                    <motion.h1
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-[100px] md:text-[180px] lg:text-[250px] font-black text-[#e4572e] leading-none tracking-tighter"
                    >
                        KEMET
                    </motion.h1>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1 }}
                        className="hidden md:flex flex-col items-end mt-[120px]"
                    >
                        <h2 className="text-white text-4xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-none mb-1">
                            Collection
                        </h2>
                        <p className="text-transparent text-5xl md:text-[100px] font-black tracking-widest leading-none" style={{ WebkitTextStroke: '1px white' }}>
                            2025
                        </p>
                    </motion.div>
                </div>

                {/* Mobile secondary text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1 }}
                    className="md:hidden flex flex-col items-end w-full -mt-4"
                >
                    <h2 className="text-white text-4xl font-black tracking-tighter leading-none mb-1">
                        Collection
                    </h2>
                    <p className="text-transparent text-5xl font-black tracking-widest leading-none" style={{ WebkitTextStroke: '1px white' }}>
                        2025
                    </p>
                </motion.div>

                {/* Bottom Left Content */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-auto mb-16 max-w-sm"
                >
                    <p className="text-gray-200 text-xs leading-relaxed mb-6 font-light">
                        Embrace KEMET (k.m.t), one of Africa&apos;s many great civilizations and the world&apos;s BLUEPRINT for math, science, religion, governance and culture.
                    </p>
                    <button className="bg-white text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                        Discover Kemet
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
