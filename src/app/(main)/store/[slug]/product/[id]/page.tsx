async function getProduct(id:string){

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    { cache:"no-store" }
  )

  if(!res.ok){
    return null
  }

  return res.json()

}

export default async function ProductPage(
  context:{
    params:Promise<{slug:string,id:string}>
  }
){

  const { id } = await context.params

  const product = await getProduct(id)

  if(!product){
    return <h1>Product not found</h1>
  }

  return(

    <div>

      <h1>{product.name}</h1>

      <img
        src={product.mainImage}
        width={300}
      />

      <h3>Rp {product.price}</h3>

      <p>{product.description}</p>

      {product.galleryImages?.map((img:string,i:number)=>(
        <img key={i} src={img} width={120}/>
      ))}

    </div>

  )

}