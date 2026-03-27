"use client";

import { useShop } from "@/contexts/ShopContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Truck, MonitorSmartphone, MapPin, CreditCard, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { checkoutItem, cart, setCheckoutItem } = useShop();
  const [mounted, setMounted] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use the directly purchased item OR fallback to processing the whole cart
  const itemsToCheckout = checkoutItem 
    ? [{ ...checkoutItem, quantity: 1 }] 
    : cart.length > 0 ? cart : [];

  const subtotal = itemsToCheckout.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const taxDesc = "0 (Termasuk)"; // As requested: "pajak udh termasuk dalam harga produk"
  const total = subtotal;

  if (!mounted) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin w-8 h-8 rounded-full border-4 border-black border-t-transparent"></div></div>;

  if (itemsToCheckout.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-black mb-2 text-gray-800">Tidak ada produk untuk dicheckout</h1>
        <p className="text-gray-500 mb-6 max-w-sm">Tampaknya kamu belum memilih produk atau keranjang belanjaanmu kosong.</p>
        <button onClick={() => router.push('/home')} className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
          Mulai Belanja
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Pembayaran berhasil disimulasikan! Terima kasih telah berbelanja.");
      setCheckoutItem(null);
      // Pilihan: kosongkan keranjang jika checkoutItem null (berarti dari keranjang)
      router.push('/home');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-8 pb-20">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">Checkout</h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">Selesaikan proses pembayaran pesananmu dengan aman.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Kolom Kiri: Form Data & Pembayaran */}
          <div className="w-full lg:w-[65%] flex flex-col gap-6">
            
            {/* Box 1: Alamat Pengiriman */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex flex-shrink-0 items-center justify-center text-blue-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Alamat Pengiriman</h2>
                  <p className="text-xs text-gray-500">Tentukan lokasi di mana pesanan akan dikirimkan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Nama Penerima</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Nomor Handphone</label>
                  <input type="tel" placeholder="08123456789" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5 mt-2">
                  <label className="text-sm font-semibold text-gray-700">Alamat Lengkap</label>
                  <textarea rows={3} placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm resize-none"></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Kota / Kabupaten</label>
                  <input type="text" placeholder="Misal: Jakarta Selatan" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Kode Pos</label>
                  <input type="text" placeholder="12345" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Box 2: Metode Pembayaran */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-green-50 flex flex-shrink-0 items-center justify-center text-green-600">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Metode Pembayaran</h2>
                  <p className="text-xs text-gray-500">Pilih opsi pembayaran yang paling nyaman untukmu</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setPaymentMethod("transfer")}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "transfer" ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900 text-sm">Transfer Bank</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "transfer" ? "border-gray-900" : "border-gray-300"}`}>
                      {paymentMethod === "transfer" && <div className="w-2 h-2 bg-gray-900 rounded-full"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">BCA, Mandiri, BNI, BRI</p>
                </div>

                <div 
                  onClick={() => setPaymentMethod("ewallet")}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "ewallet" ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900 text-sm">Virtual Wallet</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "ewallet" ? "border-gray-900" : "border-gray-300"}`}>
                      {paymentMethod === "ewallet" && <div className="w-2 h-2 bg-gray-900 rounded-full"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">GoPay, OVO, Dana, ShopeePay</p>
                </div>
                
                <div 
                  onClick={() => setPaymentMethod("cod")}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-gray-900 bg-gray-50" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900 text-sm">Cash On Delivery</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-gray-900" : "border-gray-300"}`}>
                      {paymentMethod === "cod" && <div className="w-2 h-2 bg-gray-900 rounded-full"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Bayar langsung di tempat saat pesanan tiba</p>
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Ringkasan & Nota */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6 sticky top-[100px]">
            
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Belanja</h2>

              {/* Product List */}
              <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
                {itemsToCheckout.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.quantity} Barang</p>
                      <p className="text-sm font-bold text-gray-900 mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-dashed border-t-2 border-dashed border-gray-100 mb-6"></div>

              {/* Receipt Details */}
              <div className="flex flex-col gap-3 mb-6 font-medium text-sm">
                <div className="flex justify-between items-center text-gray-500">
                  <span>Total Harga Produk</span>
                  <span className="text-gray-800">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>Pajak Belanja</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">{taxDesc}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>Biaya Pengiriman</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">Gratis</span>
                </div>
              </div>
              
              <div className="w-full h-px bg-gray-100 mb-4"></div>

              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="block text-sm font-bold text-gray-500">Total Tagihan</span>
                  <span className="block text-xs font-medium text-gray-400 mt-0.5">Sudah termasuk pajak</span>
                </div>
                <span className="text-2xl font-black text-gray-900 whitespace-nowrap">Rp {total.toLocaleString('id-ID')}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-[#ff4e00] hover:bg-[#e04500] text-white font-black py-4 px-6 md:px-8 rounded-xl transition-all duration-200 uppercase tracking-widest text-[15px] shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Beli Sekarang"}
              </button>
              
              <p className="text-center text-[11px] text-gray-400 mt-4 leading-relaxed font-medium">
                <Shield size={12} className="inline mr-1 -mt-0.5" />
                Transaksi kamu dilindungi penuh oleh KREVO.ID Protected
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </main>
  );
}
