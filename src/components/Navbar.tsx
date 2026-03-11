import Link from 'next/link';
import { Search, User, ShoppingBag } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm font-sans">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left side: Logo & Navigation */}
                <div className="flex flex-1 items-center gap-8 md:gap-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-black tracking-tighter">KREVO</span>
                        <span className="text-[10px] font-medium tracking-widest text-gray-500 uppercase mt-1">.ID</span>
                    </Link>
                    {/* Search Bar - Moved inside left container */}
                    <div className="hidden md:flex items-center w-[400px] lg:w-[500px]">
                        <div className="flex w-full items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-200 focus-within:border-gray-400 transition-colors">
                            <Search className="w-5 h-5 text-gray-500 shrink-0" />
                            <input
                                type="text"
                                placeholder="Cari produk, kategori, dll..."
                                className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-gray-400 text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-6">
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
