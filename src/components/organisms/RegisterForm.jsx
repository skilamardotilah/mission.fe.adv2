// src/components/organisms/RegisterForm.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button.jsx';
import Input from '@/components/atoms/Input.jsx';

export default function RegisterForm({ onSubmit, logoSrc, showLoginLink = true, initial = { username: '', password: '', confirm: '' } }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim()) return setError('Username wajib diisi.');
    if (!form.password) return setError('Kata sandi wajib diisi.');
    if (form.password !== form.confirm) {
      return setError('Konfirmasi kata sandi tidak cocok.');
    }
    onSubmit?.(form, e);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[320px] sm:w-[380px] p-6 rounded-2xl bg-[#181A1Cd6] flex flex-col gap-5">
      {/* Logo */}
      {logoSrc && (
        <div className="flex justify-center">
          <img src={logoSrc} alt="CHILL Logo" className="w-[85px] h-auto" />
        </div>
      )}

      {/* Headings */}
      <div className="text-center flex flex-col gap-1">
        <h2 className="text-white text-base sm:text-lg font-semibold">Daftar</h2>
        <p className="text-white text-[11px] sm:text-xs font-light opacity-80">Selamat datang!</p>
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

      {/* Confirm Password */}
      <div className="w-full">
        <Input
          label="Konfirmasi Kata Sandi"
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          placeholder="Masukkan kata sandi"
          leftIcon="lock"
          rounded="full"
          className="border border-gray-400 placeholder-gray-400 text-white text-xs sm:text-sm"
        />
        {error && <p className="text-red-400 text-[11px] mt-2">{error}</p>}
      </div>

      {/* Link ke Login */}
      {showLoginLink && (
        <div className="text-[11px] sm:text-xs text-white/50">
          Sudah punya akun?{' '}
          <Link to="/masuk" className="text-white underline-offset-4 hover:underline">
            Masuk
          </Link>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 w-full">
        <Button type="submit" variant="gray" className="w-full border border-[#E7E3FC3B] ">
          Daftar
        </Button>

        <div className="text-center text-white opacity-70 text-[11px]">Atau</div>

        <Button variant="sso" className="w-full flex items-center justify-center gap-2 text-xs sm:text-sm border border-gray-400 text-white">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="w-4 h-4" />
          Daftar dengan Google
        </Button>
      </div>
    </form>
  );
}
