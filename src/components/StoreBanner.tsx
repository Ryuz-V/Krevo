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