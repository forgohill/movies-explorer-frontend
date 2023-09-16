import React, { useState, useEffect } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

import { getFilms, } from '../../utils/MoviesApi';
import useFiltredFilms from '../../hooks/useFiltredFilms';

const Movies = () => {

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
  const { foundFilms, checkedFilms } = useFiltredFilms();

  // функция фильтрации
  const filtredFilms = (movies, request, isCheckedShortFilms) => {
    console.error(`сработал в filtredFilms ${request}`);
    // const { foundFilms } = useFiltredFilms(moviesAll, requestStorage);
    // console.log(movies);
    // console.log(JSON.parse(movies));
    // foundFilms(movies, request);
    setIsFindMoviesList(foundFilms(movies, request, isCheckedShortFilms));
  }

  // слушатель чекбокса
  const handleChangeCheckbox = () => {
    console.error('handleChangeCheckbox');
    setIsCheckedShortFilms(!isCheckedShortFilms);
    localStorage.setItem('checkboxMoviesStorage', JSON.stringify(!isCheckedShortFilms));
    // console.error(isCheckedShortFilms);
    // setIsFindMoviesList(foundFilms(moviesAll, requestStorage, isCheckedShortFilms));
    // filtredFilms(isMoviesFullList, requestStorage, isCheckedShortFilms);
  }


  const removeMoviesFullList = () => {
    localStorage.removeItem('moviesFullList');
  }

  const getMoviesFullList = () => {
    console.log(localStorage.getItem('moviesFullList'));
  }


  // нажатие кнопки поиск
  const handleSubmit = (request) => {
    // e.preventDefault()
    // console.log(request);
    setIsLoading(true);

    getFilms()
      .then((moviesFullList) => {
        console.log(moviesFullList);
        localStorage.setItem('moviesFullList', JSON.stringify(moviesFullList));
        // localStorage.setItem('request', JSON.stringify(request));
        // setIsMoviesFullList(JSON.stringify(moviesFullList));
        // filtredFilms(isMoviesFullList)
        filtredFilms(moviesFullList, request, isCheckedShortFilms);
        // checkedFilms(checkboxMoviesStorage)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })

    localStorage.setItem('request', JSON.stringify(request));
    // console.log('handleSubmit');
  }


  useEffect(() => {
    if (requestStorage === '') {
      // setIsMoviesFullList(localStorage.getItem('moviesFullList'));
      console.error('requestStorage пуст')
    } else {
      // console.error(requestStorage);
      setIsFindMoviesList(foundFilms(moviesAll, requestStorage, isCheckedShortFilms));
    }

    return () => {

    };
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
      ></SearchForm>

      {isLoading
        ? <Preloader />
        : (<MoviesCardList
          // listMovies={moviesAll}
          listMovies={isFindMoviesList}

        ></MoviesCardList>)
      }

      {/* {isLoading
        ? <Preloader />
        : (<MoviesCardList></MoviesCardList>)
      } */}
    </main>
  );
}

export default Movies;
