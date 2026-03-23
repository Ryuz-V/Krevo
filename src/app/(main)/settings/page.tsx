'use client';

import Link from 'next/link';
import { Settings, ChevronLeft, User, Lock, Bell, Shield, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "token=; Max-Age=0; path=/";
        router.push("/login");
    };

    const settingsSections = [
        {
            icon: <User size={20} />,
            title: "Informasi Pribadi",
            desc: "Update nama, email, dan detail kontak kamu",
            href: "#"
        },
        {
            icon: <Lock size={20} />,
            title: "Kata Sandi & Keamanan",
            desc: "Ganti password dan amankan akunmu",
            href: "#"
        },
        {
            icon: <Bell size={20} />,
            title: "Notifikasi",
            desc: "Atur notifikasi yang ingin kamu terima",
            href: "#"
        },
        {
            icon: <Shield size={20} />,
            title: "Privasi Akun",
            desc: "Kontrol data dan privasi akunmu",
            href: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-6">
            <div className="max-w-[1000px] mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/profile" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-gray-900">Pengaturan Akun</h1>
                        <p className="text-sm text-gray-500">Kelola informasi akun dan preferensi kamu.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {settingsSections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer group">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-300 mb-6">
                                {section.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">{section.desc}</p>
                            <button className="text-xs font-black uppercase tracking-widest text-[#e4572e] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                Atur Sekarang
                                <ChevronLeft size={14} className="rotate-180" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors w-full md:w-auto"
                    >
                        <LogOut size={20} />
                        Keluar dari Akun
                    </button>
                </div>
            </div>
        </div>
    );
}
