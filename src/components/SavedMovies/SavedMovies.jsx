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
  const [listMovies, setListMovies] = useState([]);

  // стейт хранения запроса
  const [isRequestBlock, setIsRequestBlock] = useState('');

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
      if (isCheckedShortFilms || isRequestBlock !== '') {
        setListMovies(
          foundFilms(savedFilms, isRequestBlock, isCheckedShortFilms)
        );
        return
      }
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
        onBlockedButton={onBlockedButton}
      ></MoviesCardList>

    </div>
  );
}

export default SavedMovies;
