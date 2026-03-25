'use client';

import ProductCarousel, { Product } from '../ProductCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BannerSlide {
  id: number;
  imageUrl: string;
  alt: string;
  href: string;
}

interface HomeProps {
  userName?: string;
  userEmail?: string;
  arrivals: Product[];
  trending: Product[];
  forYou: Product[];
}

// ─── Banner slides config ─────────────────────────────────────────────────────
// Ukuran gambar yang disarankan: 1400 x 300 px (rasio ~4.6:1)
// Format: JPG atau WebP untuk performa terbaik
// Ganti imageUrl dengan path gambar kamu, contoh: "/banners/banner-1.jpg"

const BANNER_SLIDES: BannerSlide[] = [
  { id: 1, imageUrl: "/banners/banner-dummy-1.jpg", alt: "Banner 1", href: "#" },
  { id: 2, imageUrl: "/banners/banner-dummy-2.jpg", alt: "Banner 2", href: "#" },
  { id: 3, imageUrl: "/banners/banner-dummy-3.jpg", alt: "Banner 3", href: "#" },
];

const AUTOPLAY_INTERVAL = 4000; // milliseconds

// ─── BannerSlideshow ──────────────────────────────────────────────────────────

function BannerSlideshow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = BANNER_SLIDES.length;

  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((index + total) % total);
    },
    [total]
  );

  const goPrev = () => goTo(current - 1, -1);
  const goNext = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] rounded-[2rem] overflow-hidden bg-gray-100 shadow-md group">

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Link href={BANNER_SLIDES[current].href} className="block w-full h-full">
            {BANNER_SLIDES[current].imageUrl ? (
              <img
                src={BANNER_SLIDES[current].imageUrl}
                alt={BANNER_SLIDES[current].alt}
                className="w-full h-full object-cover"
              />
            ) : (
              // Placeholder — hapus bagian ini setelah gambar diisi
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 gap-2">
                <span className="text-sm font-semibold text-gray-400">
                  Banner {BANNER_SLIDES[current].id}
                </span>
                <span className="text-xs text-gray-400">
                  Ganti imageUrl di BANNER_SLIDES — ukuran: 1400 × 300 px
                </span>
              </div>
            )}
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Arrow kiri */}
      <button
        onClick={(e) => { e.preventDefault(); goPrev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
        aria-label="Banner sebelumnya"
      >
        <ChevronLeft size={18} className="text-gray-800" />
      </button>

      {/* Arrow kanan */}
      <button
        onClick={(e) => { e.preventDefault(); goNext(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
        aria-label="Banner berikutnya"
      >
        <ChevronRight size={18} className="text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {BANNER_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
            className={`
              rounded-full transition-all duration-300
              ${i === current ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/75"}
            `}
          />
        ))}
      </div>

      {/* "Lihat Promo Lainnya" badge — pojok kanan bawah */}
      <div className="absolute right-4 bottom-3 z-10">
        <Link
          href="#"
          className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 hover:bg-black/70 transition-colors"
        >
          Lihat Promo Lainnya
        </Link>
      </div>

    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home({
  userName = "Pelanggan Setia",
  userEmail = "",
  arrivals,
  trending,
  forYou,
}: HomeProps) {
  return (
    <div className="flex flex-col w-full max-w-[1400px] mx-auto px-6 py-12">

      {/* Banner Slideshow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <BannerSlideshow />
      </motion.div>

      {/* Product carousels */}
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