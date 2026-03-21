import { cookies } from 'next/headers';
import HomeComponent from '@/components/Home/HomePage';
import LandingPage from '@/components/Home/LandingPage';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { Product } from '@/components/ProductCarousel';

async function getExternalProducts() {
  try {
    const [arrivalsRes, trendingRes, forYouRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/mens-shirts?limit=4'),
      fetch('https://dummyjson.com/products/category/mens-shoes?limit=4'),
      fetch('https://dummyjson.com/products?limit=30')
    ]);

    const [arrivalsData, trendingData, forYouData] = await Promise.all([
      arrivalsRes.json(),
      trendingRes.json(),
      forYouRes.json()
    ]);

    const mapProduct = (p: any): Product => ({
      id: `ext-${p.id}`,
      name: p.title,
      colors: Math.floor(Math.random() * 3) + 1,
      price: p.price,
      image: p.thumbnail,
      badge: p.discountPercentage > 15 ? 'SALE' : (p.id % 7 === 0 ? 'NEW' : undefined),
      originalPrice: p.discountPercentage > 15 ? p.price / (1 - p.discountPercentage / 100) : undefined
    });

    return {
      arrivals: arrivalsData.products.map(mapProduct),
      trending: trendingData.products.map(mapProduct),
      forYou: forYouData.products.map(mapProduct)
    };
  } catch (error) {
    console.error("Error fetching external products:", error);
    return { arrivals: [], trending: [], forYou: [] };
  }
}

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  
  const products = await getExternalProducts();
  
  let userName = "";
  if (token && token.value) {
    try {
      const payloadBase64 = token.value.split('.')[1];
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
      if (payload.userId) {
        await connectDB();
        const user = await User.findById(payload.userId);
        if (user) userName = user.name;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div className="flex flex-col w-full bg-white">
      {token ? (
        <HomeComponent 
          userName={userName || "Pelanggan Setia"} 
          arrivals={products.arrivals}
          trending={products.trending}
          forYou={products.forYou}
        />
      ) : (
        <LandingPage 
          arrivals={products.arrivals}
          trending={products.trending}
          forYou={products.forYou}
        />
      )}
    </div>
  );
}
