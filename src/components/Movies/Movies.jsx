import React from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const Movies = () => {
  return (
    <main className='movies'>
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </main>
  );
}

export default Movies;
