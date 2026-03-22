'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full h-[85vh] overflow-hidden bg-black flex items-center justify-center -mt-20">
            {/* Background Image & Overlay */}
            <motion.div
                initial={{ scale: 1.15, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-16 inset-x-0 -bottom-16 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/Hero.webp')" }}
            >
                {/* Darkening layer */}
                <div className="absolute inset-0 bg-black/10" />
            </motion.div>

            {/* Overlay Content */}
            <div className="relative z-10 w-full max-w-350 mx-auto px-6 h-full flex flex-col justify-center mt-16">

                {/* Huge KREVO Text block */}
                <div className="relative w-full flex flex-col items-start justify-center mt-16 -ml-2 md:-ml-4">
                    <motion.h1
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-[85px] md:text-[135px] lg:text-[190px] font-black text-[#e4572e] leading-none tracking-tighter"
                    >
                        KREVO
                    </motion.h1>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 1 }}
                        className="flex flex-row items-baseline mt-2 md:mt-4 ml-2 max-w-350"
                    >
                        <h2 className="text-white text-2xl md:text-3xl lg:text-[40px] font-black tracking-tighter leading-none">
                            Koleksi
                        </h2>
                        <p className="text-transparent text-2xl md:text-4xl lg:text-[50px] font-black tracking-widest leading-none ml-3 md:ml-4" style={{ WebkitTextStroke: '1px white' }}>
                            2026
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Left Content */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-auto mb-16 max-w-md"
                >
                    <p className="text-gray-200 text-sm leading-relaxed mb-5 font-light">
                        Bersama KREVO, mari dukung UMKM lokal<br /> dan bangun ekonomi kreatif dari produk-produk terbaik<br /> karya anak bangsa.
                    </p>
                    <button className="bg-white text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
                        Jelajahi KREVO
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
