import React, { useState, useEffect } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

import { getFilms, } from '../../utils/MoviesApi';


const Movies = () => {

  const moviesAll = JSON.parse(localStorage.getItem('moviesFullList')) ?? [];

  const [isLoading, setIsLoading] = useState(false);

  //стейт хранения всех фильмов с BeatFilms
  const [isMoviesFullList, setIsMoviesFullList] = useState('');


  const filtredFilms = (movies) => {
    console.log(movies);
    console.log(JSON.parse(movies));
  }

  const removeMoviesFullList = () => {
    localStorage.removeItem('moviesFullList');
  }

  const getMoviesFullList = () => {
    console.log(localStorage.getItem('moviesFullList'));
  }


  // нажатие кнопки поиск
  const handleSubmit = (req) => {
    // e.preventDefault()
    // console.log(req);
    setIsLoading(true);

    getFilms()
      .then((moviesFullList) => {
        console.log(moviesFullList);
        localStorage.setItem('moviesFullList', JSON.stringify(moviesFullList));
        // setIsMoviesFullList(JSON.stringify(moviesFullList));
        // filtredFilms(isMoviesFullList)
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
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
            onClick={() => {
              console.log(isMoviesFullList);
            }}
          ></button>покажи isMoviesFullList</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(moviesAll);
            }}
          ></button>покажи moviesAll</p>
      </div>

      <SearchForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        moviesFullList={isMoviesFullList}
      ></SearchForm>

      {isLoading
        ? <Preloader />
        : (<MoviesCardList
          listMovies={moviesAll}
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
