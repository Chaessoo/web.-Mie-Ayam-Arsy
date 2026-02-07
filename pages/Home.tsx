
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import { WHATSAPP_NUMBER } from '../constants';

const Home: React.FC = () => {
  const testimonials = storage.getTestimonials().filter(t => t.approved).slice(0, 3);

  useEffect(() => {
    // Test localStorage
    try {
      localStorage.setItem('test_key', 'test_value');
      const testValue = localStorage.getItem('test_key');
      console.log('localStorage test:', testValue);
      localStorage.removeItem('test_key');
      console.log('localStorage is working');
    } catch (error) {
      console.error('localStorage error:', error);
    }
  }, []);
  
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://swastikaadvertising.com/wp-content/uploads/2022/05/1-7-1024x1024.jpg"
            alt="Mie Ayam Arsy"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Mie Ayam Arsy <br />
            <span className="text-amber-400">Lezat, Gurih, dan Bikin Nagih!</span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-2xl">
            Nikmati kelezatan mie ayam otentik dengan resep rahasia yang telah turun temurun. Dibuat dengan bahan segar pilihan setiap harinya.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link 
              to="/order" 
              className="px-8 py-4 bg-amber-500 text-amber-950 font-bold rounded-lg hover:bg-amber-400 transition transform hover:scale-105"
            >
              Pesan Sekarang
            </Link>
            <Link 
              to="/menu" 
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Lihat Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Mengapa Memilih Kami?</h2>
          <p className="mt-4 text-gray-600">Komitmen kami untuk memberikan kualitas terbaik bagi pelanggan.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: "Bahan Premium", 
              desc: "Kami hanya menggunakan daging ayam segar dan bumbu-bumbu alami tanpa bahan pengawet.",
              icon: "🍗"
            },
            { 
              title: "Mie Buatan Sendiri", 
              desc: "Mie kami diproduksi setiap hari untuk memastikan tekstur yang kenyal dan rasa yang otentik.",
              icon: "🍜"
            },
            { 
              title: "Pelayanan Cepat", 
              desc: "Kepuasan Anda adalah prioritas. Kami melayani dengan sepenuh hati dan kecepatan tinggi.",
              icon: "⚡"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Apa Kata Mereka?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-xl shadow-sm italic text-gray-700 relative">
                <div className="absolute -top-4 left-8 text-4xl text-amber-400 opacity-50">"</div>
                <p className="mb-6">"{t.comment}"</p>
                <div className="flex items-center gap-3 not-italic">
                  <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-800">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-amber-900 rounded-3xl p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-800 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Lapar Menyerang?</h2>
          <p className="text-amber-100 text-lg mb-8 relative z-10">Pesan sekarang dan nikmati kelezatannya di rumah Anda!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/order"
              className="inline-block px-10 py-4 bg-amber-400 text-amber-950 font-bold rounded-xl hover:bg-amber-300 transition transform hover:scale-105"
            >
              Pesan Sekarang
            </Link>
            <button
              onClick={() => {
                const message = encodeURIComponent('Halo, saya ingin memesan mie ayam dari Mie Ayam Arsy. Bisa bantu saya?');
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
              }}
              className="inline-block px-10 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-400 transition transform hover:scale-105 flex items-center gap-2"
            >
              <span>📱</span> Chat WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
