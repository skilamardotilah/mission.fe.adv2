import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const hideTimer = useRef(null);

  const blockNav = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLogout = () => {
    navigate('/masuk');
  };

  const openMenu = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOpen(true);
  };
  const closeMenuSoft = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpen(false), 150);
  };
  const toggleMenu = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setOpen((s) => !s);
  };

  return (
    <nav className="w-full mx-auto h-[70px] md:h-[94px] flex items-center justify-between px-5 md:px-20 py-[25px] bg-[#181A1C] text-white">
      {/* Logo + Menu */}
      <div className="flex items-center gap-[12px] w-[268px] h-[44px] md:gap-[80px] md:w-[520px] md:h-[44px]">
        {/* Make logo clickable to go to Beranda */}
        <Link to="/Beranda.jsx" className="flex items-center gap-[4px] w-auto h-[44px] group cursor-pointer">
          <img src={asset('img/movie.png')} alt="Chill Logo" className="w-[29.55px] h-[26px] mr-2 md:mr-0 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline text-[32px] leading-[55px] font-normal font-londrina group-hover:text-blue-400 transition-colors">CHILL</span>
        </Link>

        {/* Links → enabled navigation */}
        <div className="flex items-center space-x-4 md:space-x-8 text-[12px] md:text-[18px] font-medium font-lato">
          <Link to="/series" className="text-white hover:text-gray-400 cursor-pointer">
            Series
          </Link>
          <Link to="/film" className="text-white hover:text-gray-400 cursor-pointer">
            Film
          </Link>
          <Link to="/daftar-saya" className="text-white hover:text-gray-400 min-w-[80px] tracking-[0.2px] text-center cursor-pointer">
            Daftar Saya
          </Link>
        </div>
      </div>

      {/* Avatar + Dropdown (state-based) */}
      <div className="relative ml-auto" onMouseEnter={openMenu} onMouseLeave={closeMenuSoft}>
        <button type="button" onClick={toggleMenu} className="flex items-center space-x-2 cursor-pointer select-none" aria-haspopup="menu" aria-expanded={open}>
          <img src={asset('img/avatar.png')} alt="Profile" className="rounded-full w-[30px] h-[30px] md:h-[40px] md:w-[40px]" />
          <img src={asset('img/arrow-down.png')} alt="Down Arrow" className={`w-[14px] h-[8.645px] md:w-[10px] md:h-[6.645px] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        <div
          role="menu"
          className={`absolute right-0 mt-2 w-48 bg-[#141414] border border-gray-700 rounded-md shadow-lg z-50 transition-opacity duration-150
                     ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenuSoft}
        >
          {/* dropdown: blok navigasi juga */}
          <Link to="/profil" className="flex items-center px-3 py-2 text-sm md:px-4 md:py-3 md:text-base hover:bg-gray-800 text-white hover:text-blue-500">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 18a8 8 0 1116 0H2z" />
            </svg>
            Profil Saya
          </Link>

          <Link to="/premium" className="flex items-center px-3 py-2 text-sm md:px-4 md:py-3 md:text-base hover:bg-gray-800 text-white hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273 -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
            Ubah Premium
          </Link>

          {/* hanya ini yang benar-benar navigate */}
          <button onClick={handleLogout} className="w-full text-left flex items-center px-3 py-2 text-sm md:px-4 md:py-3 md:text-base hover:bg-gray-800 text-white hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 mr-2">
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a1.5 1.5 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
            Keluar
          </button>
        </div>
      </div>
    </nav>
  );
}
