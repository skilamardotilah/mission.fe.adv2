const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;


export default function Footer() {
  return (
    <footer className="w-full text-white border-t border-gray-600 py-[60px] px-4 md:px-[80px]">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-[40px] text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src={asset('img/movie.png')} alt="Chill Logo" className="lg:w-[50px] lg:h-auto w-[28px] h-[25px]" />
            <span className="lg:text-[50px] text-[24px] leading-[55px] font-normal font-['Londrina_Solid']">CHILL</span>
          </div>
          <p className="text-gray-400">@2025 Chill All Rights Reserved.</p>
        </div>

        <div className="lg:hidden flex flex-col space-y-2">
          <details className="group">
            <summary className="font-medium text-[16px] cursor-pointer flex justify-between items-center py-1">
              Genre
              <span className="text-white-400 text-[24px] group-open:rotate-90 transition-transform">›</span>
            </summary>
            <div className="mt-1 ml-4 text-gray-400 grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
              {['Aksi', 'Drama', 'Komedi', 'Sains & Alam', 'Anak-anak', 'Fantasi Ilmiah & Fantasi', 'Petualangan', 'Thriller', 'Anime', 'Kejahatan', 'Perang', 'Britania', 'KDrama', 'Romantis'].map((g) => (
                <p key={g}>{g}</p>
              ))}
            </div>
          </details>
          <details className="group">
            <summary className="font-medium text-[16px] cursor-pointer flex justify-between items-center py-1">
              Bantuan
              <span className="text-white-400 text-[24px] group-open:rotate-90 transition-transform">›</span>
            </summary>
            <div className="mt-1 ml-4 flex flex-col gap-1 text-gray-400 text-sm">
              {['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'].map((i) => (
                <p key={i}>{i}</p>
              ))}
            </div>
          </details>
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          <h2 className="font-semibold">Genre</h2>
          <div className="text-gray-400 grid grid-cols-4 gap-x-12 gap-y-2">
            {['Aksi', 'Drama', 'Komedi', 'Sains & Alam', 'Anak-anak', 'Fantasi Ilmiah & Fantasi', 'Petualangan', 'Thriller', 'Anime', 'Kejahatan', 'Perang', '', 'Britania', 'KDrama', 'Romantis', ''].map((g, i) => (
              <p key={i}>{g}</p>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          <h2 className="font-semibold">Bantuan</h2>
          <div className="flex flex-col gap-2 text-gray-400">
            {['FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'].map((i) => (
              <p key={i}>{i}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
