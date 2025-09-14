import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFilms, addFilm, updateFilm, deleteFilm } from '../../services/api/filmApi';

// Initial State
const initialState = {
  films: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFilms();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewFilm = createAsyncThunk(
  'films/addNewFilm',
  async (filmData, { rejectWithValue }) => {
    try {
      const response = await addFilm(filmData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExistingFilm = createAsyncThunk(
  'films/updateExistingFilm',
  async ({ id, filmData }, { rejectWithValue }) => {
    try {
      const response = await updateFilm(id, filmData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExistingFilm = createAsyncThunk(
  'films/deleteExistingFilm',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFilm(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Film Slice
const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Films
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Film
      .addCase(addNewFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewFilm.fulfilled, (state, action) => {
        state.loading = false;
        state.films.push(action.payload);
      })
      .addCase(addNewFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Film
      .addCase(updateExistingFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingFilm.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.films.findIndex(film => film.id === action.payload.id);
        if (index !== -1) {
          state.films[index] = action.payload;
        }
      })
      .addCase(updateExistingFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Film
      .addCase(deleteExistingFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingFilm.fulfilled, (state, action) => {
        state.loading = false;
        state.films = state.films.filter(film => film.id !== action.payload);
      })
      .addCase(deleteExistingFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = filmSlice.actions;
export default filmSlice.reducer;
