// src/hooks/useWatchlistComprehensive.js
import { useContext } from 'react';
import { WatchlistContext } from '../contexts/WatchlistContext';
import { WatchProgressContext } from '../contexts/WatchProgressContext';

export const useWatchlistComprehensive = () => {
  const watchlistContext = useContext(WatchlistContext);
  const watchProgressContext = useContext(WatchProgressContext);

  if (!watchlistContext) {
    throw new Error('useWatchlistComprehensive must be used within a WatchlistProvider');
  }

  if (!watchProgressContext) {
    throw new Error('useWatchlistComprehensive must be used within a WatchProgressProvider');
  }

  return {
    // Watchlist operations
    watchlist: watchlistContext.watchlist,
    addToWatchlist: watchlistContext.addToWatchlist,
    removeFromWatchlist: watchlistContext.removeFromWatchlist,
    editWatchlistItem: watchlistContext.editWatchlistItem,
    updateNoteStatus: watchlistContext.updateNoteStatus,
    isInWatchlist: watchlistContext.isInWatchlist,

    // Watch Progress operations
    watchProgress: watchProgressContext.watchProgress,
    startWatching: watchProgressContext.startWatching,
    updateProgress: watchProgressContext.updateProgress,
    removeProgress: watchProgressContext.removeProgress,
    getProgress: watchProgressContext.getProgress,
    hasProgress: watchProgressContext.hasProgress,

    // Combined operations
    addToWatchlistAndStart: (item) => {
      watchlistContext.addToWatchlist(item);
      watchProgressContext.startWatching(item.src || item.id, item.type || 'film');
    },

    removeFromWatchlistAndProgress: (item) => {
      watchlistContext.removeFromWatchlist(item);
      watchProgressContext.removeProgress(item.src || item.id);
    },

    updateWatchlistItemWithProgress: (item, note, status, progress) => {
      watchlistContext.updateNoteStatus(item.src || item.id, note, status);
      if (progress !== undefined) {
        watchProgressContext.updateProgress(item.src || item.id, progress);
      }
    }
  };
};
