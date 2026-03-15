import { Star, MapPin, ShoppingBag, MessageCircle, Share2, UserPlus  } from "lucide-react"
import { Store } from "../types/store"


export default function StoreHeader({ store }: { store: Store }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-4 md:px-6 py-4 md:py-5 shadow-sm relative">
      
      {/* Action Buttons - pojok kanan atas */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button className="w-8 h-8 bg-gray-900 hover:bg-gray-700 transition-colors rounded-full flex items-center justify-center">
          <UserPlus className="w-4 h-4 text-white" />
        </button>
        <button className="w-8 h-8 border border-gray-200 hover:bg-gray-50 transition-colors rounded-full flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-gray-600" />
        </button>
        <button className="w-8 h-8 border border-gray-200 hover:bg-gray-50 transition-colors rounded-full flex items-center justify-center">
          <Share2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          {store.logo ? (
            <img
              src={store.logo.url}
              alt={store.name}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-rose-700 flex items-center justify-center text-white text-xl md:text-2xl font-bold border-2 border-gray-100">
              {store.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-900 text-sm md:text-base">{store.name}</span>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin className="w-3 h-3" />
            <span>{store.city}</span>
          </div>

          <div className="flex items-center gap-3 md:gap-5 mt-1">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-gray-800">4.9</span>
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

    </div>
  )
}