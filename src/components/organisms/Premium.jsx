import { Link } from 'react-router-dom';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function Premium() {
  return (
    <div className="bg-[#181A1C] text-white font-lato">
      <div className="relative w-full h-screen">
        {/* Video background */}
        <img src={asset('img/ted-lasso.jpg')} alt="Video Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

        {/* Overlay konten */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Layanan Premium <span className="text-yellow-400">🌟</span></h1>
          <p className="mb-8 text-sm md:text-base">Tingkatkan paket anda untuk dapat menonton video ini.</p>
          <p className="mb-2 mt-4 text-sm md:text-base font-semibold">Kenapa Harus Berlangganan?</p>

          {/* Icon benefit */}
          <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-gray-400 max-w-md text-center mb-8">
            <div>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/download--v1.png" className="mx-auto w-6 h-6 mb-6" alt="Download" />
              <p className="text-xs">Download Konten<br />Pilihan</p>
            </div>
            <div>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/no-ads.png" className="mx-auto w-6 h-6 mb-6" alt="No Ads" />
              <p className="text-xs">Tidak Ada Iklan</p>
            </div>
            <div>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/play.png" className="mx-auto w-6 h-6 mb-6" alt="Play" />
              <p className="text-xs">Tonton Semua Konten</p>
            </div>
            <div>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/4k.png" className="mx-auto w-6 h-6 mb-6" alt="4K" />
              <p className="text-xs">Kualitas Maksimal<br />Sampai Dengan 4K</p>
            </div>
            <div>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/tv.png" className="mx-auto w-6 h-6 mb-6" alt="TV" />
              <p className="text-xs">Tonton di TV, Tablet,<br />Mobile, dan Laptop</p>
            </div>
            <div>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/subtitles.png" className="mx-auto w-6 h-6 mb-6" alt="Subtitles" />
              <p className="text-xs">Subtitle Untuk Konten<br />Pilihan</p>
            </div>
          </div>

          {/* Tombol Upgrade */}
          <Link to="/langganan" className="mt-6 bg-blue-700 hover:bg-blue-800 transition text-white px-6 py-2 rounded-full text-sm font-semibold">
            Ubah Jadi Premium
          </Link>
        </div>
      </div>
    </div>
  );
}
