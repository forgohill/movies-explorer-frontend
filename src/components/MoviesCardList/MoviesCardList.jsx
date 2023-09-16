import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { movies } from '../../utils/movies-list.js';
import { moviesSaved } from '../../utils/movies-list-saved.js';

import useWindowCalculator from '../../hooks/useWindowCalculator';

/**
 * Обратите внимание, что количество карточек,
 * которые отображаются на странице, зависит от
 * ширины экрана устройства.
 *
 * Ширина 1280px — 4 ряда карточек.
 * Кнопка «Ещё» загружает дополнительный ряд карточек.
 *
 * Ширина 768px — 4 ряда карточек.
 * Кнопка «Ещё» загружает дополнительный ряд карточек.
 *
 * Ширина от 320px до 480px — 5 карточек по 1 в ряд.
 * Кнопка «Ещё» загружает по 2 карточки.
 */

// 1 сдлаем стейт который хранит входящий массив

const MoviesCardList = ({ listMovies, listMoviesTwo }) => {

  // стейт хранения входящео массива
  const [insertList, setInsertList] = useState([]);

  // const [insertListTwo, setInsertListTwo] = useState([]);
  // const [relationWidht, setRelationWidht] = useState(undefined);

  const { addCards, moviesDisplay, resizeDelay, handleResize } = useWindowCalculator();

  const { pathname } = useLocation();

  console.log(pathname);

  const moviesList = movies.map((movie) => {
    return (
      <MoviesCard
        key={movie.id}
        movie={movie}
      />
    )
  });

  const moviesSavedList = moviesSaved.map((movie) => {
    return (
      <MoviesCard
        key={movie.id}
        movie={movie}
      />
    )
  });

  // console.error(listMovies);

  const filtredMovies = listMovies.slice(0, moviesDisplay).map((movie) => {
    return (
      <MoviesCard
        key={movie.id}
        movie={movie}
      />
    )
  });

  // const filtredMoviesTwo = insertListTwo.map((movie) => {
  //   return (
  //     <MoviesCard
  //       key={movie.id}
  //       movie={movie}
  //     />
  //   )
  // });

  useEffect(() => {
    setInsertList(filtredMovies);

    // setInsertListTwo(listMoviesTwo);
    // const handleResize = () => {
    //   setRelationWidht(window.innerWidth);
    // }

    // const resizeDelay = () => {
    //   let time;
    //   if (!time) {
    //     time = setTimeout(() => {
    //       time = null;
    //       handleResize();
    //     }, 199);
    //   };

    //   window.addEventListener('resize', resizeDelay);
    //   handleResize();

    //   return () => window.removeEventListener('resize', resizeDelay)
    // }
    // resizeDelay
    // навешиваем слушатель
    handleResize();
    window.addEventListener('resize', resizeDelay);
    // снимаем слушатель
    return () => window.removeEventListener('resize', resizeDelay);
  }, []);


  return (

    <section className='movies-list'>

      {/* правило по которому если ничего не найдено выводится надпись */}
      {listMovies.length !== 0
        ?
        <ul className='movies-list__list'>
          {/* {pathname === '/movies' ? moviesList : moviesSavedList} */}
          {pathname === '/movies' ? filtredMovies : filtredMovies}
        </ul>
        :
        <p
          className='movies-list__not-found'>
          Ничего не найдено
        </p>
      }


      <div className='search__wrapper-btn'>
        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(listMovies);
            }}
          ></button>покажи listMovies</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(filtredMovies);
            }}
          ></button>покажи filtredMovies</p>

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(insertList);
            }}
          ></button>покажи insertList</p>

      </div>

      {insertList.length < listMovies.length
        ?
        <button type='button'
          onClick={addCards}
          className='movies-list__btn-more'>
          Ещё
        </button>
        :
        <div
          className='movies-list__saveddevider'>
        </div>
      }



      {/* {pathname === '/movies'
        ? <button type='button'
          className='movies-list__btn-more'>
          Ещё
        </button>
        : <div
          className='movies-list__saveddevider'>
        </div>
      } */}

    </section >
  );
}

export default MoviesCardList;
