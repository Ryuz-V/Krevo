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
                            Krevo is a marketplace that supports local Indonesian UMKM products.
                            Discover unique, high quality items made by local creators.
                        </p>
                    </div>

                    {/* Kolom 2: Explore */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-base font-bold text-white">Explore</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Fashion</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Handicrafts</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Beauty Products</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Home Decor</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Accessories</Link>
                        </nav>
                    </div>

                    {/* Kolom 3: Customer Support */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-base font-bold text-white">Customer Support</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">How to Order</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Payment Methods</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping Information</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Returns & Refunds</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Help Center</Link>
                        </nav>
                    </div>

                    {/* Kolom 4: Contact Us */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-base font-bold text-white">Contact Us</h4>

                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-white">Address</span>
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
                            <span className="text-sm font-semibold text-white">Phone</span>
                            <a
                                href="tel:+6281735657890"
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                +62 817 3565 7890
                            </a>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-white">Customer Service Hours</span>
                            <span className="text-sm text-gray-400">Mon – Fri : 09.00 – 17.00 WIB</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-gray-800">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-center">
                    <span className="text-xs text-gray-500 text-center">
                        © 2026 KREVO — Supporting Local Indonesian Products
                    </span>
                </div>
            </div>

        </footer>
    );
}