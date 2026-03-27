'use client';

import ProductCarousel, { Product } from '../ProductCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';

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
  { id: 1, imageUrl: "/banners/banner-1.jpg", alt: "Banner 1", href: "#" },
  { id: 2, imageUrl: "/banners/banner-2.jpg", alt: "Banner 2", href: "#" },
  { id: 3, imageUrl: "/banners/banner-3.jpg", alt: "Banner 3", href: "#" },
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

// ─── Kategori ───────────────────────────────────────────────────────────────────

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

const CATEGORIES: Category[] = [
  { id: 1, name: "Elektronik", imageUrl: "https://down-id.img.susercontent.com/file/dcd61dcb7c1448a132f49f938b0cb553@resize_w640_nl.webp" },
  { id: 2, name: "Aksesoris HP & Laptop", imageUrl: "https://down-id.img.susercontent.com/file/id-50009109-0bd6a9ebd0f2ae9b7e8b9ce7d89897d6@resize_w640_nl.webp" },
  { id: 3, name: "Buku & Alat Tulis", imageUrl: "https://down-id.img.susercontent.com/file/998c7682fd5e7a3563b2ad00aaa4e6f3@resize_w640_nl.webp" },
  { id: 4, name: "Pakaian Pria", imageUrl: "https://down-id.img.susercontent.com/file/04dba508f1ad19629518defb94999ef9@resize_w640_nl.webp" },
  { id: 5, name: "Sepatu", imageUrl: "https://down-id.img.susercontent.com/file/3c8ff51aab1692a80c5883972a679168@resize_w640_nl.webp" },
  { id: 6, name: "Tas Pria", imageUrl: "https://down-id.img.susercontent.com/file/47ed832eed0feb62fd28f08c9229440e@resize_w640_nl.webp" },
  { id: 7, name: "Aksesoris Fashion", imageUrl: "https://down-id.img.susercontent.com/file/1f18bdfe73df39c66e7326b0a3e08e87@resize_w640_nl.webp" },
  { id: 8, name: "Hobi & Koleksi", imageUrl: "https://down-id.img.susercontent.com/file/42394b78fac1169d67c6291973a3b132@resize_w640_nl.webp" },
  { id: 9, name: "Perawatan & Kecantikan", imageUrl: "https://down-id.img.susercontent.com/file/2715b985ae706a4c39a486f83da93c4b@resize_w640_nl.webp" },
  { id: 10, name: "Sourvenir & Perlengkapan", imageUrl: "https://down-id.img.susercontent.com/file/id-50009109-28b537029726a804da60f448c9083298@resize_w640_nl.webp" },
  { id: 11, name: "Pakaian Wanita", imageUrl: "https://down-id.img.susercontent.com/file/6d63cca7351ba54a2e21c6be1721fa3a@resize_w640_nl.webp" },
  { id: 12, name: "Pakaian Bayi & Anak", imageUrl: "https://down-id.img.susercontent.com/file/9251edd6d6dd98855ff5a99497835d9c@resize_w640_nl.webp" },
  { id: 13, name: "Sepatu Wanita", imageUrl: "https://down-id.img.susercontent.com/file/id-50009109-a947822064b7a8077b15596c85bd9303@resize_w640_nl.webp" },
  { id: 14, name: "Tas Wanita", imageUrl: "https://down-id.img.susercontent.com/file/id-50009109-da8cea4e4705abb4dd935b244668e9dd@resize_w640_nl.webp" },
  { id: 15, name: "Gadget & Kamera", imageUrl: "https://down-id.img.susercontent.com/file/dcd61dcb7c1448a132f49f938b0cb553@resize_w640_nl.webp" },
  { id: 16, name: "Makanan & Minuman", imageUrl: "https://down-id.img.susercontent.com/file/7873b8c3824367239efb02d18eeab4f5@resize_w640_nl.webp" },
];

function Categories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white rounded-sm shadow border border-gray-100 mb-16 mt-4 relative">
      <div className="px-5 py-3 border-b border-gray-100 bg-white z-10 relative">
        <h2 className="text-[15px] font-extrabold text-gray-500 uppercase tracking-wider">KATEGORI</h2>
      </div>
      <div className="relative group bg-white">
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
        <div 
          ref={scrollContainerRef} 
          onScroll={checkScroll}
          className="grid grid-rows-2 auto-cols-[33.333%] sm:auto-cols-[25%] md:auto-cols-[20%] lg:auto-cols-[14.2857%] grid-flow-col w-full overflow-x-auto hide-scroll scroll-smooth snap-x snap-mandatory"
        >
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} 
              className="flex flex-col items-center justify-start py-4 px-2 border-r border-b border-gray-100 hover:shadow-[0_0_12px_rgba(0,0,0,0.1)] hover:border-transparent hover:z-10 relative bg-white transition-all snap-start h-[142px] [&:nth-child(even)]:border-b-0 [&:nth-last-child(1)]:border-r-0 [&:nth-last-child(2)]:border-r-0"
            >
              <div className="w-[72px] h-[72px] bg-gray-50 rounded-full flex items-center justify-center overflow-hidden mb-3 group-hover:bg-gray-100 transition-colors shrink-0">
                <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <span className="text-[13px] text-center text-gray-700 leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
        
        {/* Left Arrow */}
        <button 
          onClick={(e) => { e.preventDefault(); scrollLeft(); }} 
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center transition-all z-20 border border-gray-100 cursor-pointer ${canScrollLeft ? 'text-gray-800 hover:text-black opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100 hidden sm:flex'}`}
        >
          <ChevronLeft size={22} className="pr-0.5" />
        </button>
        
        {/* Right Arrow */}
        <button 
          onClick={(e) => { e.preventDefault(); scrollRight(); }} 
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center transition-all z-20 border border-gray-100 cursor-pointer ${canScrollRight ? 'text-gray-800 hover:text-black opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100 hidden sm:flex'}`}
        >
          <ChevronRight size={22} className="pl-0.5" />
        </button>
      </div>
    </div>
  );
}

export default function Home({
  userName = "Pelanggan Setia",
  userEmail = "",
  arrivals,
  trending,
  forYou,
}: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const totalPages = Math.ceil(forYou.length / itemsPerPage);
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const currentForYouProducts = forYou.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="flex flex-col w-full max-w-[1400px] mx-auto px-6 pt-12 pb-4">

      {/* Banner Slideshow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <BannerSlideshow />
      </motion.div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Categories />
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
          <div className="flex flex-col">
            <ProductCarousel title="UNTUK KAMU" products={currentForYouProducts} layout="grid" hideSeeAll />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-20">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-semibold text-gray-700">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}