'use client';

import { useState } from 'react'; //
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { Search, User, ShoppingBag, Bell, MessageSquare, Store, Settings, LogOut, Minus, Plus, Trash2 } from 'lucide-react'; 
import { useShop } from '@/contexts/ShopContext';

type NavbarProps = {
    isLoggedIn?: boolean;
};

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian
    const { cart, removeFromCart } = useShop();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleLogout = () => {
        document.cookie = "token=; Max-Age=0; path=/";
        router.push("/login");
    };

    // Fungsi untuk memproses pencarian saat menekan Enter
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm font-sans">
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between"> {/* */}
                <div className="flex flex-1 items-center gap-8 md:gap-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-black tracking-tighter">KREVO</span>
                        <span className="text-[10px] font-medium tracking-widest text-gray-500 uppercase mt-1">.ID</span>
                    </Link>
                    
                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 items-center w-full mr-4 lg:mr-8">
                        <div className="flex w-full items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-200 focus-within:border-gray-400 transition-colors">
                            <Search className="w-5 h-5 text-gray-500 shrink-0" />
                            <input
                                type="text"
                                placeholder="Cari di KREVO"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-gray-400 text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-6 relative">
                    {/* Cart Dropdown */}
                    <div className="relative group py-6 cursor-pointer">
                        <div className="text-gray-900 group-hover:text-black transition-colors relative">
                            <ShoppingBag className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems > 9 ? '9+' : totalItems}
                                </span>
                            )}
                        </div>
                        {/* Dropdown Content */}
                        <div className="absolute right-0 top-[60px] w-80 bg-white shadow-xl rounded-xl border border-gray-100 hidden group-hover:block transition-all z-50">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <span className="font-bold text-sm">Keranjang ({totalItems})</span>
                                <Link href="/checkout" className="text-xs text-[#e4572e] font-bold hover:underline">Lihat Semua</Link>
                            </div>
                            
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-b-xl">
                                    <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
                                    <p className="text-sm text-gray-500 mb-6">Kamu belum nambahin item ke keranjang</p>
                                    <button className="w-full bg-black text-white text-xs font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-widest">
                                        Mulai Belanja
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col rounded-b-xl overflow-hidden">
                                    <div className="max-h-[250px] overflow-y-auto">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 group/item transition-colors">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md border border-gray-100" />
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <p className="text-sm font-semibold truncate max-w-[180px]">{item.name}</p>
                                                    <p className="text-xs text-gray-500">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="self-center p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover/item:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Total Harga</span>
                                            <span className="font-bold">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                        </div>
                                        <Link href="/checkout" className="block w-full">
                                            <button className="w-full bg-black text-white text-xs font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-widest text-center">
                                                Checkout Sekarang
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
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
                    <Link href={isLoggedIn ? "/become-seller" : "/login?redirect=/"}>
                        <button aria-label="Shop" className="flex items-center space-x-2 text-gray-900 border border-gray-200 rounded-lg px-4 py-2 hover:bg-black hover:text-white transition-colors">
                            <Store className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Toko</span>
                        </button>
                    </Link>

                    {/* Profile Button */}
                    {isLoggedIn ? (
                        <div className="relative group py-6 cursor-pointer">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white group-hover:bg-gray-800 transition-all duration-300 border border-black shadow-lg shadow-black/10 overflow-hidden ring-2 ring-transparent group-hover:ring-gray-100 ring-offset-2">
                                <User className="w-5 h-5" />
                            </div>
                            {/* Profile Dropdown */}
                            <div className="absolute right-0 top-[70px] w-64 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-2xl border border-gray-100 hidden group-hover:block transition-all z-50 overflow-hidden opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <div className="flex flex-col p-2">
                                    <Link href="/profile" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                                            <User size={14} />
                                        </div>
                                        Profile Saya
                                    </Link>
                                    <Link href="/settings" className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 placeholder:text-gray-400">
                                            <Settings size={14} />
                                        </div>
                                        Pengaturan
                                    </Link>
                                    <div className="h-px bg-gray-100 my-2 mx-2"></div>
                                    <button onClick={handleLogout} className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold flex items-center gap-3 w-full">
                                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                                            <LogOut size={14} />
                                        </div>
                                        Keluar Akun
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/register" className="bg-black text-white px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-black/10 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg">
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
