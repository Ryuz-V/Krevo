import { Store } from "../types/store"

export default function StoreBanner({ store }: { store: Store }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden aspect-[16/5] md:aspect-[16/4]">
      {store.banner && (
        <img
          src={store.banner.url}
          alt={`${store.name} banner`}
          className="w-full h-full object-cover object-center"
        />
      )}
    </div>
  )
}