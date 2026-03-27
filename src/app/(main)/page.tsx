import LandingPage from '@/components/Home/LandingPage';
import { Product } from '@/components/ProductCarousel';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getExternalProducts() {
  try {
    const [arrivalsRes, trendingRes, forYouRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/mens-shirts?limit=12'),
      fetch('https://dummyjson.com/products/category/womens-shoes?limit=12'),
      fetch('https://dummyjson.com/products?limit=100'),
    ]);

    const [arrivalsData, trendingData, forYouData] = await Promise.all([
      arrivalsRes.json(),
      trendingRes.json(),
      forYouRes.json()
    ]);

    const mapProduct = (p: any): Product => ({
      id: `ext-${p.id}`,
      name: p.title,
      colors: (p.id % 3) + 1,
      price: Math.round(p.price * 15000),
      image: p.thumbnail,
      badge: p.discountPercentage > 15 ? 'SALE' : (p.id % 7 === 0 ? 'NEW' : undefined),
      originalPrice: p.discountPercentage > 15 ? Math.round((p.price / (1 - p.discountPercentage / 100)) * 15000) : undefined
    });

    // Mix some products for variety
    const mixedTrending = [
      ...trendingData.products.slice(0, 6),
      ...forYouData.products.filter((p: any) => p.category === 'laptops' || p.category === 'smartphones').slice(0, 6)
    ];

    return {
      arrivals: arrivalsData.products.map(mapProduct),
      trending: mixedTrending.map(mapProduct),
      forYou: forYouData.products.slice(0, 32).map(mapProduct)
    };
  } catch (error) {
    console.error("Error fetching external products:", error);
    return { arrivals: [], trending: [], forYou: [] };
  }
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    redirect('/home');
  }

  const products = await getExternalProducts();

  return (
    <div className="flex flex-col w-full bg-white">
      <LandingPage
        arrivals={products.arrivals}
        trending={products.trending}
        forYou={products.forYou}
      />
    </div>
  );
}
