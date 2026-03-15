import StoreHeader from "@/components/StoreHeader"
import StoreBanner from "@/components/StoreBanner"
import StoreProductGrid from "@/components/StoreProductGrid"

async function getStore(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/store/${slug}`,
    { cache: "no-store" }
  )
  if (!res.ok) return null
  return res.json()
}

async function getProducts(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/store/${slug}`,
    { cache: "no-store" }
  )
  if (!res.ok) return []
  return res.json()
}

export default async function StorePage(
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  const store = await getStore(slug)
  const products = await getProducts(slug)

  if (!store) {
    return <h1>Store not found</h1>
  }

  return (
    <div className="w-full max-w-350 mx-auto px-6 py-6 space-y-4">

      <StoreHeader store={store} />

      <StoreBanner store={store} />

      <StoreProductGrid products={products} slug={slug} />

    </div>
  )
}