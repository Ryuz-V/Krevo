import { Star, MapPin, ShoppingBag, MessageCircle, Share2, BadgeCheck } from "lucide-react"

interface Store {
  _id: string
  name: string
  slug: string
  description: string
  logo?: { url: string }
  banner?: { url: string }
  address: string
  city: string
  storeStatus: string
}

export default function StoreHeader({ store }: { store: Store }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative shrink-0">
          {store.logo ? (
            <img
              src={store.logo.url}
              alt={store.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-rose-700 flex items-center justify-center text-white text-2xl font-bold border-2 border-gray-100">
              {store.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Name + Location + Stats */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-900 text-base">{store.name}</span>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin className="w-3 h-3" />
            <span>{store.city}</span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-5 mt-1">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-gray-800">4.9</span>
                <span className="text-[10px] text-gray-400">/5</span>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-100" />

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Terjual</span>
              <div className="flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-800">1.3m+</span>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-100" />

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Response</span>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-800">99%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="bg-gray-900 hover:bg-gray-700 transition-colors text-white text-sm font-semibold px-5 py-2 rounded-xl">
          Follow
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" />
          Chat Penjual
        </button>
        <button className="border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 p-2 rounded-xl">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}