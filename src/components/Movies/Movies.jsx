import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const Movies = () => {
  return (
    <main className='movies'>
      {/* <b>Movies</b> — компонент страницы с поиском по фильмам. В нём пригодятся эти */}
      <SearchForm></SearchForm>
      {/* <Preloader></Preloader> */}
      <MoviesCardList></MoviesCardList>
      {/* <MoviesCard></MoviesCard> */}
    </main>
  );
}

export default Movies;
