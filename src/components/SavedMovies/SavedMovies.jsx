import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useFiltredFilms from '../../hooks/useFiltredFilms';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({
  savedFilms,
  onDeleteSaveFilm,
  onBlockedButton,
}) => {

  // стейт прилоадера
  const [isLoading, setIsLoading] = useState(false);

  const [listMovies, setListMovies] = useState([]);

  // стейт хранения запроса
  const [isRequestBlock, setIsRequestBlock] = useState('');
  // стейт хранения найденых фильмов
  const [isFindMoviesList, setIsFindMoviesList] = useState([]);
  // стейт состояния чебокса
  const [isCheckedShortFilms, setIsCheckedShortFilms] = useState(false);

  const { foundFilms } = useFiltredFilms();


  // управляем чекбоксом
  const handleChangeCheckbox = () => {
    if (savedFilms) {
      setIsCheckedShortFilms(!isCheckedShortFilms);
      if (listMovies !== 0) {
        setListMovies(
          foundFilms(savedFilms, isRequestBlock, !isCheckedShortFilms)
        );
      } else {
        return;
      }
    }
  };

  const handleSubmit = (request) => {
    console.log('СРАБОТАЛ handleSubmit SAVED_MOVIES');
    filtredFilms(request);
  };

  // фильрация сохраненых фильмов
  const filtredFilms = (request) => {
    setIsRequestBlock(request);
    setListMovies(
      foundFilms(savedFilms, request, isCheckedShortFilms)
    );
  };

  useEffect(() => {
    if (savedFilms) {
      setListMovies(savedFilms);
    }
  }, [savedFilms]);

  return (
    <div className='movies'>
      <SearchForm
        onChange={handleChangeCheckbox}
        onSubmit={handleSubmit}
        isChecked={isCheckedShortFilms}
      ></SearchForm>

      <MoviesCardList
        listMovies={listMovies}
        onDeleteSaveFilm={onDeleteSaveFilm}
        isRequestBlock={isRequestBlock}
        onBlockedButton={onBlockedButton}
      ></MoviesCardList>

    </div>
  );
}

export default SavedMovies;
