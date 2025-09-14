// src/pages/Beranda.jsx
import { useState } from 'react';
import Navbar from '@/components/organisms/Navbar.jsx';
import CarouselRow from '@/components/organisms/CarouselRow.jsx';
import Footer from '@/components/organisms/Footer.jsx';
import HeroSection from '@/components/organisms/HeroSection.jsx';
import FilmDetailPopup from '@/components/organisms/FilmDetailPopup.jsx';
import SeriesPlayer from '@/components/molecules/SeriesPlayer.jsx';
import { useWatchlist } from '@/contexts/WatchlistContext.jsx';

import ListView from '../ListView.jsx';
import { cont, topToday, trending, newRelease } from '../../data/homeData.js';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function Beranda() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const { addToWatchlist } = useWatchlist();

  const handlePosterClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleAddToWatchlist = (item) => {
    addToWatchlist(item);
    handleClosePopup();
  };

  const handleStartWatching = () => {
    setShowPlayer(true);
  };

  return (
    <div className="bg-[#181A1C] text-white font-lato min-h-screen">
      <Navbar />

      {/* HERO */}
      <HeroSection
        bg={asset('img/Poster/hero.png')}
        title="Duty After School"
        description={`Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.`}
        onStart={handleStartWatching}
      />

      {/* CAROUSELS */}
      <CarouselRow title="Melanjutkan Tonton Film" items={cont} variant="landscape" onPosterClick={handlePosterClick} />
      <CarouselRow title="Top Rating Film dan Series Hari Ini" items={topToday} variant="portrait" onPosterClick={handlePosterClick} />
      <CarouselRow title="Film Trending" items={trending} variant="portrait" onPosterClick={handlePosterClick} />
      <CarouselRow title="Rilis Baru" items={newRelease} variant="portrait" onPosterClick={handlePosterClick} />

      {/* POPUP */}
      {selectedItem && <FilmDetailPopup item={selectedItem} onClose={handleClosePopup} onAddToWatchlist={handleAddToWatchlist} type="film" />}

      {/* PLAYER */}
      {showPlayer && (
        <div className="fixed inset-0 z-[9999]">
          <SeriesPlayer onClose={() => setShowPlayer(false)} itemId="duty-after-school" type="series" />
        </div>
      )}

      <Footer />
    </div>
  );
}
