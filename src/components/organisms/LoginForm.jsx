import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button.jsx';
import Input from '@/components/atoms/Input.jsx';

export default function LoginForm({ onSubmit, logoSrc, showRegisterLink = true, initial = { username: '', password: '' } }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form, e);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[300px] sm:w-[360px] p-4 sm:p-6 rounded-xl bg-[#181A1CD6] flex flex-col gap-5">
      {/* Logo */}
      <div className="flex justify-center">{logoSrc ? <img src={logoSrc} alt="CHILL Logo" className="w-[100px] h-auto" /> : null}</div>

      {/* Heading */}
      <div className="text-center flex flex-col gap-1">
        <h2 className="text-white text-lg sm:text-xl font-semibold">Masuk</h2>
        <p className="text-white text-xs sm:text-sm font-light">Selamat datang kembali!</p>
      </div>

      {/* Username */}
      <Input
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Masukkan username"
        leftIcon="user"
        rounded="full"
        className="border border-gray-400 placeholder-gray-400 text-white text-xs sm:text-sm"
      />

      {/* Password */}
      <Input
        label="Kata Sandi"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Masukkan kata sandi"
        leftIcon="lock"
        rounded="full"
        className="border border-gray-400 placeholder-gray-400 text-white text-xs sm:text-sm"
      />

      {/* Helper links */}
      <div className="flex justify-between text-[11px] sm:text-xs w-full">
        <span className="text-white/50">
          {showRegisterLink && (
            <>
              Belum punya akun?{' '}
              <Link to="/daftar" className="text-white underline-offset-4 hover:underline">
                Daftar
              </Link>
            </>
          )}
        </span>
        <a href="#" className="text-white">
          Lupa kata sandi?
        </a>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 w-full">
        <Button type="submit" variant="gray" className="w-full border border-[#E7E3FC3B]">
          Masuk
        </Button>

        <div className="text-center text-white opacity-70 text-xs">Atau</div>

        <Button variant="sso" className="w-full flex items-center justify-center gap-2">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="w-4 h-4" />
          <span className="text-sm">Masuk dengan Google</span>
        </Button>
      </div>
    </form>
  );
}
