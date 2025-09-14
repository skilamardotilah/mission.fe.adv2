import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/organisms/LoginForm.jsx';
import { setLoggedIn, isRegistered } from '@/utils/auth.js';
import Logo from '@/assets/img/Logo.png';
import Bg from '@/assets/img/background-chill.jpg';
import { useState } from 'react';

export default function Masuk() {
  const nav = useNavigate();
  const [error, setError] = useState('');

  const handleMasuk = (form) => {
    if (!isRegistered()) {
      setError('Akun belum terdaftar. Silakan daftar dulu.');
      window.alert('You have to register first');
      return nav('/daftar');
    }
    setLoggedIn();
    nav('/beranda');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <img src={Bg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center opacity-70" />
      <div className="relative flex flex-col items-center gap-4">
        <LoginForm onSubmit={handleMasuk} logoSrc={Logo} />
        {error && <p className="text-red-400 text-sm mt-2 animate-pulse">{error}</p>}
      </div>
    </div>
  );
}
