import Hero from '../Hero';
import CategorySection from '../CategorySection';
import PromoBanner from '../PromoBanner';
import ProductCarousel, { Product } from '../ProductCarousel';

interface LandingPageProps {
    arrivals: Product[];
    trending: Product[];
    forYou: Product[];
}

export default function LandingPage({ 
    arrivals, 
    trending, 
    forYou 
}: LandingPageProps) {
    return (
        <div className="flex flex-col w-full bg-white">
            <Hero />
            <CategorySection />
            
            <div className="flex flex-col space-y-16 pt-10 pb-16">
                {arrivals.length > 0 && (
                    <ProductCarousel title="NEW ARRIVAL" products={arrivals} />
                )}
                {trending.length > 0 && (
                    <ProductCarousel title="TRENDING" products={trending} />
                )}
            </div>

            <PromoBanner />
            
            <div className="flex flex-col pb-24">
                {forYou.length > 0 && (
                    <ProductCarousel title="UNTUK KAMU" products={forYou} layout="grid" hideSeeAll />
                )}
            </div>
        </div>
    );
}
