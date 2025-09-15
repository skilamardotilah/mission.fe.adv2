// src/services/api/filmApi.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://68c02e2f0b196b9ce1c38365.mockapi.io';

// Create axios instance with timeout
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// GET all
export const getFilms = () => apiClient.get('/films');

// GET by id
export const getFilm = (id) => apiClient.get(`/films/${id}`);

// ADD new
export const addFilm = (film) => apiClient.post('/films', film);

// UPDATE
export const updateFilm = (id, film) => apiClient.put(`/films/${id}`, film);

// DELETE
export const deleteFilm = (id) => apiClient.delete(`/films/${id}`);
