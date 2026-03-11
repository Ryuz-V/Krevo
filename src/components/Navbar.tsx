import Link from 'next/link';
import { Search, User, ShoppingBag, Bell, MessageSquare, Store } from 'lucide-react';

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
                    <div className="hidden md:flex flex-1 items-center w-full mr-4 lg:mr-8">
                        <div className="flex w-full items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-200 focus-within:border-gray-400 transition-colors">
                            <Search className="w-5 h-5 text-gray-500 shrink-0" />
                            <input
                                type="text"
                                placeholder="Cari di KREVO"
                                className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-gray-400 text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-6 relative">
                    {/* Cart Dropdown */}
                    <div className="relative group py-6 cursor-pointer">
                        <div className="text-gray-900 group-hover:text-black transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        {/* Dropdown Content */}
                        <div className="absolute right-0 top-[60px] w-80 bg-white shadow-xl rounded-xl border border-gray-100 hidden group-hover:block transition-all z-50">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <span className="font-bold text-sm">Keranjang (0)</span>
                                <Link href="#" className="text-xs text-[#e4572e] font-bold hover:underline">Lihat</Link>
                            </div>
                            {/* Content Empty */}
                            <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                                <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
                                <p className="text-sm text-gray-500 mb-6">Kamu belum nambahin item ke keranjang</p>
                                <button className="w-full bg-black text-white text-xs font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-widest">
                                    Mulai Belanja
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notification Dropdown */}
                    <div className="relative group py-6 cursor-pointer">
                        <div className="text-gray-900 group-hover:text-black transition-colors">
                            <Bell className="w-5 h-5" />
                        </div>
                        {/* Dropdown Content */}
                        <div className="absolute right-0 top-[60px] w-80 bg-white shadow-xl rounded-xl border border-gray-100 hidden group-hover:block transition-all z-50">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <span className="font-bold text-sm">Notifikasi</span>
                            </div>
                            {/* Content Empty */}
                            <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50/50">
                                <Bell className="w-12 h-12 text-gray-300 mb-2" />
                                <p className="text-sm text-gray-500">Belum ada notifikasi.</p>
                            </div>
                        </div>
                    </div>

                    {/* Message Dropdown */}
                    <div className="relative group py-6 cursor-pointer">
                        <div className="text-gray-900 group-hover:text-black transition-colors">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        {/* Dropdown Content */}
                        <div className="absolute right-0 top-[60px] w-64 bg-white shadow-xl rounded-xl border border-gray-100 hidden group-hover:block transition-all z-50">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <span className="font-bold text-sm">Pesan</span>
                            </div>
                            {/* Content Links */}
                            <div className="flex flex-col p-2">
                                <Link href="#" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">Chat</Link>
                                <Link href="#" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">Ulasan</Link>
                                <Link href="#" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">Pesan Bantuan</Link>
                                <Link href="#" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">Pesan Komplain</Link>
                            </div>
                        </div>
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-4"></div>

                    {/* Shop Button */}
                    <Link href="/seller">
                        <button aria-label="Shop" className="flex items-center space-x-2 text-gray-900 border border-gray-200 rounded-lg px-4 py-2 hover:bg-black hover:text-white transition-colors">
                            <Store className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Toko</span>
                        </button>
                    </Link>

                    {/* Register Button */}
                    <Link href="/register" className="bg-black text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center">
                        Daftar
                    </Link>
                </div>
            </div>
        </nav>
    );
}
