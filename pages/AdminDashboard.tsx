
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { MenuItem, Order, Testimonial } from '../types';
import { generateAppetizingDescription } from '../geminiService';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'testimonials'>('orders');
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const auth = storage.getAuth();
    if (!auth.isAuthenticated) {
      navigate('/admin');
      return;
    }
    setMenu(storage.getMenu());
    setOrders(storage.getOrders());
    setTestimonials(storage.getTestimonials());
  }, [navigate]);

  const handleLogout = () => {
    storage.setAuth({ isAuthenticated: false, user: null });
    navigate('/admin');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    storage.saveOrders(updated);
  };

  const deleteMenuItem = (id: string) => {
    if (confirm('Hapus menu ini?')) {
      const updated = menu.filter(m => m.id !== id);
      setMenu(updated);
      storage.saveMenu(updated);
    }
  };

  const toggleTestimonial = (id: string) => {
    const updated = testimonials.map(t => t.id === id ? { ...t, approved: !t.approved } : t);
    setTestimonials(updated);
    storage.saveTestimonials(updated);
  };

  const optimizeDesc = async (id: string) => {
    const item = menu.find(m => m.id === id);
    if (!item) return;

    setIsOptimizing(true);
    const newDesc = await generateAppetizingDescription(item.name);
    const updated = menu.map(m => m.id === id ? { ...m, description: newDesc } : m);
    setMenu(updated);
    storage.saveMenu(updated);
    setIsOptimizing(false);
    alert('Deskripsi berhasil dioptimalkan dengan AI!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-500">Kelola operasional Mie Ayam Arsy</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {(['orders', 'menu', 'testimonials'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition ${
              activeTab === tab ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab === 'orders' ? 'Pesanan' : tab === 'menu' ? 'Kelola Menu' : 'Testimoni'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4">ID / Tanggal</th>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-6">
                      <div className="font-bold text-amber-600">#{order.id}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="font-bold text-gray-900">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.whatsapp}</div>
                      <div className="text-xs text-gray-400 truncate max-w-[150px]">{order.address}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-gray-600">
                            {item.quantity}x {item.name} {item.option && `(${item.option})`}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6 font-bold text-gray-900">
                      Rp {order.totalPrice.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer ${
                          order.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-700' : 
                          order.status === 'Diproses' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <div className="p-20 text-center text-gray-400 italic">Belum ada pesanan masuk.</div>}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Daftar Menu</h2>
              <button className="px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition text-sm">
                + Tambah Menu Baru
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menu.map(item => (
                <div key={item.id} className="p-4 border rounded-2xl flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                      <button onClick={() => deleteMenuItem(item.id)} className="text-red-400 hover:text-red-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                    <p className="text-xs text-amber-600 font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 mb-2">{item.description}</p>
                    <button 
                      disabled={isOptimizing}
                      onClick={() => optimizeDesc(item.id)}
                      className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 disabled:opacity-50"
                    >
                      {isOptimizing ? 'Optimizing...' : '🪄 Optimize with AI'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-8">Kelola Testimoni</h2>
            <div className="space-y-4">
              {testimonials.map(t => (
                <div key={t.id} className="p-6 border rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{t.name}</span>
                      <div className="flex text-amber-400 text-[10px]">
                        {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{t.comment}"</p>
                    <p className="text-[10px] text-gray-400 mt-2">{t.date}</p>
                  </div>
                  <button 
                    onClick={() => toggleTestimonial(t.id)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition ${
                      t.approved ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {t.approved ? 'Sembunyikan' : 'Tampilkan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
