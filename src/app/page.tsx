import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductCarousel, { Product } from '@/components/ProductCarousel';
import PromoBanner from '@/components/PromoBanner';

// Temporary mock data mapping to the newly generated images.
const mensProducts: Product[] = [
  { id: 'm1', name: 'Our Pride (Organic)', colors: 2, price: 79.99, image: '/images/product_tshirt_latest.png', badge: 'NEW' },
  { id: 'm2', name: 'ONYX Embroidered Hoodie', colors: 2, price: 79.96, originalPrice: 99.99, image: '/images/product_tshirt_latest.png', badge: 'SALE' },
  { id: 'm3', name: 'Onyx University Motto', colors: 5, price: 39.99, image: '/images/product_tshirt_latest.png' },
  { id: 'm4', name: 'Onyx KEMET We Are Family', colors: 2, price: 29.00, image: '/images/product_tshirt_latest.png', badge: 'NEW' },
];

const bagsProducts: Product[] = [
  { id: 'b1', name: 'Blue Akan Beach Tote', colors: 1, price: 29.99, image: '/images/product_bag_latest.png', badge: 'NEW' },
  { id: 'b2', name: 'Pink Akan Beach Tote', colors: 1, price: 29.99, image: '/images/product_bag_latest.png' },
  { id: 'b3', name: 'Love/Wow/Peace Tote', colors: 1, price: 15.99, image: '/images/product_bag_latest.png' },
  { id: 'b4', name: 'Mud Cloth Beach Tote', colors: 1, price: 29.99, originalPrice: 39.99, image: '/images/product_bag_latest.png', badge: 'SALE' },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CategorySection />

      <div className="mt-12 bg-white">
        <ProductCarousel title="Latest Men's" products={mensProducts} />
        <div className="my-12 md:my-16" />
        <ProductCarousel title="Latest Tote + Bags + Backpacks" products={bagsProducts} />
      </div>

      <PromoBanner />
    </div>
  );
}
