import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white mt-20">

            {/* ── Main content ── */}
            <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Kolom 1: Logo & deskripsi */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-1.5">
                            <span className="text-xl font-black tracking-tighter text-white">KREVO</span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
Krevo adalah platform pasar yang mendukung produk-produk UMKM lokal Indonesia. Temukan barang-barang unik dan berkualitas tinggi yang dibuat oleh para kreator lokal.
                        </p>
                    </div>

                    {/* Kolom 2: Explore */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-base font-bold text-white">Eksplorasi</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Fesyen</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Kerajinan Tangan</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Produk Kecantikan</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Dekorasi Rumah</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Aksesoris</Link>
                        </nav>
                    </div>

                    {/* Kolom 3: Layanan Pelanggan */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-base font-bold text-white">Layanan Pelanggan</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Cara Pesan</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Metode Pembayaran</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Informasi Pengiriman</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Retur & Pengembalian Dana</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pusat Bantuan</Link>
                        </nav>
                    </div>

                    {/* Kolom 4: Hubungi Kami */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-base font-bold text-white">Hubungi Kami</h4>

                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-white">Alamat</span>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Jl. DI Panjaitan No.128,<br />
                                Karangreja, Purwokerto Kidul,<br />
                                Kec. Purwokerto Selatan,<br />
                                Kabupaten Banyumas,<br />
                                Jawa Tengah 53141
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-white">Email</span>
                            <a
                                href="mailto:krevo@gmail.com"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                krevo@gmail.com
                            </a>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-white">Telepon</span>
                            <a
                                href="tel:+6281735657890"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                +62 817 3565 7890
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-gray-800">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-center">
                    <span className="text-xs text-gray-500 text-center">
                        © 2026 KREVO — Mendukung Produk UMKM Lokal Indonesia
                    </span>
                </div>
            </div>

        </footer>
    );
}