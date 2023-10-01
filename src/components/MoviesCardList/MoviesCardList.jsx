import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { movies } from '../../utils/movies-list.js';
import { moviesSaved } from '../../utils/movies-list-saved.js';

import useWindowCalculator from '../../hooks/useWindowCalculator';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';
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
  isRequestBlock,
  // onCheckSavedFilms,
  savedFilms,
  onBlockedButton
}) => {

  const { checkSaved } = useCheckSavedFilm();

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

  const handleCheckSaved = (movie) => {
    console.log(`сработал  %c handleCheckSaved MoviesCardList`,
      "color: yellow; font-style: italic;");

    if (isSavedMovies) {

      console.log(`сработал  %c isSavedMovies isSavedMovies — ЭТО ОНО`,
        "color: yellow; font-style: italic;");
      return true;
    } else {
      // const savedFilm = savedFilms.find((item) => {
      //   return item.movieId === movie.id;
      // });

      // if (savedFilm) {
      //   console.log(`сработал  %c savedFilm savedFilm`,
      //     "color: yellow; font-style: italic;");
      // }

      // return savedFilm;
      // console.log(savedFilm);

      const savedFilm = checkSaved(savedFilms, movie);
      return savedFilm;
    }
  };



  const filtredMovies = listMovies.slice(0, moviesDisplay).map((movie) => {
    // debugger;
    // const movieSaved = onCheckSavedFilms(movie);
    // console.log(movieSaved);

    return (
      <MoviesCard
        key={isSavedMovies ? movie._id : movie.id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        onSaveFilms={onSaveFilms}
        onDeleteSaveFilm={onDeleteSaveFilm}
        // checkSaved={handleCheckSaved(movie)}
        checkSaved={
          isSavedMovies
            ? true
            : checkSaved(savedFilms, movie)}
        onBlockedButton={onBlockedButton}
      />
    )
  });

  useEffect(() => {
    // console.log(' setInsertList ПРОИЗОШЕЛ')
    setInsertList(filtredMovies);
    // console.log(insertList);
    // }, [moviesDisplay], stateChechbox);
  }, [moviesDisplay, stateChechbox, listMovies]);


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
          {isSavedMovies
            ? `${isRequestBlock !== '' ? 'Ничего не найдено' : ''}`
            : `${requestStorage !== '' ? 'Ничего не найдено' : ''}`
          }
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
