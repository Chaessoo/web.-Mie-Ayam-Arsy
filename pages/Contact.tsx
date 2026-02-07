
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900">Hubungi Kami</h1>
        <p className="mt-4 text-gray-600">Kami siap melayani Anda. Datang langsung ke warung kami atau pesan online.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Informasi Kontak</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl">📍</div>
                <div>
                  <h4 className="font-bold text-gray-900">Alamat Warung</h4>
                  <p className="text-gray-600">Jl. Pualam Raya  No. 43, Kelurahan Sumur batu, Kec.Kemayoran, Jakarta pusat, Indonesia</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl">📞</div>
                <div>
                  <h4 className="font-bold text-gray-900">WhatsApp Admin</h4>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-amber-600 hover:underline">{WHATSAPP_NUMBER}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xl">⏰</div>
                <div>
                  <h4 className="font-bold text-gray-900">Jam Operasional</h4>
                  <p className="text-gray-600">Senin - Sabtu: 07:00 - 21:00</p>
                  <p className="text-gray-600">Minggu: 07:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-500 rounded-2xl p-8 text-amber-950">
            <h3 className="text-xl font-bold mb-4">Ingin Menjadi Bagian dari Kami?</h3>
            <p className="mb-6 opacity-90">Kami selalu membuka peluang kerja sama atau bagi Anda yang ingin memberikan masukan membangun.</p>
            <a 
              href={`mailto:hello@mieayamarsy.com`} 
              className="inline-block px-6 py-3 bg-amber-950 text-white font-bold rounded-xl hover:bg-black transition"
            >
              Kirim Email
            </a>
          </div>
        </div>

        <div className="h-full min-h-[450px] bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.90807567705!2d106.789155!3d-6.284245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e070868877%3A0x600742183e839612!2sMie%20Ayam!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Mie Ayam Arsy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
