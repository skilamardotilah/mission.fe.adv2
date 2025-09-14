// src/services/api/filmApi.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://68c02e2f0b196b9ce1c38365.mockapi.io';

// GET all
export const getFilms = () => axios.get(`${BASE_URL}/films`);

// GET by id
export const getFilm = (id) => axios.get(`${BASE_URL}/films/${id}`);

// ADD new
export const addFilm = (film) => axios.post(`${BASE_URL}/films`, film);

// UPDATE
export const updateFilm = (id, film) => axios.put(`${BASE_URL}/films/${id}`, film);

// DELETE
export const deleteFilm = (id) => axios.delete(`${BASE_URL}/films/${id}`);
