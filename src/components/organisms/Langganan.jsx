import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function Langganan() {
  return (
    <div className="bg-[#0F0F0F] text-white font-lato">
      <Navbar />
      
      {/* Section: Kenapa Harus Berlangganan */}
      <section className="text-white px-10 py-20">
        <h2 className="text-2xl font-bold text-center mb-16">Kenapa Harus Berlangganan?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-center max-w-4xl mx-auto">
          <div>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/download--v1.png" className="mx-auto mb-2 w-8 h-8" alt="Download" />
            <p className="text-lg">Download Konten Pilihan</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" className="mx-6" fill="#D9D9D9">
              <path d="m791-56-64-64H200q-33 0-56.5-23.5T120-200v-527l-64-65 56-56 736 736-57 56ZM200-200h447L200-647v447Zm640-33-80-80v-327H433L233-840h527q33 0 56.5 23.5T840-760v527Z" />
            </svg>
            <p className="text-lg">Tidak Ada Iklan</p>
          </div>
          <div>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/play.png" className="mx-auto mb-2 w-8 h-8" alt="Play" />
            <p className="text-lg">Tonton Semua Konten</p>
          </div>
          <div>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/4k.png" className="mx-auto mb-2 w-8 h-8" alt="4K" />
            <p className="text-lg">Kualitas Maksimal<br />Sampai Dengan 4K</p>
          </div>
          <div>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/tv.png" className="mx-auto mb-2 w-8 h-8" alt="TV" />
            <p className="text-lg">Tonton di TV, Tablet,<br />Mobile, dan Laptop</p>
          </div>
          <div>
            <img src="https://img.icons8.com/ios-filled/50/ffffff/subtitles.png" className="mx-auto mb-2 w-8 h-8" alt="Subtitles" />
            <p className="text-lg">Subtitle Untuk Konten Pilihan</p>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1C1F] text-white px-4 md:px-20 py-20 max-w-[90%] md:max-w-[100%] mb-10 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Pilih Paketmu</h2>
        <p className="text-center text-sm text-gray-300 mb-12">Temukan paket sesuai kebutuhanmu!</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-[72px] max-w-6xl mx-auto">
          {/* Paket Individual */}
          <div className="bg-gradient-to-r from-[#5370D4] to-[#192DB7] p-6 rounded-xl w-[236px] max-w-sm">
            <div className="bg-black/50 text-white text-base font-semibold px-4 py-2 rounded-full inline-block mb-4">
              Individual
            </div>
            <p className="text-white text-sm mb-4 mt-2">
              Mulai dari <span className="font-semibold">Rp49.990</span>/bulan<br />1 Akun
            </p>
            <ul className="text-white text-sm space-y-2 mb-8 mt-6">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Tidak ada iklan
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Kualitas 720p
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Download konten pilihan
              </li>
            </ul>
            <div className="border-t border-white/30 mb-4"></div>
            <Link to="/pembayaran" className="bg-white text-[#3B7BF9] font-bold w-full py-2 mt-4 rounded-full hover:bg-[#e0eaff] transition block text-center">
              Langganan
            </Link>
            <p className="text-xs text-center mt-2 text-white/80">Syarat dan Ketentuan Berlaku</p>
          </div>

          {/* Paket Berdua */}
          <div className="bg-gradient-to-r from-[#5370D4] to-[#192DB7] p-6 rounded-xl w-[236px] max-w-sm">
            <div className="bg-black/50 text-white text-base font-semibold px-4 py-2 rounded-full inline-block mb-4">
              Berdua
            </div>
            <p className="text-white text-sm mb-4 mt-2">
              Mulai dari <span className="font-semibold">Rp79.990</span>/bulan<br />2 Akun
            </p>
            <ul className="text-white text-sm space-y-2 mb-8 mt-6">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Tidak ada iklan
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Kualitas 1080p
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Download konten pilihan
              </li>
            </ul>
            <div className="border-t border-white/30 mb-4"></div>
            <Link to="/pembayaran" className="bg-white text-[#3B7BF9] font-bold w-full py-2 mt-4 rounded-full hover:bg-[#e0eaff] transition block text-center">
              Langganan
            </Link>
            <p className="text-xs text-center mt-2 text-white/80">Syarat dan Ketentuan Berlaku</p>
          </div>

          {/* Paket Keluarga */}
          <div className="bg-gradient-to-r from-[#5370D4] to-[#192DB7] p-6 rounded-xl w-[236px] max-w-sm">
            <div className="bg-black/50 text-white text-base font-semibold px-4 py-2 rounded-full inline-block mb-4">
              Keluarga
            </div>
            <p className="text-white text-sm mb-4 mt-2">
              Mulai dari <span className="font-semibold">Rp159.990</span>/bulan<br />5–7 Akun
            </p>
            <ul className="text-white text-sm space-y-2 mb-8 mt-6">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Tidak ada iklan
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Kualitas 4K
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-1 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Download konten pilihan
              </li>
            </ul>
            <div className="border-t border-white/30 mb-4"></div>
            <Link to="/pembayaran" className="bg-white text-[#3B7BF9] font-bold w-full py-2 mt-4 rounded-full hover:bg-[#e0eaff] transition block text-center">
              Langganan
            </Link>
            <p className="text-xs text-center mt-2 text-white/80">Syarat dan Ketentuan Berlaku</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
