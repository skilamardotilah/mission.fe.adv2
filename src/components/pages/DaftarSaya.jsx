// src/pages/DaftarSaya.jsx
import { useState } from 'react';
import Navbar from '@/components/organisms/Navbar.jsx';
import CarouselRow from '@/components/organisms/CarouselRow.jsx';
import FilmDetailPopup from '@/components/organisms/FilmDetailPopup.jsx';
import Footer from '@/components/organisms/Footer.jsx';

import { useWatchlist } from '@/contexts/WatchlistContext.jsx';

export default function DaftarSaya() {
  // All hooks and logic must be inside the function
  const [selectedItem, setSelectedItem] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('Plan to Watch');
  const { watchlist, removeFromWatchlist, updateNoteStatus } = useWatchlist();

  const handlePosterClick = (item) => {
    setSelectedItem(item);
  };

  // Function to determine if an item is a series based on its properties
  const getItemType = (item) => {
    // Check if item has series-specific properties or if title contains series indicators
    if (item.isSeries || item.type === 'series' || 
        (item.title && (
          item.title.toLowerCase().includes('season') ||
          item.title.toLowerCase().includes('episode') ||
          item.title.toLowerCase().includes('series')
        ))) {
      return 'series';
    }
    return 'film';
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleRemoveFromWatchlist = (itemToRemove) => {
    removeFromWatchlist(itemToRemove);
    handleClosePopup();
  };

  return (
    <div className="bg-[#181A1C] text-white font-lato min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="px-4 md:px-[80px] py-[40px]">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Daftar Saya</h1>
        <p className="text-gray-400">{watchlist.length > 0 ? `${watchlist.length} item dalam daftar tonton Anda` : 'Belum ada item dalam daftar tonton Anda'}</p>
      </div>

      {/* Watchlist Carousel */}
      {watchlist.length > 0 ? (
        <>
          <CarouselRow title="Daftar Tonton Saya" items={watchlist} variant="portrait" onPosterClick={handlePosterClick} />
          <div className="max-w-2xl mx-auto mt-4">
            {watchlist.map((item, idx) => (
              <div key={item.src || idx} className="bg-[#222] rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <img src={item.src} alt={item.title} className="w-12 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-gray-400">Status: {item.status || 'Plan to Watch'}</div>
                    <div className="text-sm text-gray-400">Note: {item.note || '-'}</div>
                  </div>
                  {editIdx === idx ? (
                    <button className="bg-gray-500 px-2 py-1 rounded text-white" onClick={() => setEditIdx(null)}>
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-600 px-2 py-1 rounded text-white"
                      onClick={() => {
                        setEditIdx(idx);
                        setNote(item.note || '');
                        setStatus(item.status || 'Plan to Watch');
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {editIdx === idx && (
                  <form
                    className="flex flex-col gap-2 mt-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateNoteStatus(item.src, note, status);
                      setEditIdx(null);
                    }}
                  >
                    <label className="text-sm">
                      Status:
                      <select className="ml-2 text-black rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>Plan to Watch</option>
                        <option>Watching</option>
                        <option>Finished</option>
                      </select>
                    </label>
                    <label className="text-sm">
                      Personal Note:
                      <input className="ml-2 text-black rounded px-2 py-1 w-64" value={note} onChange={(e) => setNote(e.target.value)} />
                    </label>
                    <button type="submit" className="bg-green-600 px-2 py-1 rounded text-white w-24">
                      Save
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="px-4 md:px-[80px] py-[40px] text-center">
          <div className="bg-gray-800/50 rounded-lg p-8">
            <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">Daftar Tonton Kosong</h3>
            <p className="text-gray-400 mb-4">Tambahkan film atau series ke daftar tonton Anda dengan mengklik tombol "+" pada poster</p>
            <p className="text-sm text-gray-500">Jelajahi halaman Series atau Film untuk menemukan konten yang ingin Anda tonton</p>
          </div>
        </div>
      )}

      {/* POPUP */}
      {selectedItem && <FilmDetailPopup item={selectedItem} onClose={handleClosePopup} onRemoveFromWatchlist={handleRemoveFromWatchlist} type="watchlist" />}

      <Footer />
    </div>
  );
}
