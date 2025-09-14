// src/hooks/useReduxWatchlist.js
import { useSelector, useDispatch } from 'react-redux';
import { 
  addToWatchlist,
  removeFromWatchlist,
  updateNoteStatus,
  editWatchlistItem,
  startWatching,
  updateProgress,
  removeProgress,
  addToWatchlistAndStart,
  removeFromWatchlistAndProgress,
  clearError,
  loadFromLocalStorage,
  saveToLocalStorage
} from '../store/redux/watchlistSlice';

export const useReduxWatchlist = () => {
  const { watchlist, watchProgress, loading, error } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  // Watchlist operations
  const addItem = (item) => dispatch(addToWatchlist(item));
  const removeItem = (item) => dispatch(removeFromWatchlist(item));
  const updateItemNoteStatus = (src, note, status) => dispatch(updateNoteStatus({ src, note, status }));
  const editItem = (updatedItem) => dispatch(editWatchlistItem(updatedItem));
  const isInWatchlist = (item) => watchlist.some((w) => w.src === item.src);

  // Watch Progress operations
  const startWatchingItem = (itemId, type = 'film') => dispatch(startWatching({ itemId, type }));
  const updateItemProgress = (itemId, progress) => dispatch(updateProgress({ itemId, progress }));
  const removeItemProgress = (itemId) => dispatch(removeProgress(itemId));
  const getItemProgress = (itemId) => watchProgress[itemId] || null;
  const hasItemProgress = (itemId) => !!watchProgress[itemId];

  // Combined operations
  const addAndStartWatching = (item) => dispatch(addToWatchlistAndStart(item));
  const removeAndClearProgress = (item) => dispatch(removeFromWatchlistAndProgress(item));

  // Utility operations
  const clearErrorState = () => dispatch(clearError());
  const loadFromStorage = () => dispatch(loadFromLocalStorage());
  const saveToStorage = () => dispatch(saveToLocalStorage());

  return {
    // State
    watchlist,
    watchProgress,
    loading,
    error,

    // Watchlist operations
    addToWatchlist: addItem,
    removeFromWatchlist: removeItem,
    updateNoteStatus: updateItemNoteStatus,
    editWatchlistItem: editItem,
    isInWatchlist,

    // Watch Progress operations
    startWatching: startWatchingItem,
    updateProgress: updateItemProgress,
    removeProgress: removeItemProgress,
    getProgress: getItemProgress,
    hasProgress: hasItemProgress,

    // Combined operations
    addToWatchlistAndStart: addAndStartWatching,
    removeFromWatchlistAndProgress: removeAndClearProgress,

    // Utility operations
    clearError: clearErrorState,
    loadFromLocalStorage: loadFromStorage,
    saveToLocalStorage: saveToStorage
  };
};
