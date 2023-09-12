import React from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { movies } from '../../utils/movies-list.js';
import { moviesSaved } from '../../utils/movies-list-saved.js';



const MoviesCardList = ({ listMovies }) => {

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

  console.log(listMovies);

  const filtredMovies = listMovies.map((movie) => {
    return (
      <MoviesCard
        key={movie.id}
        movie={movie}
      />
    )
  });

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
      </div>



      <ul className='movies-list__list'>
        {/* {pathname === '/movies' ? moviesList : moviesSavedList} */}
        {pathname === '/movies' ? filtredMovies : filtredMovies}
      </ul>
      {pathname === '/movies' ? <button type='button' className='movies-list__btn-more' >Ещё</button>
        : <div className='movies-list__saveddevider'></div>}
    </section >
  );
}

export default MoviesCardList;
