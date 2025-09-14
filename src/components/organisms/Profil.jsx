import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function Profil() {
  const [showPassword, setShowPassword] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(asset('img/avatar.png'));
  const fileInputRef = useRef(null);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-[#181A1C] text-white min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="px-4 md:px-16 py-12 bg-[#0E0E10]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Status Langganan */}
          <div className="md:w-1/3 mt-14 w-full order-1 md:order-2 md:h-[210px]">
            <div className="bg-white/20 h-[193px] rounded-xl p-6 flex flex-col justify-between">
              <div className="flex gap-[20px] items-start">
                <img src={asset('img/profile/warning.png')} alt="warning" className="w-[78px] h-[78px]" />
                <div>
                  <p className="font-bold text-xl leading-[140%] tracking-[0.2px] text-gray-200">
                    Saat ini anda belum berlangganan
                  </p>
                  <p className="text-sm leading-[140%] text-white-400 mt-2">
                    Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Link to="/langganan" className="bg-black/20 text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-gray-200 hover:text-black">
                  Mulai Berlangganan
                </Link>
              </div>
            </div>
          </div>

          {/* Profil Form */}
          <div className="md:w-2/3 w-full order-2 md:order-1 space-y-6">
            <h2 className="text-3xl font-semibold">Profil Saya</h2>
            <div className="flex items-center gap-4">
              <img 
                src={previewPhoto} 
                className="w-20 h-20 rounded-full border object-cover" 
                alt="Foto Profil" 
              />
              <div>
                <label 
                  htmlFor="fileInput"
                  className="text-sm text-blue-500 border border-blue-500 rounded-full px-4 py-2 font-bold cursor-pointer hover:bg-blue-700 hover:text-white"
                  onClick={handlePhotoClick}
                >
                  Ubah Foto
                </label>
                <input 
                  id="fileInput" 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <div className="flex items-center gap-1 mt-4 text-xs text-gray-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-blue-500 hover:text-blue-400"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" 
                    />
                  </svg>
                  <p>Maksimal 2MB</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-base">Nama Pengguna</label>
                <input 
                  type="text" 
                  placeholder="William" 
                  className="w-full bg-[#1A1A1D] rounded-md px-4 py-2" 
                />
              </div>
              <div>
                <label className="block mb-1 text-base">Email</label>
                <input 
                  type="email" 
                  placeholder="william1980@gmail.com"
                  className="w-full bg-[#1A1A1D] rounded-md px-4 py-2 text-gray-400" 
                />
              </div>
              <div>
                <label className="block mb-1 text-base">Kata Sandi</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="•••••••"
                    className="w-full bg-[#1A1A1D] rounded-md px-4 py-2 pr-10" 
                  />
                  <button 
                    onClick={togglePassword} 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-70"
                  >
                    👁
                  </button>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full">
                Simpan
              </button>
            </div>
          </div>
        </div>

        {/* Daftar Saya */}
        <section className="mt-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Daftar Saya</h3>
            <Link to="/daftar-saya" className="text-sm text-blue-400 hover:underline">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="bg-[#1A1A1D] p-2 rounded-md">
              <img src={asset('img/Poster/1.png')} className="rounded-md w-full object-cover" alt="Film 1" />
            </div>
            <div className="bg-[#1A1A1D] p-2 rounded-md">
              <img src={asset('img/Poster/2.png')} className="rounded-md w-full object-cover" alt="Film 2" />
            </div>
            <div className="bg-[#1A1A1D] p-2 rounded-md">
              <img src={asset('img/Poster/3.png')} className="rounded-md w-full object-cover" alt="Film 3" />
            </div>
            <div className="bg-[#1A1A1D] p-2 rounded-md">
              <img src={asset('img/Poster/4.png')} className="rounded-md w-full object-cover" alt="Film 4" />
            </div>
            <div className="bg-[#1A1A1D] p-2 rounded-md">
              <img src={asset('img/Poster/Number=1.png')} className="rounded-md w-full object-cover" alt="Film 5" />
            </div>
            <div className="bg-[#1A1A1D] p-2 rounded-md">
              <img src={asset('img/Poster/Number=2.png')} className="rounded-md w-full object-cover" alt="Film 6" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
