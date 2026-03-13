async function getStore(slug: string){

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/store/${slug}`,
    { cache: "no-store" }
  )

  if(!res.ok){
    return null
  }

  return res.json()
}

async function getProducts(slug:string){

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/store/${slug}`,
    { cache:"no-store" }
  )

  if(!res.ok){
    return []
  }

  return res.json()

}

export default async function StorePage(
  context: { params: Promise<{ slug: string }> }
){

  const { slug } = await context.params

  const store = await getStore(slug)

  const products = await getProducts(slug)

  if(!store){
    return <h1>Store not found</h1>
  }

  return (
    <div>

      <h1>{store.name}</h1>

      <p>{store.description}</p>

      {store.logo && (
        <img src={store.logo} width={120}/>
      )}

      {store.banner && (
        <img src={store.banner} width={400}/>
      )}

      <h2>Products</h2>

      {products.map((product:any)=>(
        <div key={product._id}>

          <a href={`/store/${slug}/product/${product._id}`}>

            <img
              src={product.mainImage}
              width={150}
            />

            <h3>{product.name}</h3>

            <p>Rp {product.price}</p>

          </a>

        </div>
      ))}

    </div>
  )
}