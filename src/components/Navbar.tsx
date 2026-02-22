import Link from 'next/link';
import { Search, User, ShoppingBag } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm font-sans">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-black tracking-tighter">ONYX TEE</span>
                    <span className="text-[10px] font-medium tracking-widest text-gray-500 uppercase mt-1">.co</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-gray-900">
                    <Link href="#" className="hover:text-black transition-colors">Clothing</Link>
                    <Link href="#" className="hover:text-black transition-colors">Accessories</Link>
                    <Link href="#" className="hover:text-black transition-colors">Home Decor</Link>
                    <Link href="#" className="hover:text-black transition-colors">Collections</Link>
                    <Link href="#" className="hover:text-black transition-colors">New Arrivals</Link>
                    <Link href="#" className="hover:text-black transition-colors">Sales</Link>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <Search className="w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-sm ml-2 w-32 placeholder:text-gray-400"
                        />
                    </div>
                    <button aria-label="Account" className="text-gray-900 hover:text-black transition-colors">
                        <User className="w-5 h-5" />
                    </button>
                    <button aria-label="Cart" className="text-gray-900 hover:text-black transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
