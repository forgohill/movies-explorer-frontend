import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import MoviesCard from '../MoviesCard/MoviesCard';
// import './Movies.css';

const SavedMovies = () => {
  return (
    <div className='movies'>
      {/* <b>Movies</b> — компонент страницы с поиском по фильмам. В нём пригодятся эти */}
      <SearchForm></SearchForm>
      {/* <Preloader></Preloader> */}
      <MoviesCardList></MoviesCardList>
      {/* <MoviesCard></MoviesCard> */}
    </div>
  );
}

export default SavedMovies;
