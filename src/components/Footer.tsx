import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mx-auto max-w-[1400px] px-6 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                {/* Newsletter Section */}
                <div className="lg:col-span-2 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
                    <h3 className="text-2xl font-black tracking-tighter mb-4">NEWSLETTER</h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-sm">Sign up for exclusive offers, original stories, activism awareness, events and more.</p>
                    <div className="flex w-full max-w-sm">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full bg-gray-100 border-none outline-none px-4 py-3 text-sm"
                        />
                        <button className="bg-black text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-xs font-bold tracking-widest uppercase mb-2">Women</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Limited Edition Prints</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Shirts & Tops</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Sweatshirts/Hoodies</Link>

                    <h4 className="text-xs font-bold tracking-widest uppercase mt-6 mb-2">Men</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Limited Edition Prints</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Shirts & Tops</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Sweatshirts/Hoodies</Link>

                    <h4 className="text-xs font-bold tracking-widest uppercase mt-6 mb-2">Children</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Limited Edition Prints</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Shirts & Tops</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Sweatshirts/Hoodies</Link>
                </div>

                {/* Links Column 2 */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-xs font-bold tracking-widest uppercase mb-2">Accessories</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Tote Bags</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Backpacks</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Hats & Beanies</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Socks</Link>

                    <h4 className="text-xs font-bold tracking-widest uppercase mt-6 mb-2">Home Decor</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Wall Art & Prints</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Statement Pillows</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Tapestries & Wall Hangings</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Limited Edition Home Collections</Link>
                </div>

                {/* Links Column 3 */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-xs font-bold tracking-widest uppercase mb-2">Sales</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Women's Sale</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Men's Sale</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Accessories Sale</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Home Decor Sale</Link>

                    <h4 className="text-xs font-bold tracking-widest uppercase mt-6 mb-2">Collections</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">KEMET Collection</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">OT Classics</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Power to the People</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Afro Aliens</Link>

                    <h4 className="text-xs font-bold tracking-widest uppercase mt-6 mb-2">New Arrivals</h4>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Latest Women's</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Latest Men's</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Latest Accessories</Link>
                    <Link href="#" className="text-xs text-gray-500 hover:text-black transition-colors">Latest Home Decor</Link>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <Link href="#" className="text-sm font-black tracking-tighter">KREVO <span className="text-xs text-gray-400 font-normal">.ID</span></Link>
                    <span className="text-[10px] text-gray-400">KREVO.ID, a Havens Glover LLC brand.</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-[10px] text-gray-400">&copy; 2026 KREVO.ID</span>
                </div>
            </div>
        </footer>
    );
}
