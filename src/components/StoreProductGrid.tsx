import ProductCard from "./ProductCard"

interface Product {
  _id: string
  name: string
  price: number
  mainImage?: { url: string }
}

export default function StoreProductGrid({ products, slug }: { products: Product[]; slug: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} slug={slug} />
      ))}
    </div>
  )
}