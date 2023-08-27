import React from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { movies } from '../../utils/movies-list.js';
import { moviesSaved } from '../../utils/movies-list-saved.js';
const MoviesCardList = () => {

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

  // console.log(movies);
  return (
    <section className='movies-list'>
      <ul className='movies-list__list'>
        {/* {moviesList} */}
        {pathname === '/movies' ? moviesList : moviesSavedList}
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
      {pathname === '/movies' ? <button type='button' className='movies-list__btn-more' >Ещё</button>
        : <div className='movies-list__saveddevider'></div>}

      {/* <b>MoviesCardList</b> — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством. */}
    </section >
  );
}

export default MoviesCardList;
