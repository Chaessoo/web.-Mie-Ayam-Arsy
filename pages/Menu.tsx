
import React, { useState, useMemo } from 'react';
import { storage } from '../utils/storage';
import { cartStorage } from '../utils/cart';
import { Category, MenuItem } from '../types';
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'Semua'>('Semua');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const menuItems = storage.getMenu();
  const navigate = useNavigate();

  const filteredItems = useMemo(() => {
    if (activeCategory === 'Semua') return menuItems;
    return menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const categories: (Category | 'Semua')[] = ['Semua', 'Makanan', 'Minuman'];

  const handleOptionChange = (itemId: string, option: string) => {
    setSelectedOptions(prev => ({ ...prev, [itemId]: option }));
  };

  const handleOrder = (item: MenuItem) => {
    const option = selectedOptions[item.id] || (item.options ? item.options[0] : undefined);
    console.log('Adding to cart:', item.name, option);
    cartStorage.addToCart(item, option);
    console.log('Cart after add:', cartStorage.getCart());
    // Small delay to ensure localStorage is updated
    setTimeout(() => {
      navigate('/order');
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-screen text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Daftar Menu</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Pilih menu favoritmu. Kamu bisa tentukan level pedas mie atau pilihan suhu minumanmu di sini!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center space-x-2 mb-12 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-amber-500 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300 hover:text-amber-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
            <div className="relative h-52 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-amber-700 font-extrabold shadow-md text-sm border border-amber-100">
                Rp {item.price.toLocaleString('id-ID')}
              </div>
              <div className="absolute bottom-4 left-4 bg-amber-500 px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-widest shadow-sm">
                {item.category}
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
                {item.description}
              </p>
              
              {item.options && (
                <div className="mb-6 bg-amber-50/50 p-3 rounded-2xl border border-amber-100/50">
                  <label className="text-[10px] uppercase font-black text-amber-800/60 mb-2 block tracking-widest">
                    {item.category === 'Makanan' ? 'Pilih Level Pedas' : 'Pilih Suhu'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleOptionChange(item.id, opt)}
                        className={`text-[10px] px-2 py-2 rounded-xl border transition-all duration-300 font-black tracking-tight ${
                          (selectedOptions[item.id] || item.options![0]) === opt
                            ? 'bg-amber-500 text-white border-amber-500 shadow-md transform scale-[1.02]'
                            : 'bg-white text-gray-500 border-gray-100 hover:border-amber-200 hover:bg-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto">
                <button 
                  onClick={() => handleOrder(item)}
                  className="w-full py-3.5 bg-amber-900 text-white font-black text-sm rounded-2xl hover:bg-amber-500 transition-all duration-300 shadow-lg shadow-amber-900/10 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Pesan Sekarang</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-32">
          <div className="text-4xl mb-4">🍽️</div>
          <p className="text-gray-400 font-medium italic">Belum ada menu di kategori ini.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
