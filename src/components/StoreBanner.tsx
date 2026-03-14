import { Store } from "../types/store"

export default function StoreBanner({ store }: { store: Store }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden">
      {store.banner && (
        <img
          src={store.banner.url}
          alt={`${store.name} banner`}
          className="w-full h-64 object-cover"
        />
      )}
    </div>
  )
}