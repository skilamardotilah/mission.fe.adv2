import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './filmSlice';
import watchlistReducer from './watchlistSlice';

export const store = configureStore({
  reducer: {
    films: filmReducer,
    watchlist: watchlistReducer,
  },
});
