import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { User as UserIcon, Mail, Shield, Calendar, Settings, ChevronRight, Package, Heart, Star } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token || !token.value) {
        redirect('/login');
    }

    let user = null;
    try {
        const payloadBase64 = token.value.split('.')[1];
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
        if (payload.userId) {
            await connectDB();
            user = await User.findById(payload.userId);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }

    if (!user) {
        redirect('/login');
    }

    const menuItems = [
        { icon: <Package size={20} />, label: "Pesanan Saya", desc: "Cek status pengiriman & histori belanja", href: "/orders" },
        { icon: <Heart size={20} />, label: "Wishlist", desc: "Produk-produk favorit yang kamu simpan", href: "/wishlist" },
        { icon: <Star size={20} />, label: "Ulasan Saya", desc: "Berikan masukan untuk produk yang dibeli", href: "/reviews" },
        { icon: <Settings size={20} />, label: "Pengaturan Akun", desc: "Update password & privasi", href: "/settings" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-6">
            <div className="max-w-[1000px] mx-auto">
                {/* Header / Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                    <Link href="/home" className="hover:text-black">Dashboard</Link>
                    <ChevronRight size={12} />
                    <span className="text-black">Profile Saya</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: User Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] sticky top-24">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-white text-4xl font-black mb-6 shadow-xl">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <h1 className="text-2xl font-black tracking-tight text-gray-900 mb-1">{user.name}</h1>
                                <p className="text-sm text-gray-500 mb-8 flex items-center gap-2">
                                    <Shield size={14} className="text-green-500" />
                                    Akun Terverifikasi
                                </p>
                                
                                <div className="w-full space-y-4 pt-8 border-t border-gray-50">
                                    <div className="flex items-center gap-4 text-left p-4 bg-gray-50 rounded-2xl">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</span>
                                            <span className="text-sm font-medium text-gray-900 truncate max-w-[140px]">{user.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-left p-4 bg-gray-50 rounded-2xl">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400">
                                            <Calendar size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Member Sejak</span>
                                            <span className="text-sm font-medium text-gray-900">Maret 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Menu Options */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
                            <div className="p-8 border-b border-gray-50">
                                <h2 className="text-xl font-black tracking-tight text-gray-900">Kelola Akun</h2>
                                <p className="text-sm text-gray-500">Semua yang kamu butuhkan untuk mengatur pengalaman belanjamu.</p>
                            </div>
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {menuItems.map((item, idx) => (
                                    <Link key={idx} href={item.href} className="group p-6 rounded-2xl hover:bg-black transition-all duration-300 flex flex-col items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors mb-1">{item.label}</h3>
                                            <p className="text-xs text-gray-500 group-hover:text-white/60 transition-colors leading-relaxed">{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity Placeholder */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black tracking-tight text-gray-900">Aktivitas Terakhir</h2>
                                <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Lihat Semua</button>
                            </div>
                            <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                                    <Package size={24} />
                                </div>
                                <p className="text-sm text-gray-500 font-medium">Belum ada pesanan baru</p>
                                <p className="text-xs text-gray-400 mt-1">Yuk mulai belanja produk impianmu!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
