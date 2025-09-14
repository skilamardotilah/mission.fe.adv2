import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function Pembayaran() {
  return (
    <div className="bg-[#0F0F0F] text-white font-lato">
      <Navbar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-semibold mb-8">Ringkasan Pembayaran</h2>
        <div className="gap-8 lg:gap-12 flex flex-col md:flex-row">
          {/* Paket Individual */}
          <div className="bg-gradient-to-r from-[#5370D4] to-[#192DB7] p-6 rounded-xl md:w-[236px] w-full h-[400px]">
            <div className="bg-black/50 text-white text-base font-semibold px-4 py-2 rounded-full inline-block mb-4">
              Individual
            </div>
            <p className="text-white text-sm mb-4 mt-2">
              Mulai dari <span className="font-semibold">Rp49.990</span>/bulan<br />1 Akun
            </p>
            <ul className="text-white text-sm space-y-2 mb-8 mt-6">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Tidak ada iklan
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Kualitas 720p
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.086l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Download konten pilihan
              </li>
            </ul>
            <div className="border-t border-white/30 mb-4"></div>
            <button className="bg-white text-[#3B7BF9] font-bold w-full py-2 mt-4 rounded-full">
              Langganan
            </button>
            <p className="text-xs text-center mt-2 text-white/80">
              Syarat dan Ketentuan Berlaku
            </p>
          </div>

          {/* Metode Pembayaran & Ringkasan */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-lg mb-4">Metode Pembayaran</p>
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex justify-center gap-2 border border-white px-32 py-2 rounded-lg hover:bg-white/10">
                  <img src="https://img.icons8.com/color/32/visa.png" className="w-6 h-6" alt="Visa" />
                  <img src="https://img.icons8.com/color/32/mastercard-logo.png" className="w-6 h-6" alt="MasterCard" />
                  <img src="https://img.icons8.com/color/32/amex.png" className="w-6 h-6" alt="Amex" />
                  <span>Kartu Debit/Kredit</span>
                </button>
                <button className="flex items-center gap-2 border border-white px-32 py-2 rounded-lg hover:bg-white/10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/BCA_logo.svg" className="w-6 h-6" alt="BCA" />
                  <span>BCA Virtual Account</span>
                </button>
              </div>
            </div>

            {/* Voucher */}
            <div className="mb-6 mt-4">
              <p className="text-lg mb-4">Kode Voucher (Jika ada)</p>
              <div className="flex flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Masukkan kode voucher"
                  className="w-[823px] bg-transparent border border-white px-4 py-2 rounded-lg text-white" 
                />
                <button className="w-[80px] bg-[#2E2E2E] px-2 py-2 rounded-full text-sm text-white">
                  Gunakan
                </button>
              </div>
            </div>

            {/* Ringkasan Transaksi */}
            <div className="mb-6 mt-4">
              <div className="w-full max-w-[400px]">
                <p className="text-lg mb-4">Ringkasan Transaksi</p>
                <div className="space-y-1 text-base text-gray-300">
                  <div className="flex justify-between">
                    <span>Paket Premium Individual</span>
                    <span>Rp49.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya Admin</span>
                    <span>Rp3.000</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Pembayaran</span>
                    <span>Rp52.000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <button className="bg-[#09147A] text-white font-semibold w-24 py-2 rounded-full">
                Bayar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
