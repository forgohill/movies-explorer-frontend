import React, { useState, useEffect } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getFilms } from '../../utils/moviesApi';
import useFiltredFilms from '../../hooks/useFiltredFilms';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';

const Movies = ({
  onSaveFilms,
  savedFilms,
  onDeleteSaveFilm,
  onBlockedButton,
}) => {

  // стейт прилоадера
  const [isLoading, setIsLoading] = useState(false);
  // вытаскиеваем из памяти весь список фильмов с АПИ
  const moviesAll = JSON.parse(localStorage.getItem('moviesFullList')) ?? [];
  // вытаскиеваем из памяти текст запроса
  const requestStorage = JSON.parse(localStorage.getItem('request')) ?? '';
  // вытаскиваем из памяти состояние чебокса
  const checkboxMoviesStorage = JSON.parse(localStorage.getItem('checkboxMoviesStorage')) ?? false;
  //стейт хранения всех фильмов с BeatFilms
  const [isMoviesFullList, setIsMoviesFullList] = useState('');
  // стейт хранения найденых фильмов
  const [isFindMoviesList, setIsFindMoviesList] = useState([]);
  // стейт состояния чебокса
  const [isCheckedShortFilms, setIsCheckedShortFilms] = useState(checkboxMoviesStorage);
  // хуки фильтрации
  const { foundFilms } = useFiltredFilms();
  const { checkSaved } = useCheckSavedFilm();

  // функция фильтрации
  const filtredFilms = (movies, request, isCheckedShortFilms) => {

    // в стейт IsFindMoviesList записываем массив прогнаный черех хук:
    setIsFindMoviesList(foundFilms(movies, request, isCheckedShortFilms));
  }

  // управление чекбоксом
  const handleChangeCheckbox = () => {
    // запишем в лсЧекбокса значение
    localStorage.setItem('checkboxMoviesStorage', JSON.stringify(!isCheckedShortFilms));
    // в стейт isCheckedShortFilms запишем обратное того что там хранится
    setIsCheckedShortFilms(!isCheckedShortFilms);
    if (moviesAll.length !== 0) {
      setIsFindMoviesList(foundFilms(moviesAll, requestStorage, !isCheckedShortFilms));
    }
  }

  // кнопка сохранить фильм
  const handleSavedFilms = (movie) => {
    const savedFilm = checkSaved(savedFilms, movie);
    if (savedFilm) {
      onDeleteSaveFilm(savedFilm._id);
      return;
    } else {
      onSaveFilms(movie);
    }
  }

  const getingFilms = (request) => {
    setIsLoading(true);
    getFilms()
      .then((moviesFullList) => {
        // запишет в лсВсеФильмыССервера
        localStorage.setItem('moviesFullList', JSON.stringify(moviesFullList));
        // функция которая создаст массив найденых фильмов
        filtredFilms(moviesFullList, request, isCheckedShortFilms);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  // нажатие кнопки поиск
  const handleSubmit = (request) => {


    if (moviesAll.length === 0) {
      // вытягивание всех фильмов с АПИ битфильма
      console.log(' я тут moviesAll.length === 0');
      getingFilms(request);
    } else {
      setIsFindMoviesList(foundFilms(moviesAll, request, isCheckedShortFilms))
    }
    // сохранили лсТекстЗапроса
    localStorage.setItem('request', JSON.stringify(request));
    // setIsLoading(false);
  }


  useEffect(() => {
    // если лсТекстЗапроса не пустая строка ТО :
    if (requestStorage !== '') {
      // в стейт IsFindMoviesList записываем массив прогнаный через хук:
      setIsFindMoviesList(foundFilms(moviesAll, requestStorage, isCheckedShortFilms));
    } else {
      setIsCheckedShortFilms(false);
    }
  }, []);

  return (
    <main className='movies'>

      <SearchForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        moviesFullList={isMoviesFullList}
        isChecked={isCheckedShortFilms}
        onChange={handleChangeCheckbox}
        oldRequest={requestStorage}
        listMovies={isFindMoviesList}
      ></SearchForm>

      {isLoading
        ? <Preloader />
        : (<MoviesCardList
          requestStorage={requestStorage}
          listMovies={isFindMoviesList}
          stateChechbox={isCheckedShortFilms}
          onSaveFilms={handleSavedFilms}
          savedFilms={savedFilms}
          onBlockedButton={onBlockedButton}
        ></MoviesCardList>)
      }

    </main >
  );
}

export default Movies;
