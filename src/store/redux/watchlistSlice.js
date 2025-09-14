// src/store/redux/watchlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  watchlist: [],
  watchProgress: {},
  loading: false,
  error: null,
};

// Async Thunks for API operations (if needed)
export const syncWatchlistToAPI = createAsyncThunk(
  'watchlist/syncToAPI',
  async (watchlistData, { rejectWithValue }) => {
    try {
      // Here you would sync with your API
      // For now, we'll just return the data
      return watchlistData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const syncWatchProgressToAPI = createAsyncThunk(
  'watchlist/syncProgressToAPI',
  async (progressData, { rejectWithValue }) => {
    try {
      // Here you would sync with your API
      // For now, we'll just return the data
      return progressData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Watchlist Slice
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    // Watchlist operations
    addToWatchlist: (state, action) => {
      const item = action.payload;
      if (!state.watchlist.find((w) => w.src === item.src)) {
        state.watchlist.push({ ...item, note: '', status: 'Plan to Watch' });
      }
    },
    
    removeFromWatchlist: (state, action) => {
      const item = action.payload;
      state.watchlist = state.watchlist.filter((w) => w.src !== item.src);
    },
    
    updateNoteStatus: (state, action) => {
      const { src, note, status } = action.payload;
      const item = state.watchlist.find((w) => w.src === src);
      if (item) {
        item.note = note;
        item.status = status;
      }
    },
    
    editWatchlistItem: (state, action) => {
      const updatedItem = action.payload;
      const index = state.watchlist.findIndex((w) => w.src === updatedItem.src);
      if (index !== -1) {
        state.watchlist[index] = { ...state.watchlist[index], ...updatedItem };
      }
    },

    // Watch Progress operations
    startWatching: (state, action) => {
      const { itemId, type = 'film' } = action.payload;
      state.watchProgress[itemId] = {
        id: itemId,
        type,
        progress: 0,
        startedAt: new Date().toISOString(),
        lastWatchedAt: new Date().toISOString()
      };
    },
    
    updateProgress: (state, action) => {
      const { itemId, progress } = action.payload;
      if (state.watchProgress[itemId]) {
        state.watchProgress[itemId].progress = Math.min(100, Math.max(0, progress));
        state.watchProgress[itemId].lastWatchedAt = new Date().toISOString();
      }
    },
    
    removeProgress: (state, action) => {
      const itemId = action.payload;
      delete state.watchProgress[itemId];
    },

    // Combined operations
    addToWatchlistAndStart: (state, action) => {
      const item = action.payload;
      if (!state.watchlist.find((w) => w.src === item.src)) {
        state.watchlist.push({ ...item, note: '', status: 'Plan to Watch' });
      }
      state.watchProgress[item.src || item.id] = {
        id: item.src || item.id,
        type: item.type || 'film',
        progress: 0,
        startedAt: new Date().toISOString(),
        lastWatchedAt: new Date().toISOString()
      };
    },
    
    removeFromWatchlistAndProgress: (state, action) => {
      const item = action.payload;
      state.watchlist = state.watchlist.filter((w) => w.src !== item.src);
      delete state.watchProgress[item.src || item.id];
    },

    // Utility actions
    clearError: (state) => {
      state.error = null;
    },
    
    loadFromLocalStorage: (state) => {
      const savedWatchlist = localStorage.getItem('watchlist');
      const savedProgress = localStorage.getItem('watchProgress');
      
      if (savedWatchlist) {
        state.watchlist = JSON.parse(savedWatchlist);
      }
      if (savedProgress) {
        state.watchProgress = JSON.parse(savedProgress);
      }
    },
    
    saveToLocalStorage: (state) => {
      localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
      localStorage.setItem('watchProgress', JSON.stringify(state.watchProgress));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncWatchlistToAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncWatchlistToAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(syncWatchlistToAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(syncWatchProgressToAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncWatchProgressToAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(syncWatchProgressToAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
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
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
