import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { movies } from '../../utils/movies-list.js';

const MoviesCardList = () => {

  const moviesList = movies.map((movie) => {
    return (
      <MoviesCard
        key={movie.id}
        movie={movie}
      />
    )
  })

  console.log(movies);
  return (
    <section className='movies-list'>
      <ul className='movies-list__list'>
        {moviesList}
        {/* <li className='movies-list__item'> */}
        {/* <MoviesCard /> */}
        {/* </li> */}
        {/* <li className='movies-list__item'> */}
        {/* <MoviesCard /> */}
        {/* </li> */}
        {/* <li className='movies-list__item'> */}
        {/* <MoviesCard /> */}
        {/* </li> */}
        {/* <li className='movies-list__item'> */}
        {/* <MoviesCard /> */}
        {/* </li> */}
        {/* <li className='movies-list__item'> */}
        {/* <MoviesCard /> */}
        {/* </li> */}
        {/* <li className='movies-list__item'> */}
        {/* <MoviesCard /> */}
        {/* </li> */}
        {/* <li className='movies-list__item'> */}
        {/* <MoviesCard /> */}
        {/* </li> */}
      </ul>
      <button
        type='button'
        className='movies-list__btn-more'
      >Ещё</button>

      {/* <b>MoviesCardList</b> — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством. */}
    </section >
  );
}

export default MoviesCardList;
