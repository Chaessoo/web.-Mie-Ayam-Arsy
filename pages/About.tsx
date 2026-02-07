
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 space-y-24">
      {/* Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 underline decoration-amber-400 underline-offset-8">Cerita Mie Ayam Arsy</h1>
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <p>
              Mie Ayam Arsy bermula dari kecintaan keluarga kami terhadap cita rasa mie ayam tradisional yang gurih dan otentik. Dimulai dari sebuah gerobak kecil di sudut jalan, kami berkomitmen untuk selalu menyajikan semangkuk kehangatan bagi setiap pelanggan.
            </p>
            <p>
              Nama "Arsy" sendiri diambil sebagai doa agar usaha ini membawa keberkahan dan kenyamanan bagi siapa saja yang menikmatinya, layaknya sebuah tempat bernaung yang teduh dan menyenangkan.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-amber-100 rounded-3xl transform rotate-2"></div>
          <img
            src="/warung.jpeg"
            alt="Warung Arsy"
            className="relative rounded-2xl shadow-xl w-full object-cover h-96"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-amber-900 text-white rounded-3xl p-12 md:p-20 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-6">Visi Kami</h2>
            <p className="text-xl text-amber-100 italic">
              "Menjadi destinasi kuliner mie ayam nomor satu yang menyatukan rasa, kualitas, dan kebahagiaan dalam setiap suapan."
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-amber-400 mb-6">Misi Kami</h2>
            <ul className="space-y-4 list-disc list-inside text-amber-100">
              <li>Menjaga konsistensi rasa dengan resep tradisional yang berkualitas.</li>
              <li>Memberikan pelayanan prima yang ramah dan cepat bagi pelanggan.</li>
              <li>Berinovasi dalam varian menu tanpa menghilangkan identitas rasa asli.</li>
              <li>Memastikan kebersihan dan kehalalan produk di setiap tahap produksi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Komitmen Kualitas</h2>
        <div className="p-8 bg-white border border-amber-100 rounded-2xl shadow-sm">
          <p className="text-gray-600 text-lg italic">
            "Kami percaya bahwa makanan bukan sekadar pengisi perut, tapi pembangun memori. Itulah sebabnya di Mie Ayam Arsy, kami tidak pernah berkompromi dengan kualitas bahan. Ayam kami segar, mie kami higienis, dan cinta kami tulus."
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
