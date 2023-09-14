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

  const requestStorage = JSON.parse(localStorage.getItem('request')) ?? '';
  //стейт хранения всех фильмов с BeatFilms
  const [isMoviesFullList, setIsMoviesFullList] = useState('');

  const [isFindMoviesList, setIsFindMoviesList] = useState([]);

  const { foundFilms } = useFiltredFilms();

  // функция фильтрации
  const filtredFilms = (movies, request) => {
    console.error(`сработал в filtredFilms ${request}`);
    // const { foundFilms } = useFiltredFilms(moviesAll, requestStorage);
    // console.log(movies);
    // console.log(JSON.parse(movies));
    // foundFilms(movies, request);
    setIsFindMoviesList(foundFilms(movies, request));
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
        filtredFilms(moviesFullList, request);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })

    localStorage.setItem('request', JSON.stringify(request));
    console.log('handleSubmit');
  }


  useEffect(() => {
    if (isMoviesFullList === '') {
      // setIsMoviesFullList(localStorage.getItem('moviesFullList'));
      console.log('isMoviesFullList пуст')
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

      </div>

      <SearchForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        moviesFullList={isMoviesFullList}
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
