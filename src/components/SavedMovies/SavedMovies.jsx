import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import MoviesCard from '../MoviesCard/MoviesCard';
// import './Movies.css';

const SavedMovies = () => {
  return (
    <div className='movies'>
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </div>
  );
}

export default SavedMovies;
