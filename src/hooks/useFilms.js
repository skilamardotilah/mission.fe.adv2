// src/hooks/useFilms.js
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchFilms, 
  addNewFilm, 
  updateExistingFilm, 
  deleteExistingFilm,
  clearError 
} from '../store/redux/filmSlice';

export const useFilms = () => {
  const { films, loading, error } = useSelector((state) => state.films);
  const dispatch = useDispatch();

  const getFilms = () => dispatch(fetchFilms());
  
  const addFilm = (filmData) => dispatch(addNewFilm(filmData));
  
  const updateFilm = (id, filmData) => dispatch(updateExistingFilm({ id, filmData }));
  
  const deleteFilm = (id) => dispatch(deleteExistingFilm(id));
  
  const clearErrorState = () => dispatch(clearError());

  return {
    films,
    loading,
    error,
    getFilms,
    addFilm,
    updateFilm,
    deleteFilm,
    clearError: clearErrorState
  };
};
