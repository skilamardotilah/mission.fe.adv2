import { useNavigate } from 'react-router-dom';
import { setRegistered } from '../../utils/auth.js';
import RegisterForm from '../organisms/RegisterForm.jsx';

import Bg from '../../assets/img/bg-daftar.jpg';
import Logo from '../../assets/img/Logo.png';

export default function Daftar() {
  const nav = useNavigate();

  const handleDaftar = (form, e) => {
    e?.preventDefault?.();
    setRegistered();
    nav('/masuk');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <img src={Bg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="relative">
        <RegisterForm onSubmit={handleDaftar} logoSrc={Logo} />
      </div>
    </div>
  );
}
