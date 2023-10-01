import React, { useState, useEffect } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import MoviesCard from '../MoviesCard/MoviesCard';

import { getFilms, } from '../../utils/moviesApi';
import useFiltredFilms from '../../hooks/useFiltredFilms';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';

const Movies = ({
  onSaveFilms,
  // onCheckSavedFilms,
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
    console.error(`сработал в filtredFilms ${request}`);

    // в стейт IsFindMoviesList записываем массив прогнаный черех хук:
    setIsFindMoviesList(foundFilms(movies, request, isCheckedShortFilms));
    // setIsFindMoviesList(foundFilms(movies, request, isCheckedShortFilms));
  }

  /**
   *  Если чекбокс короткометражек не отмечен,
   * в результатах отображаются все фильмы,
   * которые подходят под введённый запрос, в том
   * числе и короткометражки. Если чекбокс отмечен,
   * в результатах запроса отображаются только короткометражные фильмы.
   *
   * Если карточки уже были отображены на странице
   * в блоке результатов, то клик по чекбоксу
   * «Короткометражки» должен приводить к новой
   * фильтрации всех фильмов с учётом нового состояния
   * чекбокса и введённого текста запроса в форме поиска.
   */

  // управление чекбоксом
  const handleChangeCheckbox = () => {

    // запишем в лсЧекбокса значение
    localStorage.setItem('checkboxMoviesStorage', JSON.stringify(!isCheckedShortFilms));
    // в стейт isCheckedShortFilms запишем обратное того что там хранится
    setIsCheckedShortFilms(!isCheckedShortFilms);
    console.error(`в чекбоксе ${moviesAll.length}`);
    // console.error(moviesAll);
    if (moviesAll.length !== 0) {
      console.log(' Я СРАБОТАЛ');

      setIsFindMoviesList(foundFilms(moviesAll, requestStorage, !isCheckedShortFilms));
      // console.log(' я туть')
    }
  }

  const handleSavedFilms = (movie) => {
    const savedFilm = checkSaved(savedFilms, movie);
    if (savedFilm) {
      onDeleteSaveFilm(savedFilm._id);
      return;
    } else {
      onSaveFilms(movie);
    }
  }

  const removeMoviesFullList = () => {
    localStorage.removeItem('moviesFullList');
  }

  const getMoviesFullList = () => {
    console.log(localStorage.getItem('moviesFullList'));
  }

  const getingFilms = (request) => {
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
    setIsLoading(true);
    // вытягивание всех фильмов с АПИ битфильма
    getingFilms(request);
    // сохранили лсТекстЗапроса
    localStorage.setItem('request', JSON.stringify(request));
  }


  useEffect(() => {
    // если лсТекстЗапроса не пустая строка ТО :
    if (requestStorage !== '') {
      // setIsCheckedShortFilms(false);
      // в стейт IsFindMoviesList записываем массив прогнаный через хук:
      setIsFindMoviesList(foundFilms(moviesAll, requestStorage, isCheckedShortFilms));
    } else {
      setIsCheckedShortFilms(false);
    }
  }, []);

  return (
    <main className='movies'>

      <div className='search__wrapper-btn'>
        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={getMoviesFullList}
          ></button>проверка локал стродж</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={removeMoviesFullList}
          ></button>удаление локал стордж</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={
              () => {
                console.log(requestStorage);
              }
            }
          ></button>проверка локал стродж - requestStorage</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              localStorage.removeItem('request');
              console.log('localStorage.removeItem(\'request\');')
            }}
          ></button>удаление локал стродж - request</p>


        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(isMoviesFullList);
            }}
          ></button>покажи isMoviesFullList</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(isFindMoviesList);
            }}
          ></button>покажи isFindMoviesList</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(moviesAll);
            }}
          ></button>покажи moviesAll</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(foundFilms);
            }}
          ></button>покажи foundFilms</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(isCheckedShortFilms);
            }}
          ></button>покажи isCheckedShortFilms</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(checkboxMoviesStorage);
            }}
          ></button>покажи checkboxMoviesStorage</p>


      </div>

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
          // onCheckSavedFilms={onCheckSavedFilms}
          savedFilms={savedFilms}
          onBlockedButton={onBlockedButton}
        ></MoviesCardList>)
      }

      {/* {isLoading
        ? <Preloader />
        : (<MoviesCardList></MoviesCardList>)
      } */}
    </main >
  );
}

export default Movies;
