// src/contexts/WatchlistContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item) => {
    if (!watchlist.find((w) => w.src === item.src)) {
      setWatchlist([...watchlist, { ...item, note: '', status: 'Plan to Watch' }]);
    }
  };
  const updateNoteStatus = (src, note, status) => {
    setWatchlist(watchlist.map((w) => (w.src === src ? { ...w, note, status } : w)));
  };

  const removeFromWatchlist = (item) => {
    setWatchlist(watchlist.filter((w) => w.src !== item.src));
  };

  const editWatchlistItem = (updatedItem) => {
    setWatchlist(watchlist.map((w) => (w.src === updatedItem.src ? { ...w, ...updatedItem } : w)));
  };

  const isInWatchlist = (item) => {
    return watchlist.some((w) => w.src === item.src);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    editWatchlistItem,
    updateNoteStatus,
    isInWatchlist,
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};
