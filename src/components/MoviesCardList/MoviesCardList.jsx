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

const MoviesCardList = ({
  listMovies,
  // savedListMovies,
  requestStorage,
  stateChechbox,
  onSaveFilms,
  onDeleteSaveFilm,
}) => {

  const { pathname } = useLocation();
  // стейт хранения входящео массива
  const [insertList, setInsertList] = useState([]);

  const isSavedMovies = pathname === '/saved-movies';



  const {
    addCards,
    moviesDisplay,
    resizeDelay,
    handleResize,
  } = useWindowCalculator();



  const filtredMovies = listMovies.slice(0, moviesDisplay).map((movie) => {
    return (
      <MoviesCard
        key={isSavedMovies ? movie._id : movie.id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        onSaveFilms={onSaveFilms}
        onDeleteSaveFilm={onDeleteSaveFilm}
      />
    )
  });

  useEffect(() => {
    // console.log(' setInsertList ПРОИЗОШЕЛ')
    setInsertList(filtredMovies);
    // console.log(insertList);
    // }, [moviesDisplay], stateChechbox);
  }, [moviesDisplay, stateChechbox]);


  useEffect(() => {
    console.log(stateChechbox);
    // навешиваем слушатель
    handleResize();
    window.addEventListener('resize', resizeDelay);
    // снимаем слушатель
    return () => window.removeEventListener('resize', resizeDelay);
  }, []);


  return (

    <section className='movies-list'>

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

        <p className='search__btn-container'>
          <button
            className='search__button search__button_cont'
            onClick={() => {
              console.log(stateChechbox);
            }}
          ></button>покажи stateChechbox</p>

      </div>
      {isSavedMovies ? <div>СОХРАНЕНЫЕ ФИЛЬМЫ</div> : <div>ФИЛЬМЫ</div>}


      {/* правило по которому если ничего не найдено выводится надпись */}
      {listMovies.length !== 0
        ?
        <ul className='movies-list__list'>
          {/* {pathname === '/movies' ? moviesList : moviesSavedList} */}
          {/* {pathname === '/movies' ? filtredMovies : filtredMovies} */}
          {filtredMovies}
        </ul>
        :
        <p
          className='movies-list__not-found'>
          {/* если есть текст запроса в ЛС покажем надпись */}
          {`${requestStorage !== '' ? 'Ничего не найдено' : ''}`}
        </p>
      }

      {/* КНОПКА ЕЩЕ */}
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
