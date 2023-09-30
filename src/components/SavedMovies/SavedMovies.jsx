import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import { useState } from 'react';
// import { useEffect } from 'react';

const SavedMovies = ({ savedFilms }) => {
  const [listMovies, setlistMovies] = useState([]);
  return (
    <div className='movies'>
      <SearchForm></SearchForm>
      <MoviesCardList
        listMovies={listMovies}
      ></MoviesCardList>
    </div>
  );
}

export default SavedMovies;
