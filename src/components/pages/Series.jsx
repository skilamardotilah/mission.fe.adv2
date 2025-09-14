// src/pages/Series.jsx
import { useState } from 'react';
import Navbar from '@/components/organisms/Navbar.jsx';
import CarouselRow from '@/components/organisms/CarouselRow.jsx';
import Footer from '@/components/organisms/Footer.jsx';
import HeroSection from '@/components/organisms/HeroSection.jsx';
import FilmDetailPopup from '@/components/organisms/FilmDetailPopup.jsx';
import SeriesPlayer from '@/components/molecules/SeriesPlayer.jsx';
import { useWatchlist } from '@/contexts/WatchlistContext.jsx';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

// Series data
const seriesData = {
  continueWatching: [
    { src: asset('img/Poster/landscape/image 215.png'), title: "Stranger Things", rating: '4.8/5' },
    { src: asset('img/Poster/landscape/Type=10.png'), title: "The Crown", rating: '4.6/5' },
    { src: asset('img/Poster/landscape/Type=11.png'), title: "Money Heist", rating: '4.7/5' },
    { src: asset('img/Poster/landscape/Type=13.png'), title: "Dark", rating: '4.9/5' },
    { src: asset('img/Poster/landscape/Type=14.png'), title: "Ozark", rating: '4.5/5' },
  ],
  chillSeries: [
    { src: asset('img/Poster/Number=1.png'), title: "Friends", rating: '4.8/5' },
    { src: asset('img/Poster/Number=2.png'), title: "The Office", rating: '4.7/5' },
    { src: asset('img/Poster/Number=3.png'), title: "Parks and Recreation", rating: '4.6/5' },
    { src: asset('img/Poster/Number=4.png'), title: "Brooklyn Nine-Nine", rating: '4.5/5' },
    { src: asset('img/Poster/Number=5.png'), title: "The Good Place", rating: '4.7/5' },
    { src: asset('img/Poster/Number=6.png'), title: "Schitt's Creek", rating: '4.8/5' },
    { src: asset('img/Poster/Number=7.png'), title: "Community", rating: '4.4/5' },
    { src: asset('img/Poster/Number=8.png'), title: "Arrested Development", rating: '4.6/5' },
  ],
  topRating: [
    { src: asset('img/Poster/Number=9.png'), title: "Breaking Bad", rating: '4.9/5', badge: 'Top 10' },
    { src: asset('img/Poster/Number=10.png'), title: "Game of Thrones", rating: '4.8/5', badge: 'Top 10' },
    { src: asset('img/Poster/Number=11.png'), title: "The Wire", rating: '4.9/5', badge: 'Top 10' },
    { src: asset('img/Poster/Number=12.png'), title: "The Sopranos", rating: '4.8/5', badge: 'Top 10' },
    { src: asset('img/Poster/Number=13.png'), title: "Mad Men", rating: '4.7/5', badge: 'Top 10' },
    { src: asset('img/Poster/Number=14.png'), title: "Better Call Saul", rating: '4.8/5', badge: 'Top 10' },
  ],
  trending: [
    { src: asset('img/Poster/Number=15.png'), title: "Euphoria", rating: '4.6/5', badge: 'Trending' },
    { src: asset('img/Poster/Number=16.png'), title: "The Last of Us", rating: '4.8/5', badge: 'Trending' },
    { src: asset('img/Poster/Number=1.png'), title: "Wednesday", rating: '4.7/5', badge: 'Trending' },
    { src: asset('img/Poster/Number=2.png'), title: "House of the Dragon", rating: '4.5/5', badge: 'Trending' },
    { src: asset('img/Poster/Number=3.png'), title: "The Bear", rating: '4.8/5', badge: 'Trending' },
    { src: asset('img/Poster/Number=4.png'), title: "Yellowstone", rating: '4.6/5', badge: 'Trending' },
  ]
};

export default function Series() {
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
    // Add isSeries property to identify this as a series
    const seriesItem = { ...item, isSeries: true };
    addToWatchlist(seriesItem);
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
        bg={asset('img/series/hero-series.png')}
        title="Ted Lasso"
        description={`Pelatih sepak bola perguruan tinggi Amerika Ted Lasso pergi ke London untuk mengelola AFC Richmond, tim sepak bola Liga Utama Inggris yang kesulitan.`}
        onStart={handleStartWatching}
      />

      {/* CAROUSELS */}
      <CarouselRow 
        title="Melanjutkan Tonton Series" 
        items={seriesData.continueWatching} 
        variant="landscape"
        onPosterClick={handlePosterClick}
      />
      <CarouselRow 
        title="Series Persembahan Chill" 
        items={seriesData.chillSeries} 
        variant="portrait"
        onPosterClick={handlePosterClick}
      />
      <CarouselRow 
        title="Top Rating Series Hari ini" 
        items={seriesData.topRating} 
        variant="portrait"
        onPosterClick={handlePosterClick}
      />
      <CarouselRow 
        title="Series Trending" 
        items={seriesData.trending} 
        variant="portrait"
        onPosterClick={handlePosterClick}
      />

      {/* POPUP */}
      {selectedItem && (
        <FilmDetailPopup
          item={selectedItem}
          onClose={handleClosePopup}
          onAddToWatchlist={handleAddToWatchlist}
          type="series"
        />
      )}

      {/* PLAYER */}
      {showPlayer && (
        <div className="fixed inset-0 z-[9999]">
          <SeriesPlayer onClose={() => setShowPlayer(false)} itemId="ted-lasso" type="series" />
        </div>
      )}

      <Footer />
    </div>
  );
}
