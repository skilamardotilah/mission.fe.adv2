import { Routes, Route, Navigate } from 'react-router-dom';
import Beranda from './components/pages/Beranda.jsx';
import Masuk from './components/pages/Masuk.jsx';
import Daftar from './components/pages/Daftar.jsx';
import Series from './components/pages/Series.jsx';
import Film from './components/pages/Film.jsx';

import DaftarSaya from './components/pages/DaftarSaya.jsx';
import Profil from './components/organisms/Profil.jsx';
import Langganan from './components/organisms/Langganan.jsx';
import Premium from './components/organisms/Premium.jsx';
import Pembayaran from './components/organisms/Pembayaran.jsx';
import FilmPlayer from './components/molecules/FilmPlayer.jsx';
import SeriesPlayer from './components/molecules/SeriesPlayer.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <main className="flex-1">
      <Routes>
        
        {/* Show Beranda immediately at root */}
        <Route path="/" element={<Beranda />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/daftar" element={<Daftar />} />

        <Route element={<ProtectedRoute />}>
          {/* You may want to keep /beranda for direct access, or remove if not needed */}
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/series" element={<Series />} />
          <Route path="/film" element={<Film />} />
          <Route path="/daftar-saya" element={<DaftarSaya />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/langganan" element={<Langganan />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/film-player" element={<FilmPlayer />} />
          <Route path="/series-player" element={<SeriesPlayer />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
