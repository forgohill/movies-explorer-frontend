import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

import useWindowCalculator from '../../hooks/useWindowCalculator';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';

const MoviesCardList = ({
  listMovies,
  requestStorage,
  stateChechbox,
  onSaveFilms,
  onDeleteSaveFilm,
  isRequestBlock,
  savedFilms,
  onBlockedButton
}) => {

  const { checkSaved } = useCheckSavedFilm();
  const { pathname } = useLocation();
  const isSavedMovies = pathname === '/saved-movies';

  // стейт хранения входящео массива
  const [insertList, setInsertList] = useState([]);

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
        checkSaved={
          isSavedMovies
            ? true
            : checkSaved(savedFilms, movie)}
        onBlockedButton={onBlockedButton}
      />
    )
  });

  useEffect(() => {
    setInsertList(filtredMovies);
  }, [moviesDisplay, stateChechbox, listMovies]);

  useEffect(() => {
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
          {filtredMovies}
        </ul>
        :
        <p
          className='movies-list__not-found'>
          {/* если есть текст запроса в ЛС покажем надпись */}
          {`${requestStorage !== '' ? 'Ничего не найдено' : ''}`}
          {/* {isSavedMovies
            ? `${isRequestBlock !== '' ? 'Ничего не найдено' : ''}`
            : `${requestStorage !== '' ? 'Ничего не найдено' : ''}`
          } */}
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
    </section >
  );
}

export default MoviesCardList;
