
import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { cartStorage, CartItem } from '../utils/cart';
import { Order as OrderType } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

const Order: React.FC = () => {
  const menuItems = storage.getMenu();
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    whatsapp: '',
    address: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Load from cartStorage on mount
  useEffect(() => {
    const cart = cartStorage.getCart();
    console.log('Loaded cart from storage:', cart);
    setSelectedItems(cart);
  }, []);

  // Sync with cartStorage and update total
  useEffect(() => {
    cartStorage.saveCart(selectedItems);
    const total = selectedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [selectedItems]);

  const addItem = (menuId: string, option?: string) => {
    const item = menuItems.find(m => m.id === menuId);
    if (!item) return;
    
    setSelectedItems(prev => {
      const existing = prev.find(p => p.menuId === menuId && p.option === option);
      if (existing) {
        return prev.map(p => (p.menuId === menuId && p.option === option) ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { menuId, name: item.name, price: item.price, quantity: 1, option: option || (item.options ? item.options[0] : undefined) }];
    });
  };

  const removeItem = (menuId: string, option?: string) => {
    setSelectedItems(prev => {
      const existing = prev.find(p => p.menuId === menuId && p.option === option);
      if (existing && existing.quantity > 1) {
        return prev.map(p => (p.menuId === menuId && p.option === option) ? { ...p, quantity: p.quantity - 1 } : p);
      }
      return prev.filter(p => !(p.menuId === menuId && p.option === option));
    });
  };

  const updateOption = (menuId: string, oldOption: string | undefined, newOption: string) => {
    setSelectedItems(prev => {
      const target = prev.find(p => p.menuId === menuId && p.option === oldOption);
      if (!target) return prev;
      
      const existingNewOption = prev.find(p => p.menuId === menuId && p.option === newOption);
      if (existingNewOption && newOption !== oldOption) {
        return prev.filter(p => !(p.menuId === menuId && p.option === oldOption))
                   .map(p => (p.menuId === menuId && p.option === newOption) ? { ...p, quantity: p.quantity + target.quantity } : p);
      }

      return prev.map(p => (p.menuId === menuId && p.option === oldOption) ? { ...p, option: newOption } : p);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Keranjang masih kosong, silakan pilih menu terlebih dahulu.");
      return;
    }

    const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();
    const orderData: OrderType = {
      id: orderId,
      customerName: customerInfo.name,
      whatsapp: customerInfo.whatsapp,
      address: customerInfo.address,
      items: selectedItems.map(si => ({
        menuId: si.menuId,
        name: si.name,
        quantity: si.quantity,
        price: si.price,
        option: si.option
      })),
      totalPrice,
      status: 'Menunggu',
      createdAt: new Date().toISOString(),
    };

    // Save order locally for dashboard
    const currentOrders = storage.getOrders();
    storage.saveOrders([orderData, ...currentOrders]);

    // Prepare Professional WhatsApp Message
    let message = `*KONFIRMASI PESANAN - MIE AYAM ARSY*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*ID:* #${orderData.id}\n`;
    message += `*Waktu:* ${new Date().toLocaleString('id-ID')}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*Daftar Pesanan:*\n`;
    
    orderData.items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.quantity}x)\n`;
      if (item.option) message += `   └ Variasi: ${item.option}\n`;
      message += `   └ Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL HARGA: Rp ${totalPrice.toLocaleString('id-ID')}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*Data Pelanggan:*\n`;
    message += `👤 Nama: ${customerInfo.name}\n`;
    message += `📱 WhatsApp: ${customerInfo.whatsapp}\n`;
    message += `🏠 Alamat: ${customerInfo.address}\n\n`;
    message += `_Mohon segera diproses pesanan saya. Terima kasih!_`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    
    // Cleanup
    cartStorage.clearCart();
    setSelectedItems([]);
    setCustomerInfo({ name: '', whatsapp: '', address: '' });
    alert(`Pesanan #${orderData.id} berhasil terkirim ke sistem! Anda akan diarahkan ke WhatsApp untuk penyelesaian.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Pesan Mie Sekarang</h1>
        <p className="mt-4 text-gray-500 font-medium">Lengkapi detail untuk menikmati kelezatan Arsy di rumah Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          
          {/* Cart Section */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-amber-100 p-3 rounded-2xl text-amber-600 text-xl font-bold">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900">Keranjang Belanja</h2>
            </div>
            
            {selectedItems.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium italic mb-6">Oops! Keranjangmu masih kosong melompong.</p>
                <button 
                  onClick={() => window.location.hash = '/menu'}
                  className="px-8 py-3 bg-amber-500 text-amber-950 rounded-2xl font-black hover:bg-amber-400 transition transform hover:-translate-y-1"
                >
                  Yuk, Pilih Menu Dulu!
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedItems.map((si, index) => {
                  const menu = menuItems.find(m => m.id === si.menuId)!;
                  return (
                    <div key={`${si.menuId}-${si.option}-${index}`} className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-4 border border-gray-50 rounded-3xl hover:bg-amber-50/30 transition-all duration-300 gap-6">
                      <div className="flex-1">
                        <h4 className="font-extrabold text-gray-900 text-lg group-hover:text-amber-700 transition-colors">{si.name}</h4>
                        {menu.options && (
                          <div className="mt-3">
                            <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">Ubah Variasi:</label>
                            <div className="flex flex-wrap gap-2">
                              {menu.options.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => updateOption(si.menuId, si.option, opt)}
                                  className={`px-3 py-1 text-[10px] rounded-xl border transition-all duration-300 font-bold ${
                                    si.option === opt 
                                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm' 
                                      : 'bg-white text-gray-500 border-gray-100 hover:border-amber-200'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-6 bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-amber-100">
                        <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                          <button onClick={() => removeItem(si.menuId, si.option)} className="w-10 h-10 flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors font-bold">-</button>
                          <span className="px-4 py-2 font-black text-sm bg-white border-x border-gray-100">{si.quantity}</span>
                          <button onClick={() => addItem(si.menuId, si.option)} className="w-10 h-10 flex items-center justify-center text-amber-600 hover:bg-amber-200 transition-colors font-bold">+</button>
                        </div>
                        <p className="font-black text-lg text-amber-700 w-32 text-right">Rp {(si.price * si.quantity).toLocaleString('id-ID')}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-10 border-t border-gray-100 mt-6 flex justify-between items-end">
                  <div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Total Pembayaran</p>
                    <p className="text-4xl font-black text-amber-600">Rp {totalPrice.toLocaleString('id-ID')}</p>
                  </div>
                  <p className="text-xs text-gray-400 italic">*Belum termasuk ongkir</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Add (Optional Helper) */}
          {selectedItems.length > 0 && (
            <div className="bg-amber-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold mb-1">Masih mau nambah lagi?</h4>
                <p className="text-amber-200 text-sm">Ada banyak pilihan menu enak lainnya yang menanti!</p>
              </div>
              <button 
                onClick={() => window.location.hash = '/menu'}
                className="px-8 py-3 bg-white text-amber-950 font-black rounded-2xl hover:bg-amber-100 transition shadow-lg active:scale-95"
              >
                Lihat Menu Lagi
              </button>
            </div>
          )}
        </div>

        {/* Customer Detail Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-amber-100 sticky top-24 transform hover:-rotate-1 transition-transform duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">Detail Pengiriman</h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">Pastikan data yang Anda masukkan benar agar pengiriman lancar jaya!</p>
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-black text-amber-800/60 uppercase tracking-widest mb-2 px-1 group-focus-within:text-amber-500 transition-colors">Nama Penerima</label>
                <input 
                  required
                  type="text" 
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-amber-500 focus:ring-0 bg-gray-50 focus:bg-white outline-none transition-all duration-300 font-bold text-gray-800"
                  placeholder="Nama Lengkap Anda"
                />
              </div>
              
              <div className="group">
                <label className="block text-[10px] font-black text-amber-800/60 uppercase tracking-widest mb-2 px-1 group-focus-within:text-amber-500 transition-colors">No. WhatsApp Aktif</label>
                <input 
                  required
                  type="tel" 
                  value={customerInfo.whatsapp}
                  onChange={(e) => setCustomerInfo({...customerInfo, whatsapp: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-amber-500 focus:ring-0 bg-gray-50 focus:bg-white outline-none transition-all duration-300 font-bold text-gray-800"
                  placeholder="0812XXXXXXXX"
                />
              </div>
              
              <div className="group">
                <label className="block text-[10px] font-black text-amber-800/60 uppercase tracking-widest mb-2 px-1 group-focus-within:text-amber-500 transition-colors">Alamat Lengkap</label>
                <textarea 
                  required
                  rows={4}
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-amber-500 focus:ring-0 bg-gray-50 focus:bg-white outline-none transition-all duration-300 font-bold text-gray-800 resize-none leading-relaxed"
                  placeholder="Sebutkan patokan rumah agar kurir tidak nyasar..."
                />
              </div>
              
              <button
                type="submit"
                disabled={selectedItems.length === 0}
                className={`w-full py-5 font-black text-lg rounded-3xl transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 active:scale-95 ${
                  selectedItems.length === 0
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                    : 'bg-amber-500 text-amber-950 hover:bg-amber-400 shadow-amber-500/30'
                }`}
              >
                <span>🚀</span>
                Kirim via WhatsApp ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''})
              </button>
              
              <div className="pt-4 flex items-center gap-2 justify-center opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Secure Order via WhatsApp API
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
