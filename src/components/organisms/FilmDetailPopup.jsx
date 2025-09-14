// src/components/organisms/FilmDetailPopup.jsx
import { useWatchlist } from '@/contexts/WatchlistContext.jsx';
import { useWatchProgress } from '@/contexts/WatchProgressContext.jsx';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FilmPlayer from '../molecules/FilmPlayer.jsx';
import SeriesPlayer from '../molecules/SeriesPlayer.jsx';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href;

export default function FilmDetailPopup({ item, onClose, onAddToWatchlist, onRemoveFromWatchlist, type = 'film' }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const { isInWatchlist } = useWatchlist();
  const { hasProgress, getProgress, startWatching, removeProgress } = useWatchProgress();
  
  // Generate unique ID for the item
  const itemId = item?.src || item?.title || 'unknown';
  const hasWatchProgress = hasProgress(itemId);
  const progress = getProgress(itemId);


  const handleAddToWatchlist = () => {
    if (onAddToWatchlist) {
      onAddToWatchlist(item);
    }
  };

  const handleRemoveFromWatchlist = () => {
    if (onRemoveFromWatchlist) {
      onRemoveFromWatchlist(item);
    }
  };

  const handleStartWatching = () => {
    if (!hasWatchProgress) {
      startWatching(itemId, type);
    }
    setShowPlayer(true);
  };

  const handleRemoveProgress = () => {
    removeProgress(itemId);
  };

  const isSeries = type === 'series';
  const isWatchlist = type === 'watchlist';

  return (
    <>
      {/* Main Detail Popup */}
      {!showPlayer && (
        <div className="fixed inset-0 z-50 bg-black backdrop-blur-sm overflow-y-auto flex items-center justify-center px-2">
          <div className="w-full max-w-[350px] md:max-w-[700px] lg:max-w-[933px] mx-auto bg-[#181A1C] rounded-xl relative" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Background Image */}
            <div className="relative rounded-xl overflow-hidden">
              <img src={item?.src || (isSeries ? asset('img/series/hero-series.png') : asset('img/film/hero-film.png'))} className="w-full h-[140px] md:h-[300px] lg:h-[554px] rounded-t-lg object-cover" alt="Poster" />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

              {/* Close Button - always visible, bigger on mobile */}
              <button onClick={onClose} className="absolute top-2 right-2 text-white hover:text-gray-300 z-20 bg-black/60 rounded-full p-2 md:top-4 md:right-4" style={{ fontSize: '1.75rem' }} aria-label="Tutup">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="absolute bottom-4 left-0 right-0 max-w-full md:max-w-[750px] mx-auto px-2">
                <div className="max-w-full md:max-w-[750px] mx-auto">
                  <h1 className="text-lg md:text-2xl font-bold">{item.title || 'Title'}</h1>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {/* Start/Continue Button */}
                    {hasWatchProgress ? (
                      <div className="relative">
                        <button 
                          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full text-white font-semibold flex items-center gap-2" 
                          onClick={handleStartWatching}
                        >
                          Lanjutkan Menonton ({progress?.progress || 0}%)
                        </button>
                        <button 
                          onClick={handleRemoveProgress}
                          className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 flex items-center justify-center"
                          title="Hapus Progress"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-white font-semibold" 
                        onClick={handleStartWatching}
                      >
                        Mulai
                      </button>
                    )}

                    {/* Add/Remove Button */}
                    {isWatchlist ? (
                      <button onClick={handleRemoveFromWatchlist} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-semibold">
                        Hapus
                      </button>
                    ) : (
                      !hasWatchProgress && (
                        <button onClick={handleAddToWatchlist} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-white font-semibold">
                          {isInWatchlist(item) ? '✓' : '+'}
                        </button>
                      )
                    )}

                    {/* Premium Button (only for series) */}
                    {isSeries && <Link to="/premium" className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full text-black font-semibold">Premium</Link>}

                    {/* Volume Button */}
                    <button className="absolute bottom-4 right-4 text-white hover:text-gray-300 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-full md:max-w-[750px] mx-auto relative top-8 px-2">
              {/* Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs md:text-sm text-gray-300">
                <div>
                  {isSeries ? (
                    <p>
                      <span className="text-white">2020</span> · 10 episode · 16+
                    </p>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <span>2023</span>
                      <span>•</span>
                      <span>2j 29m</span>
                      <span>•</span>
                      <span className="border px-1 rounded text-xs">PG-13</span>
                    </div>
                  )}
                  <p className="mt-4">
                    {isSeries
                      ? 'Pelatih sepak bola perguruan tinggi Amerika Ted Lasso pergi ke London untuk mengelola AFC Richmond, tim sepak bola Liga Utama Inggris yang kesulitan.'
                      : 'Masih goyah karena kehilangan Gamora, Peter Quill mengumpulkan timnya untuk mempertahankan alam semesta dan salah satu dari mereka - sebuah misi yang bisa berarti akhir dari Penjaga jika tidak berhasil.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <span className="text-white font-medium">Cast</span>: {isSeries ? 'Jason Sudeikis, Brett Goldstein, Brendan Hunt' : 'Chris Pratt, Chukwudi Iwuji, Bradley Cooper, dan lain'}
                  </p>
                  <p>
                    <span className="text-white font-medium">Genre</span>: {isSeries ? 'Komedi, Drama, Olahraga' : 'Aksi, Petualangan, Komedi'}
                  </p>
                  <p>
                    <span className="text-white font-medium">Pembuat Film</span>: {isSeries ? 'Brendan Hunt, Joe Kelly, Bill Lawrence' : 'James Gunn'}
                  </p>
                </div>
              </div>

              {/* Episodes (for series) or Recommendations (for films) */}
              <div className="mt-10 pb-10">
                {isSeries ? (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Episode</h2>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((episode) => (
                        <div key={episode} className="flex gap-2 items-start bg-gray-800/50 p-2 rounded-lg hover:bg-gray-700 transition md:gap-4 md:p-4">
                          <div className="w-5 h-16 flex items-center justify-center text-white text-xs font-semibold md:w-6 md:h-24 md:text-lg">{episode}</div>
                          <img src={asset(`img/series/eps${episode}.png`)} alt={`Episode ${episode}`} className="w-[80px] h-16 border-b-[2px] border-b-red-500 rounded object-cover md:w-[170px] md:h-24 md:border-b-[3px]" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-white">{episode === 1 ? 'Pilot' : episode === 2 ? 'Biscuits' : episode === 3 ? 'Trent Crimm: Independent' : episode === 4 ? 'For The Children' : 'Tan Lines'}</p>
                              <span className="text-xs text-gray-400">30 min</span>
                            </div>
                            <p className="text-[8px] md:text-sm mt-1 text-gray-300">
                              {episode === 1
                                ? 'American football coach Ted Lasso is hired by a wealthy divorcee to coach the English soccer team AFC Richmond'
                                : episode === 2
                                ? "It's Ted's first day of coaching, and fans aren't happy. He makes little headway but remains undeterred as the team..."
                                : episode === 3
                                ? 'To arrange an in-depth exposé, Rebecca pairs cynical journalist Trent Crimm with Ted for a day. Ted and Roy...'
                                : episode === 4
                                ? "Rebecca hosts the team's annual charity benefit, where Ted stages a reconciliation between Roy and Jamie."
                                : 'With his wife and son visiting from America, Ted makes drastic changes to the lineup during a critical match.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-4">Rekomendasi Serupa</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="relative">
                          <img src={asset(`img/film/${num}.png`)} className="rounded-xl w-full object-cover" alt={`Recommendation ${num}`} />
                          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">Top 10</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Player Popup */}
      {showPlayer && (
        <div className="fixed inset-0 z-[9999]">
          {type === 'series' ? (
            <SeriesPlayer onClose={() => setShowPlayer(false)} itemId={itemId} type={type} />
          ) : (
            <FilmPlayer onClose={() => setShowPlayer(false)} itemId={itemId} type={type} />
          )}
        </div>
      )}
    </>
  );
}
