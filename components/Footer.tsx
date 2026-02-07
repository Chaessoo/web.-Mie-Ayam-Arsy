
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-amber-400">Mie Ayam Arsy</span>
            <p className="mt-4 text-amber-100 max-w-xs">
              Menghadirkan kehangatan semangkuk mie ayam berkualitas tinggi sejak dulu. Lezat, Gurih, dan Bikin Nagih!
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigasi</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-amber-400 transition">Beranda</Link></li>
              <li><Link to="/menu" className="hover:text-amber-400 transition">Daftar Menu</Link></li>
              <li><Link to="/order" className="hover:text-amber-400 transition">Pesan Online</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition">Hubungi Kami</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Jam Buka</h3>
            <ul className="mt-4 space-y-2 text-amber-100">
              <li>Senin - Sabtu: 07:00 - 21:00</li>
              <li>Minggu: 07:00 - 20:00</li>
              <li className="pt-2 italic text-amber-300">"Setiap hari menyajikan yang terbaik."</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-amber-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Mie Ayam Arsy. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="text-sm">Dibuat dengan ❤️ untuk pecinta kuliner Indonesia.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
