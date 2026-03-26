"use client"
import { ShoppingCart, Heart, Star } from "lucide-react"


interface Product {
  _id: string
  name: string
  price: number
  mainImage?: { url: string }
  categoryId?: string
}

export default function ProductCard({ product, slug }: { product: Product; slug: string }) {
  return (
    <a href={`/store/${slug}/product/${product._id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-3/4">
          {product.mainImage ? (
            <img
              src={product.mainImage.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </button>

          {/* Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-white text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wide">
              BEST SELLER
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1">
          <span className="text-xs text-gray-400">Fashion</span>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating - hardcode */}
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span className="text-sm font-semibold text-gray-800">4.8</span>
            <span className="text-xs text-gray-400">(128 Reviews)</span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-base font-bold text-gray-900">
              Rp {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </a>
  )
}