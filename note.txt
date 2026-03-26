"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Shield,
  Truck,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import type { Product } from "./page";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID").format(price);
}

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">({count} ulasan)</span>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ productName }: { productName: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 flex-wrap">
      <span className="hover:text-gray-800 cursor-pointer transition-colors">
        Pakaian Pria
      </span>
      <ChevronRight size={14} className="flex-shrink-0" />
      <span className="hover:text-gray-800 cursor-pointer transition-colors">
        Kaos
      </span>
      <ChevronRight size={14} className="flex-shrink-0" />
      <span className="text-gray-800 font-medium truncate max-w-[200px]">
        {productName}
      </span>
    </nav>
  );
}

// ─── ImageGallery ─────────────────────────────────────────────────────────────

function ImageGallery({
  mainImage,
  galleryImages,
}: {
  mainImage: { url: string };
  galleryImages?: { url: string }[];
}) {
  const allImages = [mainImage, ...(galleryImages ?? [])];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
        <img
          src={allImages[selectedIndex]?.url}
          alt="Foto produk"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails — hanya tampil jika ada lebih dari 1 gambar */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`
                flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200
                ${
                  selectedIndex === i
                    ? "border-gray-900 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-75"
                }
              `}
            >
              <img
                src={img.url}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ColorSelector ────────────────────────────────────────────────────────────

const COLOR_OPTIONS = [
  { label: "Putih",   value: "white",  className: "bg-white border border-gray-300" },
  { label: "Hitam",   value: "black",  className: "bg-gray-900"                     },
  { label: "Abu-abu", value: "gray",   className: "bg-gray-400"                     },
  { label: "Cokelat", value: "brown",  className: "bg-amber-700"                    },
] as const;

function ColorSelector() {
  const [selected, setSelected] = useState<string>("white");

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
        Pilih Warna
      </p>
      <div className="flex gap-3">
        {COLOR_OPTIONS.map((color) => (
          <button
            key={color.value}
            title={color.label}
            onClick={() => setSelected(color.value)}
            className={`
              w-9 h-9 rounded-full transition-all duration-200
              ${color.className}
              ${
                selected === color.value
                  ? "ring-2 ring-gray-900 ring-offset-2 scale-110"
                  : "hover:scale-105"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}

// ─── SizeSelector ─────────────────────────────────────────────────────────────

const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"] as const;

function SizeSelector() {
  const [selected, setSelected] = useState<string>("L");

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Pilih Ukuran
        </p>
        <button className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors">
          Size Guide
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {SIZE_OPTIONS.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            className={`
              min-w-[3rem] px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200
              ${
                selected === size
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-900 hover:text-gray-900"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-100 py-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-left group"
      >
        <span className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3 text-sm text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── TrustBadges ──────────────────────────────────────────────────────────────

function TrustBadges() {
  const badges = [
    { icon: <Truck size={18} />,     label: "Gratis Ongkir",   sub: "Min. Rp 100rb" },
    { icon: <Shield size={18} />,    label: "Pembayaran Aman", sub: "100% Terjamin"  },
    { icon: <RotateCcw size={18} />, label: "Mudah Return",    sub: "Dalam 7 Hari"   },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-gray-50"
        >
          <span className="text-gray-600">{badge.icon}</span>
          <span className="text-xs font-semibold text-gray-800 leading-tight">
            {badge.label}
          </span>
          <span className="text-xs text-gray-500">{badge.sub}</span>
        </div>
      ))}
    </div>
  );
}

// ─── ProductDetail (root export) ─────────────────────────────────────────────

export default function ProductDetail({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    // Reset label kembali ke semula setelah 2 detik
    setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <>
      <Breadcrumb productName={product.name} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

        {/* ── Kiri: Galeri Gambar ── */}
        <ImageGallery
          mainImage={product.mainImage}
          galleryImages={product.galleryImages}
        />

        {/* ── Kanan: Info & Aksi ── */}
        <div className="flex flex-col gap-6">

          {/* Nama & meta */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                Terjual {product.soldCount ?? 250}+
              </span>
              <span className="text-gray-300">|</span>
              <StarRating
                rating={product.rating ?? 5}
                count={product.reviewCount ?? 48}
              />
            </div>
          </div>

          {/* Harga */}
          <div className="bg-gray-50 rounded-xl px-4 py-3 self-start">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              Rp{formatPrice(product.price)}
            </span>
          </div>

          {/* Pilih warna */}
          <ColorSelector />

          {/* Pilih ukuran */}
          <SizeSelector />

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <ShoppingCart size={18} />
                Keranjang
              </button>
              <button
                onClick={() => setIsWishlisted((prev) => !prev)}
                aria-label={isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
                className={`
                  w-14 flex items-center justify-center rounded-xl border-2 transition-all duration-200
                  ${
                    isWishlisted
                      ? "border-red-400 bg-red-50 text-red-500"
                      : "border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
                  }
                `}
              >
                <Heart size={20} className={isWishlisted ? "fill-red-400" : ""} />
              </button>
            </div>

            <button className="w-full bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-700 transition-colors duration-200 uppercase tracking-widest text-sm">
              Beli Langsung
            </button>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors self-center"
          >
            <Share2 size={14} />
            {isCopied ? "Link tersalin!" : "Bagikan ke teman"}
          </button>

          {/* Trust badges */}
          <TrustBadges />

          {/* Accordion */}
          <div>
            <AccordionItem title="Deskripsi Produk" defaultOpen>
              <p>{product.description}</p>
            </AccordionItem>
            <AccordionItem title="Perawatan">
              <ul className="list-disc list-inside space-y-1">
                <li>Cuci dengan tangan atau mesin (max 30°C)</li>
                <li>Jangan gunakan pemutih</li>
                <li>Setrika dengan suhu rendah</li>
                <li>Jangan dikeringkan dengan mesin pengering</li>
              </ul>
            </AccordionItem>
          </div>

        </div>
      </div>

      {/* ── Komentar ── */}
      <CommentSection />
    </>
  );
}

// ─── CommentSection ───────────────────────────────────────────────────────────

interface Comment {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || rating === 0) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "Kamu",
      avatar: "K",
      rating,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      text: trimmed,
    };

    setComments((prev) => [newComment, ...prev]);
    setText("");
    setRating(0);
  }

  return (
    <section className="mt-14 pt-10 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare size={20} className="text-gray-700" />
        <h2 className="text-xl font-bold text-gray-900">Ulasan Pembeli</h2>
        {comments.length > 0 && (
          <span className="text-sm text-gray-500 font-medium">
            ({comments.length})
          </span>
        )}
      </div>

      {/* Form tulis komentar */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-8">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Tulis ulasanmu
        </p>

        {/* Star picker */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                aria-label={`Beri ${value} bintang`}
              >
                <Star
                  size={22}
                  className={
                    value <= (hoveredRating || rating)
                      ? "fill-amber-400 text-amber-400 transition-colors"
                      : "fill-gray-200 text-gray-200 transition-colors"
                  }
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="text-xs text-gray-500 ml-2">
              {["", "Sangat Buruk", "Buruk", "Cukup", "Bagus", "Sangat Bagus"][rating]}
            </span>
          )}
        </div>

        {/* Text input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ceritakan pengalamanmu dengan produk ini..."
          rows={3}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 resize-none transition-colors"
        />

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">
            {rating === 0 && "Pilih bintang terlebih dahulu"}
          </span>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || rating === 0}
            className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Kirim Ulasan
          </button>
        </div>
      </div>

      {/* Daftar komentar / empty state */}
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <MessageSquare size={40} className="text-gray-200 mb-3" />
          <p className="text-gray-500 font-medium">Belum ada ulasan</p>
          <p className="text-sm text-gray-400 mt-1">
            Jadilah yang pertama mengulas produk ini!
          </p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-100">
          {comments.map((comment) => (
            <div key={comment.id} className="py-5 flex gap-4">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {comment.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < comment.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}